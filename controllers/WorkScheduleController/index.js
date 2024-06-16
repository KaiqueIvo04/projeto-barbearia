const WorkSchedule = require('../../models/WorkSchedule');

const createWorkSchedule = async (req, res) => {
    const bodyData = req.body; //Pega o body da requisição

    try {
        const newWorkSchedule = await WorkSchedule.create(bodyData); //Cria usando o model

        newWorkSchedule.save();

        return res.status(201).json({
            status: 'Success',
            reqTime: req.requestTime,
            message: 'WorkSchedule created!'
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const getWorkSchedules = async (req, res) => {
    try {
        const workSchedules = await WorkSchedule.find(req.query).select('-password');
        return res.status(200).json({
            status: 'Success',
            req_time: req.requestTime,
            results: workSchedules.length,
            workSchedules
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const getWorkScheduleById = async (req, res) => {
    const workScheduleId = req.params.id
    try {
        const workSchedule = await WorkSchedule.findById(workScheduleId).select('-password');
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            workSchedule
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const updateWorkSchedule = async (req, res) => {
    const bodyData = req.body;
    const workScheduleId = req.params.id;

    try {
        const updatedWorkSchedule = await WorkSchedule.findByIdAndUpdate(workScheduleId, bodyData, { new: true, runValidators: true });
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            updatedWorkSchedule
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const deleteWorkSchedule = async (req, res) => {
    const workScheduleId = req.params.id;

    try {
        const deletedWorkSchedule = await WorkSchedule.findByIdAndDelete(workScheduleId);
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            deletedWorkSchedule
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
    createWorkSchedule,
    getWorkSchedules,
    getWorkScheduleById,
    updateWorkSchedule,
    deleteWorkSchedule
}