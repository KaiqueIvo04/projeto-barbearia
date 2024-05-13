require('dotenv').config(); //Iniciar configuração do .env
const Express = require('express');
const helmet = require('helmet');
const cors = require('cors');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocs = require('./swageer.json');

const adminRoute = require('./routes/AdminRoutes');
const authRoute = require('./routes/AuthRoutes');
const clientRoute = require('./routes/ClientRoutes');
const employeeRoute = require('./routes/EmployeeRoutes');
const scheduleRoute = require('./routes/ScheduleRoutes');
const serviceRoute = require('./routes/ServiceRoutes');
const serviceScheduleRoute = require('./routes/ServiceScheduleRoutes');
const workScheduleRoute = require('./routes/WorkScheduleRoutes');


const server = new Express(); //Objeto do server

//---------------Middlewares-------------
server.use(Express.json()); //Para o server entender json

// server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.use(helmet());   //Para medidas de segurança

if (process.env.NODE_ENV === 'development') {
    server.use(require('morgan')('dev')); //Utilizar morgan para feedback do server
}

//Permitir cors para o front
server.use(
    cors({
        credentials: true,
        origin: '*',
    }),
);

server.use((req, res, next) => {
    req.requestTime = new Date().toISOString(); //Para pegar a hora em que uma requisição foi feita
    next();
})

//Rotas para serem usadas
server.use('/api/v1/admins', adminRoute);
server.use('/api/v1/auth', authRoute);
server.use('/api/v1/clients', clientRoute);
server.use('/api/v1/employees', employeeRoute);
server.use('/api/v1/services', serviceRoute)
server.use('/api/v1/workschedules', workScheduleRoute)
server.use('/api/v1/schedules', scheduleRoute);
server.use('/api/v1/serviceschedules', serviceScheduleRoute);

module.exports = server;
