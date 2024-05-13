const Express = require('express');

//Roteador
const serviceScheduleRoute = Express.Router();

//Funções

const { createServiceSchedule, 
    getServiceSchedules, 
    getServiceScheduleById, 
    updateServiceSchedule, 
    deleteServiceSchedule } = require('../../controllers/ServiceScheduleController/index');

//rotas 

serviceScheduleRoute.route('/')
    .get(getServiceSchedules) 
    .post(createServiceSchedule); 

serviceScheduleRoute.route('/:id')
    .get(getServiceScheduleById) 
    .patch(updateServiceSchedule) 
    .delete(deleteServiceSchedule) 

module.exports = serviceScheduleRoute;