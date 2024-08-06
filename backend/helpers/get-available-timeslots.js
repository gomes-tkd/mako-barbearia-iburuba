const agendamentos = require("../model/SchedulingModel");

const getAvailableTimeslots = async () => {
    const startHour = 14;
    const endHour = 20;
    const daysOfWeek = [1, 2, 3, 4, 5, 6]; // Segunda a sábado

    // Gerar horários disponíveis
    const availableTimeslots = [];
    const today = new Date();

    // Definir o número de dias que queremos gerar horários
    const daysToGenerate = 30;

    for (let i = 0; i < daysToGenerate; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        // Verificar se o dia é de segunda a sábado
        if (daysOfWeek.includes(currentDate.getDay())) {
            for (let hour = startHour; hour < endHour; hour++) {
                availableTimeslots.push({
                    startTime: new Date(currentDate.setHours(hour, 0, 0, 0)),
                    endTime: new Date(currentDate.setHours(hour + 1, 0, 0, 0))
                });
            }
        }
    }

    // Obter horários já agendados
    const bookedSlots = await agendamentos.find().select("horario -_id");
    const bookedTimes = bookedSlots.map(slot => slot.horario.getTime());

    // Filtrar horários disponíveis que não estão ocupados
    const filteredTimeslots = availableTimeslots.filter(slot => !bookedTimes.includes(slot.startTime.getTime()));

    return filteredTimeslots;
}

module.exports =  getAvailableTimeslots;