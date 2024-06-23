import styles from "./perfil.module.css";
import getUser from "@/app/actions/get-user";

type UsuarioInfo = {
    nome: string;
    contato: string;
    email: string;
}

export default async function PerfilUsuario({ nome, contato, email }: UsuarioInfo) {

    return (
        <div className={styles.perfilInfo}>
            <h2>{nome}</h2>
            <p>Contato: {contato}</p>
            <p>Email: {email}</p>
        </div>
    );
}
