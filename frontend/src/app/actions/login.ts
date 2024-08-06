"use server";

import apiError from "@/functions/api-error";
import api from "@/functions/api";
import { cookies } from "next/headers";
import getUser from "@/app/actions/get-user";



export default async function login(state: {}, formData: FormData) {
    const email = formData.get('username') as string | null;
    const senha = formData.get('password') as string | null;
    let tipoConta = "";

    try {
        if(!email || !senha) {
            throw new Error("Preencha os campos!");
        }

        const data = await api.post("/user/login", { email, senha }).then(response => response.data);

        if (!data) {
            throw new Error("Erro ao logar!");
        }

        const user = await api.get("/user/checkuser", {
            headers: {
                Authorization: `Bearer ${data.token}`,
            }
        }).then(response => response.data);

        // if (user.tipoUsuario === "cliente") {
        //     console.log("clienteee");
        // } else if (user.data.tipoUsuario === "adm") {
        //     console.log("admm");
        // }

        cookies().set("token", data.token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: (60 * 60 * 2)
        });

        return {
            data,
            ok: true,
            error: "",
            url: `/conta/${user.tipoUsuario}`
        }
    } catch (e) {
        return apiError(e);
    }
}
