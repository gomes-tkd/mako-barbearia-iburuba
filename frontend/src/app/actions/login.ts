"use server";

import apiError from "@/functions/api-error";
import api from "@/functions/api";
import { cookies } from "next/headers";

export default async function login(state: {}, formData: FormData) {
    const email = formData.get('username') as string | null;
    const senha = formData.get('password') as string | null;

    try {
        if(!email || !senha) {
            throw new Error("Preencha os campos!");
        }

        const data = await api.post("/user/login", {email, senha}).then(response => response.data);

        if (!data) {
            throw new Error("Erro ao logar!");
        }

        cookies().set("token", data.token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: (60 * 60 * 2)
        });

        return {
            data: null,
            ok: true,
            error: ""
        }
    } catch (e) {
        return apiError(e);
    }
}
