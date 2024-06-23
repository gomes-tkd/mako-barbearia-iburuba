import Link from "next/link"
import Calendario from "@/components/calendario/calendario";
import PerfilUsuario from "@/components/perfil/perfil-usuario/perfil";
import styles from "./conta.module.css";
import Fidelidade from "@/components/perfil/fidelidade/fidelidade";
import getUser from "@/app/actions/get-user";

type UsuarioInfo = {
    nome: string;
    contato: string;
    email: string;
}

export default async function ContaPage() {
    const { data } = await getUser();
    const usuario = (data as UsuarioInfo);
    return (
        <section className={"container mainContainer animeLeft"}>
            <div className={styles.contaInfo}>
                <h1 className={"title"}>Perfil</h1>
                <Link href={"/conta/editar-dados"}>Editar dados</Link>
                <PerfilUsuario nome={usuario.nome} email={usuario.email} contato={usuario.contato} />
                <Fidelidade />
                {/*<CartaoFidelidade />*/}
                <div className={styles.calendarioAgendamento}>
                    <Calendario />
                </div>
                <div className={styles.agendamentoLista}>
                    <h3>Agendamento: lista</h3>
                    <ul>
                        <li>primeiro agendamento</li>
                        <li>segundo agendamento</li>
                        <li>terceiro agendamento</li>
                        <li>quarto agendamento</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
