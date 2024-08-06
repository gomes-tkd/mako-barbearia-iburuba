import React from 'react';
import getServicos from "@/app/actions/get-servicos";
import Servicos from "@/components/servicos/servicos";
import api from "@/functions/api";

type ServicosProps = {
    servicos: {
        nomeServico: string;
        precoServico: string;
    }
}

const ServicosPage = async () => {
    const servicos = getServicos() as unknown as ServicosProps[];
    return (
        <div>
            <h1>Serviços disponibilizados:</h1>
            {/*<Servicos dataServicos={servicos} />*/}
        </div>
    );
};

export default ServicosPage;
