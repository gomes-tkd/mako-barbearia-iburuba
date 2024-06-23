"use client";
import Button from "@/components/button/button";
import styles from "./criar-form.module.css";
import { useFormState, useFormStatus } from "react-dom";
import React from "react";
import Input from "@/components/input/input";
import ErrorMessage from "@/components/helpers/error-message";
import Link from "next/link";
import registrar from "@/app/actions/registrar";

function FormButton() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button disabled={pending}>Cadastrando...</Button>
            ) : (
                <Button>Cadastrar</Button>
            )}
        </>
    )
}

export default function CriarForm() {
    const [state, action] = useFormState(registrar, {
        data: null,
        ok: false,
        error: ""
    });

    React.useEffect(() => {
        if(state.ok) {
            window.location.href = "/conta";
        }
    }, [state.ok]);

    return (
        <>
            <form action={action} className={styles.form}>
                <Input label={"Usuário"} name={"username"} type={"text"}/>
                <Input label={"Telefone"} name={"contato"} type={"text"}/>
                <Input label={"Email"} name={"email"} type={"email"}/>
                <Input label={"Senha"} name={"password"} type={"password"}/>
                <Input label={"Confirmar senha"} name={"confirmPassword"} type={"password"}/>
                <ErrorMessage message={state.error} />
                <FormButton/>
            </form>
            <Link className={styles.perdeu} href="/login/perdeu">
                Esqueceu a senha?
            </Link>
            <div className={styles.cadastro}>
                <h2 className={styles.subtitle}>Já possui cadastro?</h2>
                <p>Logue-se no site.</p>
                <Link className="button" href="/login/">
                    Entrar
                </Link>
            </div>
        </>
    );
}
