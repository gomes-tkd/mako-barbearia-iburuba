"use client";
import React from "react";
import { ScheduleMeeting } from "react-schedule-meeting";

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

export default function Calendario() {
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

    if (!availableTimeslots) return null;
    if (!isClient) return null;

    return (
        <ScheduleMeeting
            borderRadius={8}
            primaryColor="#3f5b85"
            eventDurationInMinutes={45}
            availableTimeslots={availableTimeslots}
            onStartTimeSelect={availableTimeslot => setTime(availableTimeslot.startTime)}
        />
    );
}
