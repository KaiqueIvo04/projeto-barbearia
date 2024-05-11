const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    related_service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: [true, "Serviço relacionado não definido"] //Necessário para criação inicial
    },
    related_schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule',
        required: [true, "Agendamento relacionado não definido"] //Necessário para criação inicial
    },
    responsible_admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: [true, "Administrador responsável não definido"] //Necessário para criação inicial
    }
}, { timestamps: true });   //Adiciona 2 atributos (data que foi criado e data que foi atualizado)

module.exports = mongoose.model("ServiceSchedule", Schema);