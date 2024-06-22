const mongoose = require("../db/conn");
const { Schema } = mongoose;

const User = mongoose.model(
    "Usuarios",
    new Schema({
            nome: {
                type: String,
                required: true
            },
            contato: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            senha: {
                type: String,
                required: true
            },
            comentarios: [],
        },
        {
            timestamps: true
        })
);

module.exports = User;
