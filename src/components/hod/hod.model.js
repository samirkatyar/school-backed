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

const hodSchema = new Schema(
  {
    name: { type: Schema.Types.String, required: true },
    teachers: [{ type: Schema.Types.ObjectId, ref: 'teacher' }],
  },
  { timestamps: true },
);

/**
 * Export Schema
 */
module.exports = mongoose.model('hod', hodSchema);
