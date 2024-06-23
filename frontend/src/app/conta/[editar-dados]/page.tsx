import Link from "next/link";
import EditarPerfil from "@/components/perfil/editar-perfil/editar-perfil";
import styles from "./editar-dados.module.css";
import getUser from "@/app/actions/get-user";

type Usuario = {
    _id: string;
    nome: string;
    email: string;
    contato: string;
}

export default async function EditarDadosPage() {
    const { data } = (await getUser());
    const info = data as Usuario;

    return (
        <section className={"container animeLeft"}>
            <div className={styles.editarInfos}>
                <Link href={"/conta"}>voltar</Link>
                <h1 className={"title"}>Editar Dados</h1>
                <EditarPerfil nome={info.nome} email={info.email} _id={info._id} contato={info.contato} />
            </div>
        </section>
    )
}
