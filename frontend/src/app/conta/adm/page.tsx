import React from "react";
import styles from "../conta.module.css";
import Link from "next/link";
import PerfilUsuario from "@/components/perfil/perfil-usuario/perfil";
import getUser from "@/app/actions/get-user";
import getServicos from "@/app/actions/get-servicos";

type UsuarioInfo = {
    _id: string;
    nome: string;
    contato: string;
    email: string;
    tipoUsuario: string;
    cpf: string;
}

export default async function ContaAdmPage() {
    const { data } = await getUser();
    const dataServicos = (await getServicos());
    const usuario = (data as UsuarioInfo);

    return (
        <section  className={"container animeLeft"}>
            <div className={styles.contaInfo}>
                <h1 className={"title"}>Administrador</h1>
                <Link href={`/conta/${usuario.tipoUsuario}/editar-dados`}>Editar dados</Link>
                <PerfilUsuario nome={usuario.nome} email={usuario.email} contato={usuario.contato}/>
            </div>
            <h1>ADM</h1>
        </section>
    );
}