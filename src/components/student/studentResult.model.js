/**
 * Model Definition File
 */

/**
 * System and 3rd Party libs
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * Schema Definition
 */

const studentResultSchema = new Schema(
  {
    studentId: { type: Schema.Types.String, required: true },
    subject: { type: Schema.Types.String, required: true },
    teacher: { type: Schema.Types.ObjectId, ref: 'teacher' },
    mark: { type: Schema.Types.Number, required: true },
  },
  { timestamps: true },
);

/**
 * Export Schema
 */
module.exports = mongoose.model('student-result', studentResultSchema);
