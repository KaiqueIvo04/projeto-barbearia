const ServiceSchedule = require('../../models/ServiceSchedule');

const createServiceSchedule = async (req, res) => {
    const bodyData = req.body; //Pega o body da requisição

    try {
        const newServiceSchedule = await ServiceSchedule.create(bodyData); //Cria usando o model

        newServiceSchedule.save();

        return res.status(201).json({
            status: 'Success',
            reqTime: req.requestTime,
            message: 'ServiceSchedule created!'
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const getServiceSchedules = async (req, res) => {
    try {
        const serviceSchedules = await ServiceSchedule.find(req.query).select('-password');
        return res.status(200).json({
            status: 'Success',
            req_time: req.requestTime,
            results: serviceSchedules.length,
            serviceSchedules
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const getServiceScheduleById = async (req, res) => {
    const serviceScheduleId = req.params.id
    try {
        const serviceSchedule = await ServiceSchedule.findById(serviceScheduleId).select('-password');
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            serviceSchedule
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const updateServiceSchedule = async (req, res) => {
    const bodyData = req.body;
    const serviceScheduleId = req.params.id;

    try {
        const updatedServiceSchedule = await ServiceSchedule.findByIdAndUpdate(serviceScheduleId, bodyData, { new: true, runValidators: true });
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            updatedServiceSchedule
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const deleteServiceSchedule = async (req, res) => {
    const serviceScheduleId = req.params.id;

    try {
        const deletedServiceSchedule = await ServiceSchedule.findByIdAndDelete(serviceScheduleId);
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            deletedServiceSchedule
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
    createServiceSchedule,
    getServiceSchedules,
    getServiceScheduleById,
    updateServiceSchedule,
    deleteServiceSchedule
}