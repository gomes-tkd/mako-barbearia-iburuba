"use client";
import styles from "./perfil.module.css";

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
        </div>
    );
}
