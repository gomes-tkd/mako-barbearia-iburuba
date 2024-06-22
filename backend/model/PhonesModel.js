const mongoose = require('mongoose');

const PhonesSchema = new mongoose.Schema({
    clienteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contato: {
        type: String,
        required: true
    }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Phones', PhonesSchema);
