"use server";
import api from "@/functions/api";

type ServicoProps = {
    nomeServico: string;
    precoServico: String;
}

type ServicosProps = {
    servicos: ServicoProps[];
}

export default async function getServicos() {
    const data = await api.get("/servicos/").then(response => response.data);

    return (data as ServicosProps);
}
