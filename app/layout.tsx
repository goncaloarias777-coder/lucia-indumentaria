import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "../components/StoreProvider";

export const metadata: Metadata = {
title: "Lucia Indumentaria | Moda femenina",
description: "Lucia Indumentaria - colección de moda femenina, prendas seleccionadas y estilo contemporáneo.",
};

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
<html lang="es">
<body>
<StoreProvider>{children}</StoreProvider>
</body>
</html>
);
}
