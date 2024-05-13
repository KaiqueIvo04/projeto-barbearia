import { Router } from 'express';

//Roteador
const serviceScheduleRoute = Router();

//Funções

import { createServiceSchedule, 
    getServiceSchedules, 
    getServiceScheduleById, 
    updateServiceSchedule, 
    deleteServiceSchedule } from '../../controllers/ServiceScheduleController/index';

//rotas 

serviceScheduleRoute.route('/')
    .get(getServiceSchedules) 
    .post(createServiceSchedule); 

serviceScheduleRoute.route('/:id')
    .get(getServiceScheduleById) 
    .patch(updateServiceSchedule) 
    .delete(deleteServiceSchedule) 

export default serviceScheduleRoute;