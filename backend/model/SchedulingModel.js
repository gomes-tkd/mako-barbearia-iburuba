const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Schedule = mongoose.model(
    "Agendamento",
    new Schema({
            clienteId: {
                type: String,
                // required: true
            },
            clienteNome: {
                type: String,
                // required: true
            },
            clienteContato: {
                type: String,
                // required: true
            },
        /*
            dia: {
                type: String,
                required: true
            },
            hora: {
                type: String,
                required: true
            },
            mes: {
                type: String,
                required: true
            },
            ano: {
                type: String,
                required: true
            },
         */
            servicosRequisitados: []

        },
        {
            timestamps: true
        })
);

module.exports = Schedule;
