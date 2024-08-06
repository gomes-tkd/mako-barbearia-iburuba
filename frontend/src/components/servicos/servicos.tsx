"use client";
import React from "react";
import styles from "./servicos.module.css";

type ServicosParams = {
  dataServicos: any;
  servicosRequisitados: string[];
  setServicosRequisitados: any;
};

type ServicosProps = {
  _id: string;
  nomeServico: string;
  precoServico: string;
};

const Servicos: React.FC<ServicosParams> = ({
  dataServicos,
  servicosRequisitados,
  setServicosRequisitados,
}: ServicosParams) => {
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
      <ul className={styles.servicosFlex}>
        {servicos.map((info: ServicosProps) => (
          <li key={info._id} className={styles.servicosInfo}>
            <label htmlFor={info.nomeServico} className={styles.servicosLabel}>
              <input
                type="checkbox"
                id={info.nomeServico}
                name={info.nomeServico}
                value={info._id}
                onChange={handleCheckboxChange}
                checked={servicosRequisitados.includes(info._id)}
              />
              <p>{info.nomeServico} </p>
            </label>
            <p>
              {info.precoServico
                .toString()
                .replace("R$", "R$ ")
                .replace(".", ",")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Servicos;
