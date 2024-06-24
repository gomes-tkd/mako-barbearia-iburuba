import React from 'react';
import getServicos from "@/app/actions/get-servicos";
import Servicos from "@/components/servicos/servicos";

type ServicosProps = {
    servicos: {
        nomeServico: string;
        precoServico: string;
    }
}

const ServicosPage = async () => {
    const data = (await getServicos());

    return (
        <div>
            <h1>Serviços disponibilizados:</h1>
            <Servicos servicos={data} />
        </div>
    );
};

export default ServicosPage;
