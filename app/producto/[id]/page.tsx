"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { products } from "../../../data/products";
import { useStore } from "../../../components/StoreProvider";

export default function ProductPage() {
const params = useParams();
const { addToCart } = useStore();

const id = String(params.id);

const foundProduct = products.find(function (item) {
return String(item.id) === id;
});

const [size, setSize] = useState("");
const [quantity, setQuantity] = useState(1);
const [added, setAdded] = useState(false);

if (!foundProduct) {
return ( <main className="product-not-found"> <p>PRODUCTO</p>

    <h1>Producto no encontrado</h1>

    <a href="/#coleccion">
      Volver a la colección
    </a>
  </main>
);

}

const product = foundProduct;

function increaseQuantity() {
setQuantity(function (current) {
return current + 1;
});
}

function decreaseQuantity() {
setQuantity(function (current) {
if (current <= 1) {
return 1;
}


  return current - 1;
});


}

function handleAddToCart() {
if (!size) {
alert("Seleccioná un talle.");
return;
}


for (let index = 0; index < quantity; index++) {
  addToCart(product);
}

setAdded(true);

setTimeout(function () {
  setAdded(false);
}, 1500);


}

return ( <main className="product-page"> <header className="site-header"> <a href="/" className="logo">
LUCIA <span>INDUMENTARIA</span> </a>


    <nav className="navigation">
      <a href="/#inicio">Inicio</a>
      <a href="/#coleccion">Colección</a>
      <a href="/#contacto">Contacto</a>
    </nav>

    <a href="/carrito" className="cart-button">
      Carrito
    </a>
  </header>

  <section className="product-detail">
    <div className="product-detail-image">
      <img
        src={product.image}
        alt={product.name}
      />

      {product.isNew ? (
        <span className="product-detail-badge">
          NUEVO
        </span>
      ) : null}
    </div>

    <div className="product-detail-info">
      <span className="product-detail-category">
        {product.category}
      </span>

      <h1>{product.name}</h1>

      <strong className="product-detail-price">
        ${product.price.toLocaleString("es-AR")}
      </strong>

      <div className="product-divider" />

      <p className="product-description">
        Una prenda seleccionada de Lucia
        Indumentaria, pensada para crear
        looks modernos, elegantes y
        versátiles.
      </p>

      <div className="product-option">
        <div className="product-option-header">
          <span>Talle</span>
          <span>
            {size || "Seleccionar"}
          </span>
        </div>

        <div className="size-selector">
          {["XS", "S", "M", "L", "XL"].map(
            function (item) {
              return (
                <button
                  type="button"
                  key={item}
                  className={
                    size === item
                      ? "size-button selected"
                      : "size-button"
                  }
                  onClick={function () {
                    setSize(item);
                  }}
                >
                  {item}
                </button>
              );
            }
          )}
        </div>
      </div>

      <div className="product-option">
        <span>Cantidad</span>

        <div className="product-quantity">
          <button
            type="button"
            onClick={decreaseQuantity}
          >
            −
          </button>

          <span>{quantity}</span>

          <button
            type="button"
            onClick={increaseQuantity}
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        className={
          added
            ? "product-add-button added"
            : "product-add-button"
        }
        onClick={handleAddToCart}
      >
        {added
          ? "✓ Agregado al carrito"
          : "Agregar al carrito"}
      </button>

      <a
        href="/carrito"
        className="product-cart-link"
      >
        Ver carrito →
      </a>

      <div className="product-features">
        <div>
          <span>01</span>
          <p>Envíos a todo el país</p>
        </div>

        <div>
          <span>02</span>
          <p>Pagos seguros</p>
        </div>

        <div>
          <span>03</span>
          <p>Cambios y atención personalizada</p>
        </div>
      </div>
    </div>
  </section>
</main>

);
}
