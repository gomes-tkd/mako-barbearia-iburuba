"use client";
import React from "react";

type ServicosParams = {
    dataServicos: any;
    servicosRequisitados: string[];
    setServicosRequisitados: any
}

type ServicosProps = {
    _id: string;
    nomeServico: string;
    precoServico: string;
}

const Servicos: React.FC<ServicosParams> = ({ dataServicos, servicosRequisitados, setServicosRequisitados }: ServicosParams) => {
    const { servicos } = dataServicos;

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setServicosRequisitados((prevValues: any) => {
            if (prevValues.includes(value)) {
                return prevValues.filter((val: any) => val !== value);
            } else {
                return [...prevValues, value];
            }
        });
    };

    return (
        <div>
            <h2 className={"subtitle"}>Serviços ofertados!</h2>
            <ul>
                {servicos.map((info: ServicosProps) => (
                    <li key={info._id}>
                        <label htmlFor={info.nomeServico}>
                            <p>{info._id} </p>
                            <p>{info.nomeServico} </p>
                            <p>{info.precoServico}</p>
                            <input
                                type="checkbox"
                                value={info._id}
                                onChange={handleCheckboxChange}
                                checked={servicosRequisitados.includes(info._id)}
                            />
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Servicos;
