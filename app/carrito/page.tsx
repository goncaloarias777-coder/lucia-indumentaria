"use client";

import { useStore } from "../../components/StoreProvider";

export default function CarritoPage() {
const {
cartItems,
addToCart,
removeFromCart,
clearCart,
} = useStore();

let total = 0;
let quantity = 0;

cartItems.forEach(function (item) {
total += item.product.price * item.quantity;
quantity += item.quantity;
});

return ( <main className="cart-page"> <header className="site-header"> <div className="logo">
LUCIA <span>INDUMENTARIA</span> </div>


    <nav className="navigation">
      <a href="/">Inicio</a>

      <a href="/#coleccion">
        Colección
      </a>

      <a href="/#contacto">
        Contacto
      </a>
    </nav>

    <a
      href="/carrito"
      className="cart-button"
    >
      Carrito
      {quantity > 0 ? (
        <span>{quantity}</span>
      ) : null}
    </a>
  </header>

  <section className="cart-page-content">
    <p className="section-label">
      TU SELECCIÓN
    </p>

    <h1>Carrito</h1>

    {cartItems.length === 0 ? (
      <div className="cart-page-empty">
        <div className="cart-empty-icon">
          🛍
        </div>

        <h2>Tu carrito está vacío</h2>

        <p>
          Todavía no agregaste ningún producto.
        </p>

        <a
          href="/#coleccion"
          className="hero-button"
        >
          Ver colección
        </a>
      </div>
    ) : (
      <div className="cart-page-layout">
        <div className="cart-page-items">
          {cartItems.map(function (item) {
            return (
              <article
                className="cart-page-item"
                key={item.product.id}
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                />

                <div className="cart-page-item-info">
                  <span>
                    {item.product.category}
                  </span>

                  <h2>
                    {item.product.name}
                  </h2>

                  <strong>
                    $
                    {item.product.price.toLocaleString(
                      "es-AR"
                    )}
                  </strong>

                  <div className="cart-quantity">
                    <button
                      type="button"
                      onClick={function () {
                        removeFromCart(
                          item.product.id
                        );
                      }}
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={function () {
                        addToCart(
                          item.product
                        );
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            );
          })}

          <button
            type="button"
            onClick={clearCart}
          >
            Vaciar carrito
          </button>
        </div>

        <aside className="cart-summary">
          <p>RESUMEN</p>

          <div>
            <span>Productos</span>
            <strong>{quantity}</strong>
          </div>

          <div>
            <span>Total</span>

            <strong>
              $
              {total.toLocaleString(
                "es-AR"
              )}
            </strong>
          </div>

          <button
            type="button"
            className="checkout-button"
            onClick={async function () {
try {
const response = await fetch(
"/api/checkout",
{
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
items: cartItems,
}),
}
);

const data = await response.json();

if (!response.ok) {
  alert(
    data.error ||
      "No se pudo iniciar la compra."
  );
  return;
}

console.log(
  "Checkout preparado:",
  data
);

alert(
  "Checkout preparado correctamente."
);


} catch {
alert(
"No se pudo conectar con el checkout."
);
}
}}

          >
            Continuar compra
          </button>

          <a href="/#coleccion">
            Seguir comprando
          </a>
        </aside>
      </div>
    )}
  </section>
</main>

);
}
