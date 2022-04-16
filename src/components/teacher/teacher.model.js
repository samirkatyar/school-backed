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

const teacherSchema = new Schema(
  {
    name: { type: Schema.Types.String, required: true },
    reportingHod: { type: Schema.Types.ObjectId, ref: 'hod' },
    students: [{ type: Schema.Types.ObjectId, ref: 'student' }],
  },
  { timestamps: true },
);

/**
 * Export Schema
 */
module.exports = mongoose.model('teacher', teacherSchema);
