import { Router } from 'express';

//Roteador
const workScheduleRoute = Router();

//Funções

import { createWorkSchedule, 
    getWorkSchedules, 
    getWorkScheduleById, 
    updateWorkSchedule, 
    deleteWorkSchedule } from '../../controllers/WorkScheduleController/index';

//rotas 

workScheduleRoute.route('/')
    .get(getWorkSchedules) 
    .post(createWorkSchedule); 

workScheduleRoute.route('/:id')
    .get(getWorkScheduleById) 
    .patch(updateWorkSchedule) 
    .delete(deleteWorkSchedule) 

export default workScheduleRoute;