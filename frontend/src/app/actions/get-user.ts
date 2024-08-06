"use server";
import apiError from "@/functions/api-error";
import api from "@/functions/api";
import { cookies } from "next/headers";

type Usuario = {
    _id: string;
    nome: string;
    email: string;
    contato: string;
    tipoUsuario: string;
    cpf: string;
}

export default async function getUser() {
    try {
        const token = cookies().get("token")?.value as string;

        if (!token) {
            throw new Error("Acesso inválido!");
        }

        const data = await api.get("/user/checkuser", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(response => response.data);

        if (!data) {
            throw new Error("Usuário não encontrado!");
        }

        return {
            data: (data as Usuario),
            ok: true,
            error: ""
        }
    } catch (e) {
        return apiError(e);
    }
}
