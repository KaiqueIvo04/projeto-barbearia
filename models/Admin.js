const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: { //Nome
        type: String,
        required: [true, "Nome do administrador não definido!"]    //Necessário para criação inicial
    },
    password: { //Senha
        type: String,
        required: [true, "Senha não definida!"] //Necessário para criação inicial
    },
    email: {    //Email
        type: String,
        required: [true, "E-mail do administrador não definido!"] //Necessário para criação inicial
    },
    contact_personal: {   //Contato pessoal  
        type: String,
        default: ""
    }
}, { timestamps: true });   //Adiciona 2 atributos (data que foi criado e data que foi atualizado)

//Função necessária para verificação de senha no login
Schema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("Admin", Schema);