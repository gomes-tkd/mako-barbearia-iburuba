"use client";
import React from "react";
import {useFormStatus, useFormState} from "react-dom";
import Button from "@/components/button/button";
import ErrorMessage from "@/components/helpers/error-message";
import Input from "@/components/input/input";
import styles from "./perdeu-form.module.css";
import Link from "next/link";

function FormButton() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button disabled={pending}>Resetando...</Button>
            ) : (
                <Button>Resetar</Button>
            )}
        </>
    )
}

export default function PerdeuForm() {
    return (
        <>
            <form action="">
                <Input label={"Email"} name={"email"} type={"email"}/>
                <Input label={"Senha"} name={"password"} type={"password"}/>
                <Input label={"Confirmar senha"} name={"password"} type={"password"}/>
                <ErrorMessage message={"Error"}/>
                <FormButton/>
            </form>
            <div className={styles.cadastro}>
                <h2 className={styles.subtitle}>Lembrou a senha?</h2>
                <p>Logue-se no site.</p>
                <Link className="button" href="/login/">
                    Entrar
                </Link>
            </div>
        </>
    );
}
