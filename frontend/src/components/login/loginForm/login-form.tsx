"use client";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import Button from "@/components/button/button";
import ErrorMessage from "@/components/helpers/error-message";
import Input from "@/components/input/input";
import Link from "next/link";
import styles from "./login-form.module.css";

function FormButton() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button disabled={pending}>Logando...</Button>
            ) : (
                <Button>logar</Button>
            )}
        </>
    )
}

export default function LoginForm() {

    return (
        <>
            <form action={""} className={styles.form}>
                <Input label={"Usuário"} name={"email"} type={"text"} />
                <Input label={"Senha"} name={"senha"} type={"password"} />
                <FormButton />
            </form>
            <Link className={styles.perdeu} href="/login/perdeu">
                Perdeu a senha?
            </Link>
            <div className={styles.cadastro}>
                <h2 className={styles.subtitle}>Cadastre-se</h2>
                <p>Ainda não possui conta? Cadastre-se no site.</p>
                <Link className="button" href="/login/criar">
                    Cadastro
                </Link>
            </div>
        </>
    )
}
