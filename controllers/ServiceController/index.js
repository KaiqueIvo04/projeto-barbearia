const Service = require('../../models/Service');

const createService = async (req, res) => {
    const bodyData = req.body; //Pega o body da requisição

    try {
        const newService = await Service.create(bodyData); //Cria usando o model

        newService.save();

        return res.status(201).json({
            status: 'Success',
            reqTime: req.requestTime,
            message: 'Service created!'
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const getServices = async (req, res) => {
    try {
        const services = await Service.find(req.query).select('-password');
        return res.status(200).json({
            status: 'Success',
            req_time: req.requestTime,
            results: services.length,
            services
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const getServiceById = async (req, res) => {
    const serviceId = req.params.id
    try {
        const service = await Service.findById(serviceId).select('-password');
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            service
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const updateService = async (req, res) => {
    const bodyData = req.body;
    const serviceId = req.params.id;

    try {
        const updatedService = await Service.findByIdAndUpdate(serviceId, bodyData, { new: true, runValidators: true });
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            updatedService
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const deleteService = async (req, res) => {
    const serviceId = req.params.id;

    try {
        const deletedService = await Service.findByIdAndDelete(serviceId);
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            deletedService
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
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService
}