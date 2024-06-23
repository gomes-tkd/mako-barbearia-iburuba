import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/header";
import { type_first, type_second } from "@/functions/fonts";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Mako Barbershop",
  description: "Mako Barbershop - Ibirubá RS",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="pt-BR">
      <body className={`${type_first.variable} ${type_second.variable}`}>
        <div className={"App"}>
          <Header />
          <main className={"AppBody"}>
              {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
