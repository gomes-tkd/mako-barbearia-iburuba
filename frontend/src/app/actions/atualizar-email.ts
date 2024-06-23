"use server";
import api from "@/functions/api";
import {cookies} from "next/headers";

type UserInfo = {
    _id: string;
    emailAtualizado: string;
    confirmarEmail: string;
}

export default async function atualizarEmail({ _id, emailAtualizado, confirmarEmail }: UserInfo) {
    const email = emailAtualizado;
    const confirmEmail = confirmarEmail;

    if (!email) {
        throw new Error("O campo email deve ser preenchido.");
    }

    if(!confirmEmail) {
        throw new Error("O campo confirmação do email deve ser preenchido.");
    }

    if (email !== confirmarEmail) {
        throw new Error("Campo email e confirmação de email devem ser iguais.");
    }

    try {
        const token = cookies().get("token")?.value;

        if(!token) {
            throw new Error("Acesso inválido!");
        }

        await api.patch(`/user/${_id}/edit/email`, {
            email, confirmarEmail,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(response => response.data);

        return true;
    } catch (e: unknown) {
        return false;
    }
}
