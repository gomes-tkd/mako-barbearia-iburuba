const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Schedule = mongoose.model(
    "Agendamento",
    new Schema({
            clienteId: {
                type: Schema.Types.ObjectId,
                ref: "Usuarios",
                required: true
            },
            clienteNome: {
                type: String,
                required: true
            },
            clienteContato: {
                type: String,
                required: true
            },
            servicosRequisitados: [{
                type: Schema.Types.ObjectId,
                ref: "Servicos"
            }]
        },
        {
            timestamps: true
        })
);


module.exports = Schedule;
