const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Earn = mongoose.model(
    "Ganhos",
    new Schema({
      tipoServico: {
          type: String,
          required: true
      },
      valorServico: {
          type: Number,
          required: true
      }
    })
);

module.exports = Earn;

