require('dotenv').config;
const Admin = require('../../models/Admin');
const Employee = require('../../models/Employee');
const Client = require('../../models/Client');

const bcrypt = require('bcrypt');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION_TIME});


//Proteger verificando se o token é válido
const protect = async (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Você não está logado!'});
    }
    
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); //Cria a versão promisificada da função jwt.verify 
                                                                                //e a chama imediatamente com token e process.env.JWT_SECRET
    const freshUser = await Admin.findById(decoded.id) 
                ||    await Employee.findById(decoded.id) 
                ||    await Client.findById(decoded.id);

    if (!freshUser) {
        return res.status(401).json( { message: 'O token que pertence a este usuário não existe mais.'})
    }
        
    req.user = freshUser;
    next();
};

//Enviar um token
const sendToken = (user, statusCode, res) => {
    const token = signToken(user.id);
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRATION_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production')
        cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    res.status(statusCode).json({
        status: 'Success',
        token,
    });
};

const login = async (req, res, next) => {
    //Validações
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ message: 'Há informações faltantes!'});
    }

    const user = await Admin.findOne({ email }).select('+password')
              || await Employee.findOne({ email }).select('+password')
              || await Client.findOne({ email }).select('+password')
                

    if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(401).json({ message: 'E-mail ou senha incorretos!'})
    }
    sendToken(user, 200, res);
};

const register = async (req, res) => {
    const { name, email, password, confirmPassword, userType } = req.body;

    //Validações
    if (!name) {
        res.status(422).json({ message: 'O nome é obrigatório!' });
    }

    if (!email) {
        res.status(422).json({ message: 'O e-mail é obrigatório!' });
    }

    if (!password) {
        res.status(422).json({ message: 'A senha é obrigatória!' });
    }

    if (password !== confirmPassword) {
        res.status(422).json({ message: 'As senhas não conferem!' });
    }

    const userExists = await Admin.findOne({ email: email })
                    || await Employee.findOne({ email: email })
                    || await Client.findOne({ email: email });

    if (userExists) {
        return res.status(422).json({ message: 'E-mail já utilizado!' });
    }

    //Criar senha criptografada
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    let newUser
    //Criar novo usuáro
    if(userType === "admin") {
        newUser = await Admin.create({
            name,
            email,
            password: passwordHash
        });
    } else if (userType === "employee" && req.body.responsible_admin && req.body.role) {
        newUser = await Employee.create({
            name,
            email,
            password: passwordHash,
            role: req.body.role,
            responsible_admin: req.body.responsible_admin
        });
    } else if (userType === "client") {
        newUser = await Client.create({
            name,
            email,
            password: passwordHash
        });
    }

    //Enviar informações
    try {
        await newUser.save();

        return res.status(201).json({
            status: 'Success',
            reqTime: req.requestTime,
            message: 'User created!'
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        })
    }
}

module.exports = {
    getMe,
    protect,
    login,
    register
};