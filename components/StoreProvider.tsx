"use client";

import {
createContext,
useContext,
useEffect,
useState,
type ReactNode,
} from "react";

import type { Product } from "../data/products";

type CartItem = {
product: Product;
quantity: number;
};

type StoreContextType = {
cartItems: CartItem[];
addToCart: (product: Product) => void;
removeFromCart: (productId: string) => void;
clearCart: () => void;
};

const StoreContext =
createContext<StoreContextType | null>(null);

const STORAGE_KEY = "lucia-cart";

export function StoreProvider({
children,
}: {
children: ReactNode;
}) {
const [cartItems, setCartItems] =
useState<CartItem[]>([]);

const [loaded, setLoaded] = useState(false);

useEffect(function () {
try {
const saved =
window.localStorage.getItem(STORAGE_KEY);


  if (saved) {
    const parsed: CartItem[] =
      JSON.parse(saved);

    setCartItems(parsed);
  }
} catch {
  setCartItems([]);
}

setLoaded(true);


}, []);

useEffect(
function () {
if (!loaded) {
return;
}


  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(cartItems)
    );
  } catch {
    return;
  }
},
[cartItems, loaded]

);

function addToCart(product: Product) {
setCartItems(function (items) {
const existing = items.find(function (item) {
return item.product.id === product.id;
});

  if (existing) {
    return items.map(function (item) {
      if (item.product.id === product.id) {
        return {
          product: item.product,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });
  }

  return [
    ...items,
    {
      product: product,
      quantity: 1,
    },
  ];
});

}

function removeFromCart(productId: string) {
setCartItems(function (items) {
return items
.map(function (item) {
if (item.product.id === productId) {
return {
product: item.product,
quantity: item.quantity - 1,
};
}

      return item;
    })
    .filter(function (item) {
      return item.quantity > 0;
    });
});

}

function clearCart() {
setCartItems([]);
}

return (
<StoreContext.Provider
value={{
cartItems,
addToCart,
removeFromCart,
clearCart,
}}
>
{children}
</StoreContext.Provider>
);
}

export function useStore() {
const store = useContext(StoreContext);

if (!store) {
throw new Error(
"useStore debe utilizarse dentro de StoreProvider"
);
}

return store;
}
