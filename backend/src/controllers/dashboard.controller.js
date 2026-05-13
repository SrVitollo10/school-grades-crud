const Student = require('../models/student.model');
const Grade = require('../models/grade.model');

const getDashboardStats = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const totalGrades = await Grade.countDocuments();

        const grades = await Grade.find();

        let averageScore = 0;

        if (grades.length > 0) {
            const totalScore = grades.reduce((sum, grade) => sum + grade.score, 0);
            averageScore = totalScore / grades.length;
        }

        res.json({
            totalStudents,
            totalGrades,
            averageScore: Number(averageScore.toFixed(2))
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error obteniendo estadísticas',
            error: error.message
        });
    }
};

module.exports = {
    getDashboardStats
};