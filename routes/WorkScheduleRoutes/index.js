const Express = require('express');
//Roteador
const workScheduleRoute = Express.Router();

//Funções

const { createWorkSchedule, 
    getWorkSchedules, 
    getWorkScheduleById, 
    updateWorkSchedule, 
    deleteWorkSchedule } = require('../../controllers/WorkScheduleController/index');

//rotas 

workScheduleRoute.route('/')
    .get(getWorkSchedules) 
    .post(createWorkSchedule); 

workScheduleRoute.route('/:id')
    .get(getWorkScheduleById) 
    .patch(updateWorkSchedule) 
    .delete(deleteWorkSchedule) 

module.exports = workScheduleRoute;