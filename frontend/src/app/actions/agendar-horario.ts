"use server";
import api from "@/functions/api";
import {cookies} from "next/headers";

type AgendamentoProps = {
    clienteId: string,
    horario: number,
    dia: number,
    mes: number,
    ano: number
}

export default async function agendarHorario({ clienteId, horario, dia, mes, ano }: AgendamentoProps) {
    try {
        const token = cookies().get("token")?.value;
        console.log(token);

        if(!token) {
            throw new Error("Acesso inválido!");
        }

        const data = await api.post(`/schedule/${clienteId}/agendar`, {
            clienteId, horario, dia, mes, ano, servicosRequisitados:["66774b5c3b131f05e238ca4c", "66774b653b131f05e238ca4f"]
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(response => response.data);

        console.log(data);

        return true;
    } catch (e) {
        return false;
    }
}
