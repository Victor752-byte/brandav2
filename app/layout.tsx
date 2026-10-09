import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart/cart-context";
export const metadata: Metadata = {
  title: {
    default: "Branda — Make your brand mean more",
    template: "%s | Branda",
  },
  description:
    "Thoughtful branding, made easy. Discover design, print and studio services from Branda.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
