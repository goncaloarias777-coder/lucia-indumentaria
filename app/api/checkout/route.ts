import { NextResponse } from "next/server";
import {
MercadoPagoConfig,
Preference,
} from "mercadopago";

export async function POST(request: Request) {
try {
const accessToken =
process.env.MP_ACCESS_TOKEN;

if (!accessToken) {
  return NextResponse.json(
    {
      error:
        "Falta configurar MP_ACCESS_TOKEN.",
    },
    {
      status: 500,
    }
  );
}

const body = await request.json();

if (
  !body.items ||
  !Array.isArray(body.items) ||
  body.items.length === 0
) {
  return NextResponse.json(
    {
      error: "El carrito está vacío.",
    },
    {
      status: 400,
    }
  );
}

const client =
  new MercadoPagoConfig({
    accessToken: accessToken,
  });

const preference =
  new Preference(client);

const response =
  await preference.create({
    body: {
      items: body.items.map(function (
        item: {
          product: {
            id: string;
            name: string;
            price: number;
          };
          quantity: number;
        }
      ) {
        return {
          id: item.product.id,
          title: item.product.name,
          quantity: item.quantity,
          currency_id: "ARS",
          unit_price: item.product.price,
        };
      }),
    },
  });

return NextResponse.json({
  id: response.id,
  init_point: response
});

} catch (error) {
console.error(
"Mercado Pago:",
error
);


return NextResponse.json(
  {
    error:
      "No se pudo crear la preferencia de Mercado Pago.",
  },
  {
    status: 500,
  }
);

}
}
