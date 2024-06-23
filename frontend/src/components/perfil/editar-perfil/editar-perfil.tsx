"use client";
import React, {FormEvent, useState} from "react";
import { useFormStatus } from "react-dom";
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import styles from "./editar-perfil.module.css";
import atualizarSenha from "@/app/actions/atualizar-senha";
import atualizarDadosUsuario from "@/app/actions/atualizar-dados-usuario";
import atualizarEmail from "@/app/actions/atualizar-email";

type UsuarioInfo = {
    _id: string;
    nome: string;
    contato: string;
    email: string;
}

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

export default function EditarPerfil({nome, contato, email, _id}: UsuarioInfo) {
    let info = false;

    const [nomeAtualizado, setNomeAtualizado] = useState(nome);
    const [contatoAtualizado, setContatoAtualizado] = useState(contato);
    const [emailAtualizado, setEmailAtualizado] = useState(email);
    const [confirmarEmail, setConfirmarEmail] = useState(email);
    const [senha, setSenha] = React.useState("");
    const [confirmarSenha, setConfirmarSenha] = React.useState("");

    async function handleTrocarSenha(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        info = await atualizarSenha({ _id, senha, confirmarSenha });

        if (info) {
            alert("Senha atualizada com sucesso!");
            window.location.href = "/conta";
        }
    }

    async function handleAtualizarNomeContato(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        info = await atualizarDadosUsuario({ _id, nomeAtualizado, contatoAtualizado });
        if(info) {
            alert("Dados atualizados com sucesso!");
            window.location.href = "/conta";
        }
    }

    async function handleAtualizarEmail(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        info = await atualizarEmail({ _id, emailAtualizado, confirmarEmail });
        if (info) {
            alert("Email atualizada com sucesso!");
            window.location.href = "/conta";
        } else {
            alert("entrou aqui");
        }
    }

    return (
        <div className={styles.formularioEditar}>
            <form onSubmit={handleAtualizarNomeContato} className={"form"}>
                <Input
                    label={"Nome"}
                    name={"nome"}
                    type={"text"}
                    value={nomeAtualizado}
                    onChange={({ target }) => setNomeAtualizado(target.value)}
                />
                <Input
                    label={"Contato"}
                    name={"contato"}
                    type={"text"}
                    value={contatoAtualizado}
                    onChange={({ target }) => setContatoAtualizado(target.value)}
                />
                {/*<ErrorMessage message={info.error} />*/}
                <FormButton />
            </form>
            <form onSubmit={handleAtualizarEmail} className={"form"}>
                <Input
                    label={"Email"}
                    name={"email"}
                    type={"email"}
                    value={emailAtualizado}
                    onChange={({ target }) => setEmailAtualizado(target.value)}
                />
                <Input
                    label={"Confirmar email"}
                    name={"confirmarEmail"}
                    type={"email"}
                    value={confirmarEmail}
                    onChange={({ target }) => setConfirmarEmail(target.value)}
                />
                <FormButton />
            </form>
            <form onSubmit={handleTrocarSenha} className={`form ${styles.formularioEditarSenha}`}>
                <Input
                    label={"Senha"}
                    name={"senha"}
                    type={"password"}
                    value={senha}
                    onChange={({ target }) => setSenha(target.value)}
                />
                <Input
                    label={"Confirmar Senha"}
                    name={"confirmarSenha"}
                    type={"password"}
                    value={confirmarSenha}
                    onChange={({ target }) => setConfirmarSenha(target.value)}
                />
                {/*<ErrorMessage message={info.error} />*/}
                <FormButton />
            </form>
        </div>
    )
}
