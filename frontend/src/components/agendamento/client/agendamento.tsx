import React from "react";
import getAtendomentoPorId from "@/app/actions/get-atendomento-por-id";
import styles from "./agendamento.module.css";

export default async function AgendamentoCliente() {
  const { data } = (await getAtendomentoPorId()) || [];

  function convertToDatetime(time: string) {
    const tempo = new Date(time);
    const dia = tempo.getDate();
    const mes = tempo.getMonth() + 1;
    const hora = tempo.getHours();
    const minutos = tempo.getMinutes();

    return `${dia} - ${mes} - ${tempo.getFullYear()} às ${hora}:${minutos}`;
  }

  function somaTotalPagar({ nome, preco }: { nome: string; preco: string }) {
    let total = +preco
      .replace("R$", "")
      .trim()
      .replace(" ", "")
      .replace(",", ".");

    return total;
  }

  return (
    <>
      <ul className={styles.agendamentoGrid}>
        {(data || []).map((item: any) => (
          <li className={styles.agendamentoInformacoes} key={item._id}>
            Data: {convertToDatetime(item.createdAt)}
            <h4>Serviços</h4>
            <ul className={styles.agendamentoServicos}>
              {item.servicosRequisitados.map((servico: any, index: any) => (
                <li key={index}>
                  {servico.nome}: {servico.preco}
                </li>
              ))}
              <li>
                Total a pagar: R${" "}
                {item.servicosRequisitados
                  .map(somaTotalPagar)
                  .reduce((total: any, soma: any) => total + soma)
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")}
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}
