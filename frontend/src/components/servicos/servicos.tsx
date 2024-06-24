"use client";
import getServicos from "@/app/actions/get-servicos";

type ServicosProps = {
    nomeServico: string;
    precoServico: string;
}

export default function Servicos(servico: any) {
    const { servicos } = servico;
    console.log(servicos.servicos);

    return (
        <ul>
            {servicos.servicos.map((info: ServicosProps, index: any) => (
                <li key={index}>
                    <p>Nome: {info.nomeServico}</p>
                    <p>Preço: {info.precoServico}</p>
                </li>
            ))}
        </ul>
    )
}
