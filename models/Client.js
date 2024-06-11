const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = new mongoose.Schema({
    name: { //Nome
        type: String,
        required: [true, "Nome do cliente não definido!"]    //Necessário para criação inicial
    },
    password: { //Senha
        type: String,
        required: [true, "Senha do cliente não definida!"] //Necessário para criação inicial
    },
    email: {    //Email
        type: String,
        required: [true, "E-mail do cliente não definido!"] //Necessário para criação inicial
    },
    contact_personal: {   //Contato pessoal  
        type: String,
        default: ""
    },
    userType: {
        type: String,
        default: "client"
    }
}, { timestamps: true });   //Adiciona 2 atributos (data que foi criado e data que foi atualizado)

//Função necessária para verificação de senha no login
Schema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("Client", Schema);