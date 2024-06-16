const Schedule = require('../../models/Schedule');

const createSchedule = async (req, res) => {
    const bodyData = req.body; //Pega o body da requisição

    try {
        const newSchedule = await Schedule.create(bodyData); //Cria usando o model

        newSchedule.save();

        return res.status(201).json({
            status: 'Success',
            reqTime: req.requestTime,
            message: 'Schedule created!',
            schedule: newSchedule
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const getSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find(req.query).select('-password');
        return res.status(200).json({
            status: 'Success',
            req_time: req.requestTime,
            results: schedules.length,
            schedules
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const getScheduleById = async (req, res) => {
    const scheduleId = req.params.id
    try {
        const schedule = await Schedule.findById(scheduleId).select('-password');
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            schedule
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const updateSchedule = async (req, res) => {
    const bodyData = req.body;
    const scheduleId = req.params.id;

    try {
        const updatedSchedule = await Schedule.findByIdAndUpdate(scheduleId, bodyData, { new: true, runValidators: true });
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            updatedSchedule
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const deleteSchedule = async (req, res) => {
    const scheduleId = req.params.id;

    try {
        const deletedSchedule = await Schedule.findByIdAndDelete(scheduleId);
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            deletedSchedule
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
    createSchedule,
    getSchedules,
    getScheduleById,
    updateSchedule,
    deleteSchedule
}