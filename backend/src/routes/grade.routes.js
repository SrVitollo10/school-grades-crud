const express = require('express');

const {
    createGrade,
    getGrades,
    getGradeById,
    updateGrade,
    deleteGrade
} = require('../controllers/grade.controller');

const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', authMiddleware, createGrade);
router.get('/', authMiddleware, getGrades);
router.get('/:id', authMiddleware, getGradeById);
router.put('/:id', authMiddleware, updateGrade);
router.delete('/:id', authMiddleware, deleteGrade);

module.exports = router;