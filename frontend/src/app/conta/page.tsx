import Link from "next/link"
import Calendario from "@/components/calendario/calendario";
import PerfilUsuario from "@/components/perfil/perfil-usuario/perfil";
import CartaoFidelidade from "@/components/cartao-fidelidade/cartao-fidelidade";
import styles from "./conta.module.css";
import Fidelidade from "@/components/perfil/fidelidade/fidelidade";

export default async function ContaPage() {
    return (
        <section className={"container mainContainer animeLeft"}>
            <div className={styles.contaInfo}>
                <h1 className={"title"}>Perfil</h1>
                <Link href={"/conta/editar-dados"}>Editar dados</Link>
                <PerfilUsuario
                    nome={"José Gomes"}
                    email={"jgomestkd@gmail.com"}
                    contato={"(55) 9 9115-4461"}
                    cpf={"03949285040"}
                />
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
