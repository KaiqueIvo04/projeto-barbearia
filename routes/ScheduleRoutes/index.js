const Express = require('express');
//Roteador
const scheduleRoute = Express.Router();

//Funções

const { createSchedule, 
    getSchedules, 
    getScheduleById, 
    updateSchedule, 
    deleteSchedule } = require('../../controllers/ScheduleController/index');

//rotas 

scheduleRoute.route('/')
    .get(getSchedules) 
    .post(createSchedule); 

scheduleRoute.route('/:id')
    .get(getScheduleById) 
    .patch(updateSchedule) 
    .delete(deleteSchedule) 

module.exports = scheduleRoute;