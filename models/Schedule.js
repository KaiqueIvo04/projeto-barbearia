const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    responsible_employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: [true, "Funcionário responsável não definido"] //Necessário para criação inicial
    },
    responsible_client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: [true, "Cliente responsável não definido!"] //Necessário para criação inicial
    },
    date_schedule: {
        type: Date,
        required: [true, "Data do agendamento não definido!"] //Necessário para criação inicial
    },
    status: {
        type: String,
        default: "Solicitada"
    },
    responsible_admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: [true, "Administrador responsável não definido"] //Necessário para criação inicial
    }
}, { timestamps: true });   //Adiciona 2 atributos (data que foi criado e data que foi atualizado)

module.exports = mongoose.model("Schedule", Schema);