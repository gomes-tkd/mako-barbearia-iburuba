"use client";
import styles from "./perfil.module.css";
import { logout } from "@/app/actions/logout";
import {getUser} from "@/app/actions/get-user";

type PerfilUsuarioProps = {
    nome: string;
    contato: string;
    email: string;
    cpf: string;
}

export default function PerfilUsuario({ nome, contato, email, cpf }: PerfilUsuarioProps) {

    return (
        <div className={styles.perfilInfo}>
            <h2>{nome}</h2>
            <p>Contato: {contato}</p>
            <p>Email: {email}</p>
            <p>CPF: {cpf}</p>
            <button onClick={() => logout()}>sair</button>
        </div>
    );
}
