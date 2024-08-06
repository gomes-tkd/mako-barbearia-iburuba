import Link from "next/link";
import Calendario from "@/components/calendario/calendario";
import PerfilUsuario from "@/components/perfil/perfil-usuario/perfil";
import styles from "../conta.module.css";
import Fidelidade from "@/components/perfil/fidelidade/fidelidade";
import getUser from "@/app/actions/get-user";
import Servicos from "@/components/servicos/servicos";
import getServicos from "@/app/actions/get-servicos";
import React from "react";
import AgendamentoCliente from "@/components/agendamento/client/agendamento";
import ComentarioCliente from "@/components/comentario/comentario";

type UsuarioInfo = {
  _id: string;
  nome: string;
  contato: string;
  email: string;
  tipoUsuario: string;
  cpf: string;
};

export default async function ContaClientePage() {
  const { data } = await getUser();
  const dataServicos = await getServicos();
  const usuario = data as UsuarioInfo;

  return (
    <section className={"container animeLeft"}>
      <div className={styles.contaInfo}>
        <h1 className={"title"}>Perfil</h1>
        <Link href={`/conta/${usuario.tipoUsuario}/editar-dados`}>
          Editar dados
        </Link>
        <PerfilUsuario
          nome={usuario.nome}
          email={usuario.email}
          contato={usuario.contato}
        />
        <Fidelidade />
        {/*<CartaoFidelidade />*/}
        <div className={styles.calendarioAgendamento}>
          <Calendario dataServicos={dataServicos} clienteId={usuario._id} />
        </div>
        <div className={styles.agendamentoLista}>
          <h3>Agendamento: lista</h3>
          <AgendamentoCliente />
        </div>
        <div>
          <h3>O que achaste do nosso atendimento?</h3>
          <ComentarioCliente />
        </div>
      </div>
    </section>
  );
}
