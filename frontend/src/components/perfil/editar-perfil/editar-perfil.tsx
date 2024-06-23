"use client";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import styles from "./editar-perfil.module.css";

function FormButton() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button disabled={pending}>Editar...</Button>
            ) : (
                <Button>Editar</Button>
            )}
        </>
    )
}

export default function EditarPerfil() {
    return (
        <div className={styles.formularioEditar}>
            <form className={"form"}>
                <Input label={"Nome"} name={"nome"} type={"text"} />
                <Input label={"Contato"} name={"contato"} type={"text"} />
                <FormButton />
            </form>
            <form className={"form"}>
                <Input label={"Email"} name={"email"} type={"email"} />
                <Input label={"Confirmar email"} name={"confirmarEmail"} type={"email"} />
                <FormButton />
            </form>
            <form className={`form ${styles.formularioEditarSenha}`}>
                <Input label={"Senha"} name={"senha"} type={"senha"} />
                <Input label={"Confirmar Senha"} name={"confirmarSenha"} type={"senha"} />
                <FormButton />
            </form>
        </div>
    )
}
