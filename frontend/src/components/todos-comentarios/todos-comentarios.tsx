import React from "react";
import getTodosComentarios from "@/app/actions/get-todos-comentarios";

type Comentario = {
    comments: comments[]
}

type comments = {
    _id: string;
    autorId: string;
    comentario: string;
    createdAt: string;
    updatedAt: string;
}

export default async function TodosComentarios() {
    const comentarios = await getTodosComentarios() as unknown as Comentario[];
    console.log(comentarios);
    return (
        <div>
            {(comentarios.comments || []).map(((comment: comments, index: any) => <p key={index}>{comment.comentario}</p>))}
        </div>
    )
}