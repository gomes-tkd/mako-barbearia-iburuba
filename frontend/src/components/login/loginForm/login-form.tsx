"use client";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import Button from "@/components/button/button";
import ErrorMessage from "@/components/helpers/error-message";
import Input from "@/components/input/input";
import Link from "next/link";
import styles from "./login-form.module.css";
import login from "@/app/actions/login";

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
    const [state, action] = useFormState(login, {
        data: null,
        ok: false,
        error: "",
        url: ""
    });

    React.useEffect(() => {
        if(state.ok) {
            window.location.href = state.url;
        }

    }, [state.ok]);

    return (
        <>
            <form action={action} className={styles.form}>
                <Input label="Usuário" name="username" type="text" />
                <Input label="Senha" name="password" type="password" />
                <ErrorMessage message={state.error} />
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
