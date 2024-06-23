"use server";
import api from "@/functions/api";
import apiError from "@/functions/api-error";
import {cookies} from "next/headers";

type UserInfo = {
    _id: string;
    nomeAtualizado: string;
    contatoAtualizado: string;
}

export default async function atualizarDadosUsuario(
    { _id, nomeAtualizado, contatoAtualizado }: UserInfo
) {
    if (!nomeAtualizado || !contatoAtualizado) {
        throw new Error("Preencha os campos!");
    }

    const nome = nomeAtualizado;
    const contato = contatoAtualizado;

    try {
        const token = cookies().get("token")?.value;

        if (!token) {
            throw new Error("Acesso não autorizado!");
        }


        await api.patch(`/user/${_id}/edit/`, {
            nome, contato,
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
