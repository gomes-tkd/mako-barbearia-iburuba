"use client";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import styles from "./comentario.module.css";
import Input from "@/components/input/input";
import Button from "@/components/button/button";
import adicionarComentario from "@/app/actions/adicionar-comentario";

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled={pending}>Comentando...</Button>
      ) : (
        <Button>Comentar</Button>
      )}
    </>
  );
}

export default function ComentarioCliente() {
    const [comentario, setComentario] = React.useState("");

    async function handleSubmit(e: any) {
        e.preventDefault();
        const info = await adicionarComentario(comentario);

        if (info) {
            alert("Comentário cadastrado com sucesso!");
        } else {
            alert("Erro interno");
        }

        setComentario("");
;
    }

  return (
    <form onSubmit={handleSubmit} className={styles.comentarioContainer}>
      <label>Deixe seu comentário e sugestões!</label>
      <textarea
          value={comentario}
          onChange={(({ target }) => setComentario(target.value))}
          rows={5}
          className={styles.textarea}
      ></textarea>
      <FormButton />
    </form>
  );
}
