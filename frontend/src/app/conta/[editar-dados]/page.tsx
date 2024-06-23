import Link from "next/link";
import EditarPerfil from "@/components/perfil/editar-perfil/editar-perfil";
import styles from "./editar-dados.module.css";

export default function EditarDadosPage() {
    return (
        <section className={"container mainContainer animeLeft"}>
            <div className={styles.editarInfos}>
                <Link href={"/conta"}>voltar</Link>
                <h1 className={"title"}>Editar Dados</h1>
                <EditarPerfil/>
            </div>
        </section>
    )
}
