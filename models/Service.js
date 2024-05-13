const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name_service: { //Nome
        type: String,
        required: [true, "Nome do serviço não definido!"]    //Necessário para criação inicial
    },
    description: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: [true, "Preço do serviço não definido!"] //Necessário para criação inicial
    },
    estimated_duration: {
        type: Number,
        required: [true, "Duração estimada do serviço não definida!"] //Necessário para criação inicial
    },
    responsible_admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: [true, "Administrador responsável não definido"] //Necessário para criação inicial
    }
}, { timestamps: true });   //Adiciona 2 atributos (data que foi criado e data que foi atualizado)

module.exports = mongoose.model("Service", Schema);