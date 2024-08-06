"use server";
import apiError from "@/functions/api-error";
import api from "@/functions/api";

type Comentario = {
    _id: string;
    autorId: string;
    autorNome: string;
    comentario: string;
}

export default async function getTodosAgendamentos() {
    const data = await api.get("/comment/").then(response => data) as Comentario[];

    if (!data) {
        throw new Error("Could not find comment data.");
    }

    console.log(data);
}