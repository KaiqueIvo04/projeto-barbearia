import { Router } from 'express';

//Roteador
const scheduleRoute = Router();

//Funções

import { createSchedule, 
    getSchedules, 
    getScheduleById, 
    updateSchedule, 
    deleteSchedule } from '../../controllers/ScheduleController/index';

//rotas 

scheduleRoute.route('/')
    .get(getSchedules) 
    .post(createSchedule); 

scheduleRoute.route('/:id')
    .get(getScheduleById) 
    .patch(updateSchedule) 
    .delete(deleteSchedule) 

export default scheduleRoute;