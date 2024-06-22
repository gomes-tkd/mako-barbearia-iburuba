const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Comment = mongoose.model(
    "Comentarios",
    new Schema({
            autorId: {
                type: String,
                // required: true
            },
            autorNome: {
                type: String,
                // required: true
            },
            comentario: {
                type: String,
                required: true
            },
        },
        {
            timestamps: true
        })
);

module.exports = Comment;
