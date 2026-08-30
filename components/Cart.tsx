"use client";

import type { Product } from "../data/products";

type CartItem = {
product: Product;
quantity: number;
};

type CartProps = {
items: CartItem[];
onAdd: (product: Product) => void;
onRemove: (productId: string) => void;
onClose: () => void;
};

export default function Cart({
items,
onAdd,
onRemove,
onClose,
}: CartProps) {
let total = 0;
let quantity = 0;

items.forEach(function (item) {
total += item.product.price * item.quantity;
quantity += item.quantity;
});

return ( <div
   className="cart-overlay"
   onClick={onClose}
 >
<aside
className="cart-panel"
onClick={function (event) {
event.stopPropagation();
}}
> <div className="cart-header"> <div> <span>Tu selección</span> <h2>Carrito</h2> </div>

```
      <button
        type="button"
        className="cart-close"
        onClick={onClose}
        aria-label="Cerrar carrito"
      >
        ×
      </button>
    </div>

    <div className="cart-content">
      {items.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon">
            🛍
          </div>

          <h3>Tu carrito está vacío</h3>

          <p>
            Agregá una prenda de nuestra
            colección.
          </p>

          <button
            type="button"
            onClick={onClose}
          >
            Seguir comprando
          </button>
        </div>
      ) : (
        items.map(function (item) {
          return (
            <div
              className="cart-item"
              key={item.product.id}
            >
              <img
                src={item.product.image}
                alt={item.product.name}
              />

              <div className="cart-item-info">
                <span>
                  {item.product.category}
                </span>

                <h3>
                  {item.product.name}
                </h3>

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
                      onRemove(item.product.id);
                    }}
                    aria-label="Disminuir cantidad"
                  >
                    −
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={function () {
                      onAdd(item.product);
                    }}
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>

    {items.length > 0 ? (
      <div className="cart-footer">
        <div className="cart-total">
          <span>
            {quantity}{" "}
            {quantity === 1
              ? "producto"
              : "productos"}
          </span>

          <strong>
            ${total.toLocaleString("es-AR")}
          </strong>
        </div>

        <button
          type="button"
          className="checkout-button"
          onClick={function () {
            alert(
              "Checkout preparado para Mercado Pago."
            );
          }}
        >
          Continuar compra
        </button>
      </div>
    ) : null}
  </aside>
</div>

);
}
