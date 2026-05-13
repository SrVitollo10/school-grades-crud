const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true
        },

        subject: {
            type: String,
            required: true,
            trim: true
        },

        score: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },

        period: {
            type: String,
            required: true,
            trim: true
        },

        teacher: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Grade', gradeSchema);