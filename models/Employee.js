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
    responsible_admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: [true, "Administrador responsável não definido"] //Necessário para criação inicial
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