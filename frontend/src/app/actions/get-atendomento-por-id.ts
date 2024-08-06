"use server";
import React from "react";
import apiError from "@/functions/api-error";
import api from "@/functions/api";
import { cookies } from "next/headers";
import getUser from "@/app/actions/get-user";

type Usuario = {
    data: {
        _id: string;
        nome: string;
        email: string;
        contato: string;
        tipoUsuario: string;
        cpf: string;
    }
}

export default async function getAtendomentoPorId() {
    const user = await getUser() as unknown as Usuario;
    if(!user) {
        throw new Error("Usuário inválido!");
    }

    const token = cookies().get("token")?.value as string;

    if (!token) {
        throw new Error("Token inválido!");
    }
    // let data;
    const data = await api.get(`schedule/${user.data._id}/cliente`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then(response => response.data);

    if (!data) {
        throw new Error(`Erro ao pegar os agendamentos do id: ${user.data._id}`);
    }

    return {
        data: data.scheduling,
        ok: false,
        error: ""
    }
}