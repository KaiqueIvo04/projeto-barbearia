const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = new mongoose.Schema({//Verificar pq o bcrypt não funciona para funcionários
    name: { //Nome
        type: String,
        required: [true, "Nome do funcionário não definido!"]    //Necessário para criação inicial
    },
    password: { //Senha
        type: String,
        required: [true, "Senha não definida!"] //Necessário para criação inicial
    },
    email: {    //Email
        type: String,
        required: [true, "E-mail do funcionário não definido!"] //Necessário para criação inicial
    },
    role: {
        type: String,
        required: [true, "Cargo do funcionário não definido!"] //Necessário para criação inicial
    },
    contact_personal: {   //Contato pessoal  
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "Disponível"
    },
    responsible_admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: [true, "Administrador responsável não definido"] //Necessário para criação inicial
    },
    userType: {
        type: String,
        default: "employee"
    }
}, { timestamps: true });   //Adiciona 2 atributos (data que foi criado e data que foi atualizado)

//Função necessária para verificação de senha no login
Schema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("Employee", Schema);