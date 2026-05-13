const Grade = require('../models/grade.model');
const Student = require('../models/student.model');

const createGrade = async (req, res) => {
    try {
        const { student, subject, score, period, teacher } = req.body;

        if (!student || !subject || score === undefined || !period || !teacher) {
            return res.status(400).json({
                message: 'Todos los campos son obligatorios'
            });
        }

        const studentExists = await Student.findById(student);

        if (!studentExists) {
            return res.status(404).json({
                message: 'El estudiante no existe'
            });
        }

        const grade = await Grade.create({
            student,
            subject,
            score,
            period,
            teacher
        });

        const populatedGrade = await Grade.findById(grade._id).populate(
            'student',
            'name lastName gradeLevel group'
        );

        res.status(201).json({
            message: 'Nota creada correctamente',
            grade: populatedGrade
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error creando nota',
            error: error.message
        });
    }
};

const getGrades = async (req, res) => {
    try {
        const grades = await Grade.find()
            .populate('student', 'name lastName gradeLevel group')
            .sort({ createdAt: -1 });

        res.json(grades);

    } catch (error) {
        res.status(500).json({
            message: 'Error obteniendo notas',
            error: error.message
        });
    }
};

const getGradeById = async (req, res) => {
    try {
        const { id } = req.params;

        const grade = await Grade.findById(id)
            .populate('student', 'name lastName gradeLevel group');

        if (!grade) {
            return res.status(404).json({
                message: 'Nota no encontrada'
            });
        }

        res.json(grade);

    } catch (error) {
        res.status(500).json({
            message: 'Error obteniendo nota',
            error: error.message
        });
    }
};

const updateGrade = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.body.student) {
            const studentExists = await Student.findById(req.body.student);

            if (!studentExists) {
                return res.status(404).json({
                    message: 'El estudiante no existe'
                });
            }
        }

        const grade = await Grade.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate('student', 'name lastName gradeLevel group');

        if (!grade) {
            return res.status(404).json({
                message: 'Nota no encontrada'
            });
        }

        res.json({
            message: 'Nota actualizada correctamente',
            grade
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error actualizando nota',
            error: error.message
        });
    }
};

const deleteGrade = async (req, res) => {
    try {
        const { id } = req.params;

        const grade = await Grade.findByIdAndDelete(id);

        if (!grade) {
            return res.status(404).json({
                message: 'Nota no encontrada'
            });
        }

        res.json({
            message: 'Nota eliminada correctamente'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error eliminando nota',
            error: error.message
        });
    }
};

module.exports = {
    createGrade,
    getGrades,
    getGradeById,
    updateGrade,
    deleteGrade
};