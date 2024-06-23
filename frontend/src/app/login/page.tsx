import { Metadata } from "next";
import LoginForm from "@/components/login/loginForm/login-form";

export const metadata: Metadata = {
    title: "Mako | Login",
    description: "Logue na sua conta no site Mako Barbershop."
}

export default async function Login() {
    return (
        <section className={"animeLeft"}>
            <h1 className={"title"}>Login</h1>
            <LoginForm />
        </section>
    )
}
