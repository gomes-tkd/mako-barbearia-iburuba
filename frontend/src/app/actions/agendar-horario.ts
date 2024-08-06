"use server";
import api from "@/functions/api";
import {cookies} from "next/headers";

type AgendamentoProps = {
    clienteId: string,
    horario: number,
    dia: number,
    mes: number,
    ano: number,
    servicosRequisitados: string[]
}

export default async function agendarHorario({ clienteId, horario, dia, mes, ano, servicosRequisitados }: AgendamentoProps) {
    try {
        const token = cookies().get("token")?.value;
        console.log(token);

        if(!token) {
            throw new Error("Acesso inválido!");
        }

        const data = await api.post(`/schedule/${clienteId}/agendar`, {
            clienteId, horario, dia, mes, ano, servicosRequisitados
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(response => response.data);

        return true;
    } catch (e) {
        return false;
    }
}
