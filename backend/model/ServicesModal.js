const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Service = mongoose.model(
    "Servicos",
    new Schema({
        nomeServico: {
            type: String,
        },
        precoServico: {
            type: String,
        }
    },
        { timestamps: true }
    )
);

module.exports = Service;
