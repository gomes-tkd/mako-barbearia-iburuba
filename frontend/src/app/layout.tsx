import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/header";
import { type_first, type_second } from "@/functions/fonts";
import Footer from "@/components/footer/footer";
import getUser from "@/app/actions/get-user";
import { UserContextProvider } from "@/contex/user-context";

type Usuario = {
    _id: string;
    nome: string;
    email: string;
    contato: string;
}

export const metadata: Metadata = {
  title: "Mako Barbershop",
  description: "Mako Barbershop - Ibirubá RS",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const data = (await getUser()) as unknown as Usuario;

  return (
    <html lang="pt-BR">
      <body className={`${type_first.variable} ${type_second.variable}`}>
      <UserContextProvider usuario={data}>
        <div className={"App"}>
          <Header />
          <main className={"AppBody"}>
              {children}
          </main>
          <Footer />
        </div>
      </UserContextProvider>
      </body>
    </html>
  );
}
