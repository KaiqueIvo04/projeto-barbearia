const Employee = require('../../models/Employee');

const createEmployee = async (req, res) => {
    const bodyData = req.body; //Pega o body da requisição

    try {
        const newEmployee = await Employee.create(bodyData); //Cria usando o model

        newEmployee.save();

        return res.status(201).json({
            status: 'Success',
            reqTime: req.requestTime,
            message: 'Employee created!'
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find(req.query).select('-password');
        return res.status(200).json({
            status: 'Success',
            req_time: req.requestTime,
            results: employees.length,
            employees
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const getEmployeeById = async (req, res, next) => {
    const employeeId = req.params.id
    try {
        const employee = await Employee.findById(employeeId).select('-password');
        if (employee) {
            return res.status(200).json({
                status: 'Success',
                reqTime: req.requestTime,
                employee
            });
        }
        next(); //necessário para verificar o tipo de usuário a ser retornado na rota /me
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const updateEmployee = async (req, res) => {
    const bodyData = req.body;
    const employeeId = req.params.id;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, bodyData, { new: true, runValidators: true });
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            updatedEmployee
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const deleteEmployee = async (req, res) => {
    const employeeId = req.params.id;

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            deletedEmployee
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
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
}