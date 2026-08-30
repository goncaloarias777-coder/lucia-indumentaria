"use client";

import { useState } from "react";
import { products } from "../data/products";
import { useStore } from "../components/StoreProvider";

export default function Home() {
const [category, setCategory] = useState("Todos");
const [addedProduct, setAddedProduct] = useState<string | null>(null);

const { cartItems, addToCart } = useStore();

const categories = [
"Todos",
"Vestidos",
"Abrigos",
"Blusas",
"Pantalones",
"Tops",
"Faldas",
"Accesorios",
];

const visibleProducts =
category === "Todos"
? products
: products.filter(function (product) {
return product.category === category;
});

let cartQuantity = 0;

cartItems.forEach(function (item) {
cartQuantity += item.quantity;
});

return ( <main> <header className="site-header"> <div className="logo">
LUCIA <span>INDUMENTARIA</span> </div>

    <nav className="navigation">
      <a href="#inicio">Inicio</a>
      <a href="#coleccion">Colección</a>
      <a href="#contacto">Contacto</a>
    </nav>

    <a
      href="/carrito"
      className="cart-button"
    >
      Carrito

      {cartQuantity > 0 ? (
        <span>{cartQuantity}</span>
      ) : null}
    </a>
  </header>

  <section id="inicio" className="hero">
    <img
      src={products[0].image}
      alt={products[0].name}
      className="hero-image"
    />

    <div className="hero-content">
      <p className="hero-label">
        NUEVA COLECCIÓN
      </p>

      <h1>
        Vestite
        <br />
        diferente.
      </h1>

      <p>
        Moda femenina contemporánea,
        elegante y atemporal.
      </p>

      <a
        href="#coleccion"
        className="hero-button"
      >
        Ver colección
      </a>
    </div>
  </section>

  <section className="intro">
    <p className="section-label">
      LUCIA INDUMENTARIA
    </p>

    <h2>
      Moda que habla
      <br />
      por vos.
    </h2>

    <p>
      Prendas seleccionadas para crear
      looks únicos todos los días.
    </p>
  </section>

  <section
    id="coleccion"
    className="collection"
  >
    <div className="collection-header">
      <div>
        <p className="section-label">
          COLECCIÓN
        </p>

        <h2>Shop</h2>
      </div>

      <p>
        {visibleProducts.length} productos
      </p>
    </div>

    <div className="categories">
      {categories.map(function (item) {
        return (
          <button
            type="button"
            key={item}
            className={
              category === item
                ? "category active"
                : "category"
            }
            onClick={function () {
              setCategory(item);
            }}
          >
            {item}
          </button>
        );
      })}
    </div>

    <div className="product-grid">
      {visibleProducts.map(function (product) {
        return (
          <article
            key={product.id}
            className="product-card"
          >
            <div className="product-image-wrapper">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />

              {product.isNew ? (
                <span className="product-badge">
                  NUEVO
                </span>
              ) : null}

              <button
                
type="button"
className={
addedProduct === product.id
? "quick-cart added"
: "quick-cart"
}
onClick={function () {
addToCart(product);
setAddedProduct(product.id);


setTimeout(function () {
  setAddedProduct(null);
}, 1200);


}}

>

{addedProduct === product.id
? "✓ Agregado"
: "Agregar al carrito"} 

              </button>
            </div>

            <div className="product-info">
              <div>
                <p>{product.category}</p>

                <h3>{product.name}</h3>
              </div>

              <strong>
                $
                {product.price.toLocaleString(
                  "es-AR"
                )}
              </strong>
            </div>
          </article>
        );
      })}
    </div>
  </section>

  <section className="brand-section">
    <div className="brand-image">
      <img
        src={products[1].image}
        alt={products[1].name}
      />
    </div>

    <div className="brand-content">
      <p className="section-label">
        NUESTRA ESENCIA
      </p>

      <h2>
        Menos,
        <br />
        pero mejor.
      </h2>

      <p>
        Una propuesta femenina, moderna
        y pensada para acompañarte.
      </p>

      <a href="#coleccion">
        Descubrir colección
      </a>
    </div>
  </section>

  <section className="benefits">
    <div>
      <span>01</span>
      <h3>Envíos</h3>
      <p>Recibí tu pedido donde estés.</p>
    </div>

    <div>
      <span>02</span>
      <h3>Pagos seguros</h3>
      <p>Comprá de forma segura.</p>
    </div>

    <div>
      <span>03</span>
      <h3>Cambios</h3>
      <p>Te acompañamos en tu compra.</p>
    </div>

    <div>
      <span>04</span>
      <h3>Atención</h3>
      <p>Estamos para ayudarte.</p>
    </div>
  </section>

  <section
    id="contacto"
    className="newsletter"
  >
    <div>
      <p className="section-label">
        NEWSLETTER
      </p>

      <h2>
        Enterate
        <br />
        primero.
      </h2>
    </div>

    <form
      onSubmit={function (event) {
        event.preventDefault();
        alert("Gracias por suscribirte.");
      }}
    >
      <input
        type="email"
        placeholder="Tu email"
        required
      />

      <button type="submit">
        Suscribirme
      </button>
    </form>
  </section>

  <footer className="footer">
    <div>
      <div className="logo">
        LUCIA
        <span>INDUMENTARIA</span>
      </div>

      <p>
        Moda femenina contemporánea.
      </p>
    </div>

    <div>
      <h4>Tienda</h4>

      <a href="#coleccion">
        Colección
      </a>

      <a href="#coleccion">
        Novedades
      </a>
    </div>

    <div>
      <h4>Ayuda</h4>

      <a href="#contacto">
        Contacto
      </a>

      <a href="#contacto">
        Envíos
      </a>
    </div>

    <div>
      <h4>Social</h4>

      <a href="#contacto">
        Instagram
      </a>

      <a href="#contacto">
        WhatsApp
      </a>
    </div>

    <div className="footer-bottom">
      <p>
        © 2026 Lucia Indumentaria
      </p>
    </div>
  </footer>
</main>

);
}
