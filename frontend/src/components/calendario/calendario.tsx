"use client";
import React from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import agendarHorario from "@/app/actions/agendar-horario";

type AvailableTimeslot = {
    startTime: Date;
    endTime: Date;
    id?: string | number | undefined;
};

type SplitTimeslot = null | ModifiedTimeslot;

type ModifiedTimeslot = AvailableTimeslot & {
    oldId: string | number | undefined;
};

type StartTimeEventEmit = {
    availableTimeslot: AvailableTimeslot;
    startTime: Date;
    splitTimeslot?: [SplitTimeslot, SplitTimeslot];
    resetDate: () => void;
    resetSelectedTimeState: () => void;
};

export default function Calendario({ clienteId }: { clienteId: string }) {

    const [isClient, setIsClient] = React.useState(false);
    const [time, setTime] = React.useState<Date | null>(null);

    const availableTimeslots: AvailableTimeslot[] = Array.from({ length: 31 }, (_, id) => ({
        id,
        startTime: new Date(new Date().setDate(new Date().getDate() + id)),
        endTime: new Date(new Date().setDate(new Date().getDate() + id)),
    })).map(slot => ({
        ...slot,
        startTime: new Date(slot.startTime.setHours(14, 0, 0, 0)),
        endTime: new Date(slot.endTime.setHours(23, 0, 0, 0)),
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
        // const timestamp = time.toISOString();
        const horario = time.getTime();
        const dia = time.getDate();
        const mes = time.getMonth();
        const ano = time.getFullYear();

        info = await agendarHorario({ clienteId, horario, dia, mes, ano });

        if(info) {
            alert("Horário agendado com sucesso!!");
        } else {
            alert("Horário não pode ser agendado");
        }

    }

    return (
        <ScheduleMeeting
            borderRadius={8}
            primaryColor="#3f5b85"
            eventDurationInMinutes={60}
            availableTimeslots={availableTimeslots}
            onStartTimeSelect={({ startTime }) => timeTeste(startTime)}
        />
    );
}
