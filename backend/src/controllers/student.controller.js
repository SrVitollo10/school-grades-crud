const Student = require('../models/student.model');

const createStudent = async (req, res) => {
    try {
        const { name, lastName, age, gradeLevel, group } = req.body;

        if (!name || !lastName || !age || !gradeLevel || !group) {
            return res.status(400).json({
                message: 'Todos los campos son obligatorios'
            });
        }

        const student = await Student.create({
            name,
            lastName,
            age,
            gradeLevel,
            group
        });

        res.status(201).json({
            message: 'Estudiante creado correctamente',
            student
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error creando estudiante',
            error: error.message
        });
    }
};

const getStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });

        res.json(students);

    } catch (error) {
        res.status(500).json({
            message: 'Error obteniendo estudiantes',
            error: error.message
        });
    }
};

const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({
                message: 'Estudiante no encontrado'
            });
        }

        res.json(student);

    } catch (error) {
        res.status(500).json({
            message: 'Error obteniendo estudiante',
            error: error.message
        });
    }
};

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: 'Estudiante no encontrado'
            });
        }

        res.json({
            message: 'Estudiante actualizado correctamente',
            student
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error actualizando estudiante',
            error: error.message
        });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findByIdAndDelete(id);

        if (!student) {
            return res.status(404).json({
                message: 'Estudiante no encontrado'
            });
        }

        res.json({
            message: 'Estudiante eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error eliminando estudiante',
            error: error.message
        });
    }
};

module.exports = {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};