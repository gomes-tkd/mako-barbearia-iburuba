"use client";
import React from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import agendarHorario from "@/app/actions/agendar-horario";
import Servicos from "@/components/servicos/servicos";

type AvailableTimeslot = {
    startTime: Date;
    endTime: Date;
    id?: string | number | undefined;
};


export default function Calendario({ clienteId, dataServicos }: { clienteId: string, dataServicos: any }) {
    const [servicosRequisitados, setServicosRequisitados] = React.useState<string[]>([]);
    const [isClient, setIsClient] = React.useState(false);

    const availableTimeslots: AvailableTimeslot[] = Array.from({ length: 31 }, (_, id) => ({
        id,
        startTime: new Date(new Date().setDate(new Date().getDate() + id)),
        endTime: new Date(new Date().setDate(new Date().getDate() + id)),
    })).map(slot => ({
        ...slot,
        startTime: new Date(slot.startTime.setHours(14, 0, 0, 0)),
        endTime: new Date(slot.endTime.setHours(20, 0, 0, 0)),
    }));

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    if (!availableTimeslots) {
        return null;
    }

    if (!isClient) {
        return null;
    }

    async function timeTeste(time: Date) {
        let info = false;
        const horario = time.getTime();
        const dia = time.getDate();
        const mes = time.getMonth();
        const ano = time.getFullYear();

        info = await agendarHorario({
            clienteId, horario, dia, mes, ano, servicosRequisitados
        });

        if(info) {
            alert("Horário agendado com sucesso!!");
        } else {
            alert("Horário não pode ser agendado");
        }
    }

    return (
        <>
            <Servicos
                dataServicos={dataServicos}
                servicosRequisitados={servicosRequisitados}
                setServicosRequisitados={setServicosRequisitados}
            />
            <ScheduleMeeting
                borderRadius={8}
                primaryColor="#3f5b85"
                eventDurationInMinutes={60}
                availableTimeslots={availableTimeslots}
                onStartTimeSelect={({ startTime }) => timeTeste(startTime)}
            />
        </>

    );
}
