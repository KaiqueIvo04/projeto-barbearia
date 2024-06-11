const Admin = require('../../models/Admin');

const createAdmin = async (req, res) => {
    const bodyData = req.body; //Pega o body da requisição

    try {
        const newAdmin = await Admin.create(bodyData); //Cria usando o model

        newAdmin.save();

        return res.status(201).json({
            status: 'Success',
            reqTime: req.requestTime,
            message: 'Admin created!'
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find(req.query).select('-password');
        return res.status(200).json({
            status: 'Success',
            req_time: req.requestTime,
            results: admins.length,
            admins
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const getAdminById = async (req, res, next) => {
    const adminId = req.params.id
    try {
        const admin = await Admin.findById(adminId).select('-password');

        if (admin) {
            console.log(admin)
            return res.status(200).json({
                status: 'Success',
                reqTime: req.requestTime,
                admin
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

const updateAdmin = async (req, res) => {
    const bodyData = req.body;
    const adminId = req.params.id;

    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(adminId, bodyData, { new: true, runValidators: true });
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            updatedAdmin
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const deleteAdmin = async (req, res) => {
    const adminId = req.params.id;

    try {
        const deletedAdmin = await Admin.findByIdAndDelete(adminId);
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            deletedAdmin
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
    createAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin
}