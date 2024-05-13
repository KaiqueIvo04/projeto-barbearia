const Client = require('../../models/Client');

const createClient = async (req, res) => {
    const bodyData = req.body; //Pega o body da requisição

    try {
        const newClient = await Client.create(bodyData); //Cria usando o model

        newclient.save();

        return res.status(201).json({
            status: 'Success',
            reqTime: req.requestTime,
            message: 'Client created!'
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const getClients = async (req, res) => {
    try {
        const clients = await Client.find(req.query).select('-password');
        return res.status(200).json({
            status: 'Success',
            req_time: req.requestTime,
            results: clients.length,
            clients
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const getClientById = async (req, res) => {
    const clientId = req.params.id
    try {
        const client = await Client.findById(clientId).select('-password');
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            client
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const updateClient = async (req, res) => {
    const bodyData = req.body;
    const clientId = req.params.id;

    try {
        const updatedClient = await Client.findByIdAndUpdate(clientId, bodyData, { new: true, runValidators: true });
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            updatedClient
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const deleteClient = async (req, res) => {
    const clientId = req.params.id;

    try {
        const deletedClient = await Client.findByIdAndDelete(clientId);
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            deletedClient
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

module.exports = {
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient
}