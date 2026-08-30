document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. GESTIÓN DE PRODUCTOS ---
    const obtenerProductos = async () => {
        let productosGuardados = localStorage.getItem('productos_tienda');
        if (productosGuardados) {
            return JSON.parse(productosGuardados);
        } else {
            try {
                const respuesta = await fetch('productos.json');
                const productosJson = await respuesta.json();
                localStorage.setItem('productos_tienda', JSON.stringify(productosJson));
                return productosJson;
            } catch (error) {
                console.error("Error cargando productos:", error);
                return [];
            }
        }
    };

    // --- 2. INICIALIZAR TIENDA ---
    const inicializarTienda = async () => {
        const contenedorTienda = document.getElementById('contenedor-productos');
        if (!contenedorTienda) return;

        const productos = await obtenerProductos();
        renderizarGrilla(productos);

        let categoriaActiva = 'todos';
        let textoBusqueda = '';

        const botonesFiltro = document.querySelectorAll('.btn-filtro');
        botonesFiltro.forEach(boton => {
            boton.addEventListener('click', (e) => {
                botonesFiltro.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                categoriaActiva = e.target.getAttribute('data-categoria');
                aplicarFiltrosYBusqueda(productos, categoriaActiva, textoBusqueda);
            });
        });

        const inputBuscador = document.getElementById('input-buscador');
        if (inputBuscador) {
            inputBuscador.addEventListener('input', (e) => {
                textoBusqueda = e.target.value.toLowerCase();
                aplicarFiltrosYBusqueda(productos, categoriaActiva, textoBusqueda);
            });
        }
    };

    function aplicarFiltrosYBusqueda(productos, categoria, busqueda) {
        let resultado = productos;

        if (categoria !== 'todos') {
            resultado = resultado.filter(p => p.categoria && p.categoria.toLowerCase() === categoria.toLowerCase());
        }

        if (busqueda.trim() !== '') {
            resultado = resultado.filter(p => p.nombre.toLowerCase().includes(busqueda));
        }

        renderizarGrilla(resultado);
    }

    function renderizarGrilla(listaProductos) {
        const contenedorTienda = document.getElementById('contenedor-productos');
        if (!contenedorTienda) return;
        
        contenedorTienda.innerHTML = '';

        if (listaProductos.length === 0) {
            contenedorTienda.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:var(--text-muted); padding: 40px;">No se encontraron prendas.</p>';
            return;
        }

        let favoritos = JSON.parse(localStorage.getItem('favoritos_tienda')) || [];

        listaProductos.forEach((producto) => {
            const nombreEscapado = producto.nombre.replace(/'/g, "\\'");
            const esFav = favoritos.includes(producto.nombre);
            const iconoFav = esFav ? '❤️' : '🤍';

            contenedorTienda.innerHTML += `
                <div class="producto-card" style="cursor: pointer;" onclick="abrirDetalle('${nombreEscapado}', ${producto.precio}, '${producto.imagen}')">
                    <button class="btn-favorito" onclick="event.stopPropagation(); toggleFavorito('${nombreEscapado}')">${iconoFav}</button>
                    <div class="producto-img" style="background-image: url('${producto.imagen}'); background-size: cover; background-position: center;"></div>
                    <h3>${producto.nombre}</h3>
                    <p>$${Number(producto.precio).toLocaleString('es-AR')}</p>
                    <button class="btn" onclick="event.stopPropagation(); agregarAlCarrito('${nombreEscapado}', ${producto.precio})">Comprar</button>
                </div>
            `;
        });
    }

    // --- 3. PANEL ADMIN (Inventario + Pedidos) ---
    const inicializarAdmin = async () => {
        const tablaAdmin = document.getElementById('tabla-admin-body');
        if (!tablaAdmin) return;

        const cargarTablaYStats = async () => {
            const productos = await obtenerProductos();
            tablaAdmin.innerHTML = '';
            let valorTotalStock = 0;

            productos.forEach((producto, index) => {
                valorTotalStock += Number(producto.precio);
                tablaAdmin.innerHTML += `
                    <tr>
                        <td><img src="${producto.imagen}" width="40" height="40" style="object-fit:cover; border-radius:6px; vertical-align:middle; margin-right:12px;"> ${producto.nombre}</td>
                        <td>$${Number(producto.precio).toLocaleString('es-AR')}</td>
                        <td>
                            <button onclick="eliminarProducto(${index})" style="background:#ef4444; color:white; border:none; padding:6px 12px; border-radius:6px; cursor:pointer; font-size:0.8rem;">Borrar</button>
                        </td>
                    </tr>
                `;
            });

            const statTotalProd = document.getElementById('stat-total-productos');
            const statValorStock = document.getElementById('stat-valor-stock');
            if (statTotalProd) statTotalProd.textContent = productos.length;
            if (statValorStock) statValorStock.textContent = valorTotalStock.toLocaleString('es-AR');
        };

        const cargarPedidosAdmin = () => {
            const tablaPedidos = document.getElementById('tabla-pedidos-body');
            if (!tablaPedidos) return;
            
            let pedidos = JSON.parse(localStorage.getItem('pedidos_tienda')) || [];
            tablaPedidos.innerHTML = '';

            if (pedidos.length === 0) {
                tablaPedidos.innerHTML = '<tr><td colspan="3" style="text-align:center; color:var(--text-muted); padding: 20px;">No hay pedidos recientes.</td></tr>';
                return;
            }

            pedidos.forEach(pedido => {
                tablaPedidos.innerHTML += `
                    <tr>
                        <td style="font-weight:600;">#${pedido.orden}</td>
                        <td>${pedido.resumen}</td>
                        <td><span style="background:#d1fae5; color:#065f46; padding:4px 8px; border-radius:4px; font-size:0.75rem; font-weight:600;">Pagado</span></td>
                    </tr>
                `;
            });
        };

        await cargarTablaYStats();
        cargarPedidosAdmin();

        const formNuevo = document.getElementById('form-nuevo-producto');
        if (formNuevo) {
            formNuevo.addEventListener('submit', (e) => {
                e.preventDefault();
                const nombre = document.getElementById('nombre-prod').value;
                const precio = document.getElementById('precio-prod').value;
                const archivoInput = document.getElementById('imagen-prod');

                if (archivoInput.files.length === 0) {
                    mostrarToast('Selecciona una imagen.');
                    return;
                }

                const archivo = archivoInput.files[0];
                const lector = new FileReader();

                lector.onload = async function(eventoFirma) {
                    const nuevoProd = {
                        nombre: nombre,
                        precio: Number(precio),
                        categoria: "Remeras",
                        imagen: eventoFirma.target.result
                    };

                    let productos = await obtenerProductos();
                    productos.push(nuevoProd);
                    localStorage.setItem('productos_tienda', JSON.stringify(productos));

                    formNuevo.reset();
                    await cargarTablaYStats();
                    mostrarToast('¡Prenda publicada con éxito!');
                };

                lector.readAsDataURL(archivo);
            });
        }
    };

    // --- 4. CONFIGURACIÓN DEL CARRITO ---
    actualizarContadorCarrito();

    const modalCarrito = document.getElementById('modal-carrito');
    const cerrarCarrito = document.getElementById('cerrar-carrito');
    const botonesCarrito = document.querySelectorAll('#btn-carrito, .btn-carrito-trigger');
    
    botonesCarrito.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            mostrarContenidoCarrito();
            if (modalCarrito) modalCarrito.style.display = 'block';
        });
    });

    if (cerrarCarrito && modalCarrito) {
        cerrarCarrito.addEventListener('click', () => {
            modalCarrito.style.display = 'none';
        });
    }

    const cerrarDetalle = document.getElementById('cerrar-detalle');
    if (cerrarDetalle) {
        cerrarDetalle.addEventListener('click', () => {
            document.getElementById('modal-detalle').style.display = 'none';
        });
    }

    // Botón de pago con Mercado Pago (Guarda el pedido para Lucia)
    const btnPagarMp = document.getElementById('btn-pagar-mp');
    if (btnPagarMp) {
        btnPagarMp.addEventListener('click', () => {
            let carrito = JSON.parse(localStorage.getItem('carrito_tienda')) || [];
            if (carrito.length === 0) {
                mostrarToast('El carrito está vacío.');
                return;
            }

            mostrarToast('Conectando con Mercado Pago...');
            setTimeout(() => {
                if (modalCarrito) modalCarrito.style.display = 'none';
                const nroOrden = Math.floor(100000 + Math.random() * 900000);
                
                // Guardar pedido para el panel admin de Lucia
                let resumenCompra = carrito.map(i => `${i.cantidad}x ${i.nombre}`).join(', ');
                let pedidos = JSON.parse(localStorage.getItem('pedidos_tienda')) || [];
                pedidos.unshift({ orden: nroOrden, resumen: resumenCompra });
                localStorage.setItem('pedidos_tienda', JSON.stringify(pedidos));

                const nroOrdenEl = document.getElementById('nro-orden');
                const modalExitoEl = document.getElementById('modal-exito');
                
                if (nroOrdenEl) nroOrdenEl.textContent = nroOrden;
                if (modalExitoEl) modalExitoEl.style.display = 'flex';
                
                localStorage.removeItem('carrito_tienda');
                actualizarContadorCarrito();
            }, 1500);
        });
    }

    inicializarTienda();
    inicializarAdmin();
});

// ==========================================
// FUNCIONES GLOBALES
// ==========================================

let talleSeleccionado = 'M';
let toastTimeout = null;

window.seleccionarTalle = function(btn) {
    document.querySelectorAll('.btn-talle').forEach(b => {
        b.style.background = 'var(--surface)';
        b.style.color = 'var(--text-main)';
        b.style.borderColor = 'var(--border-color)';
    });
    btn.style.background = 'var(--text-main)';
    btn.style.color = 'white';
    btn.style.borderColor = 'var(--text-main)';
    talleSeleccionado = btn.textContent;
};

window.abrirGuiaTalles = function() {
    alert("Guía de Talles:\n• Talle S: Busto 85-90cm | Cintura 65-70cm\n• Talle M: Busto 91-96cm | Cintura 71-76cm\n• Talle L: Busto 97-102cm | Cintura 77-82cm");
};

window.toggleFavorito = function(nombre) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos_tienda')) || [];
    let index = favoritos.indexOf(nombre);
    
    if (index !== -1) {
        favoritos.splice(index, 1);
        mostrarToast(`Quitado de favoritos`);
    } else {
        favoritos.push(nombre);
        mostrarToast(`Agregado a favoritos ❤️`);
    }
    
    localStorage.setItem('favoritos_tienda', JSON.stringify(favoritos));
    location.reload(); // Actualiza los corazones visuales
};

window.abrirDetalle = function(nombre, precio, imagen) {
    document.getElementById('detalle-nombre').textContent = nombre;
    document.getElementById('detalle-precio').textContent = `$${Number(precio).toLocaleString('es-AR')}`;
    document.getElementById('detalle-img').style.backgroundImage = `url('${imagen}')`;
    
    const btnComprarDetalle = document.getElementById('btn-comprar-detalle');
    btnComprarDetalle.onclick = function() {
        agregarAlCarrito(`${nombre} (Talle: ${talleSeleccionado})`, precio);
        document.getElementById('modal-detalle').style.display = 'none';
    };

    document.getElementById('modal-detalle').style.display = 'flex';
};

window.cerrarExito = function() {
    document.getElementById('modal-exito').style.display = 'none';
    location.reload();
};

window.mostrarToast = function(mensaje) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    
    if (toastTimeout) clearTimeout(toastTimeout);

    toast.textContent = mensaje;
    toast.classList.add('show');
    
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
        toastTimeout = null;
    }, 3000);
};

window.agregarAlCarrito = function(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem('carrito_tienda')) || [];
    let indexExistente = carrito.findIndex(item => item.nombre === nombre);
    
    if (indexExistente !== -1) {
        carrito[indexExistente].cantidad += 1;
    } else {
        carrito.push({ nombre, precio: Number(precio), cantidad: 1 });
    }

    localStorage.setItem('carrito_tienda', JSON.stringify(carrito));
    actualizarContadorCarrito();
    mostrarToast(`Agregaste "${nombre}"`);
};

window.cambiarCantidad = function(index, cambio) {
    let carrito = JSON.parse(localStorage.getItem('carrito_tienda')) || [];
    carrito[index].cantidad += cambio;
    
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    localStorage.setItem('carrito_tienda', JSON.stringify(carrito));
    actualizarContadorCarrito();
    mostrarContenidoCarrito();
};

window.eliminarProducto = function(index) {
    let productos = JSON.parse(localStorage.getItem('productos_tienda')) || [];
    productos.splice(index, 1);
    localStorage.setItem('productos_tienda', JSON.stringify(productos));
    location.reload();
};

window.actualizarContadorCarrito = function() {
    let carrito = JSON.parse(localStorage.getItem('carrito_tienda')) || [];
    let totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const contador = document.getElementById('contador-carrito');
    if (contador) contador.textContent = totalItems;
};

window.mostrarContenidoCarrito = function() {
    let carrito = JSON.parse(localStorage.getItem('carrito_tienda')) || [];
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    
    if (!listaCarrito || !totalCarrito) return;

    listaCarrito.innerHTML = '';
    let totalGeneral = 0;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 30px 0;">Tu carrito está vacío.</p>';
        totalCarrito.textContent = '0';
        return;
    }

    carrito.forEach((item, index) => {
        let subtotal = item.precio * item.cantidad;
        totalGeneral += subtotal;

        listaCarrito.innerHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">
                <div style="flex: 1;">
                    <p style="font-size: 0.9rem; font-weight: 600; margin-bottom: 2px;">${item.nombre}</p>
                    <p style="font-size: 0.8rem; color: var(--text-muted);">$${Number(item.precio).toLocaleString('es-AR')} c/u</p>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <button onclick="cambiarCantidad(${index}, -1)" style="background: var(--bg-color); border: 1px solid var(--border-color); width: 24px; height: 24px; border-radius: 4px; cursor: pointer; font-weight: bold;">-</button>
                    <span style="font-size: 0.85rem; font-weight: 600; min-width: 15px; text-align: center;">${item.cantidad}</span>
                    <button onclick="cambiarCantidad(${index}, 1)" style="background: var(--bg-color); border: 1px solid var(--border-color); width: 24px; height: 24px; border-radius: 4px; cursor: pointer; font-weight: bold;">+</button>
                </div>
            </div>
        `;
    });

    totalCarrito.textContent = totalGeneral.toLocaleString('es-AR');
};