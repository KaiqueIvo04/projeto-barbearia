const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    responsible_employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: [true, "Funcionário responsável não definido"] //Necessário para criação inicial
    },
    day: {
        type: String, //Mudar para array de string
        required: [true, "Dia de trabalho não definido!"]
    },
    start_hour: {
        type: String,
        required: [true, "Hora de início de trabalho não definido!"]
    },
    finish_hour: {
        type: String,
        required: [true, "Hora de fim de trabalho não definido!"]
    },
    responsible_admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: [true, "Administrador responsável não definido"] //Necessário para criação inicial
    }
}, { timestamps: true });   //Adiciona 2 atributos (data que foi criado e data que foi atualizado)

module.exports = mongoose.model("WorkSchedule", Schema);