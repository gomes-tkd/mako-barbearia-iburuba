"use server";
import apiError from "@/functions/api-error";
import api from "@/functions/api";

type Comentario = {
    message: string;
    comments: [];
}

type Comments = {
    _id: string;
    autorId: string;
    autorNome: string;
    comentario: string;
}

export default async function getTodosComentarios() {
    const data = await api.get("/comment/").then(response => response.data) as Comentario[];

    if (!data) {
        throw new Error("Could not find comment data.");
    }

    const comments = data.comments as Comments[];

    if (!comments) {
        console.log("sem comentários");
    }

    return {
        comments,
        error: "",
        ok: false
    }
}