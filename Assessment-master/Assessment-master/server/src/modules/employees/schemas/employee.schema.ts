import { Schema } from 'mongoose';

export const employeeschema = new Schema({
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    department: { type: String, required: true },
    doj: { type: Date, required: true },
    gender: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

/**
 * On every save, add the date
 */
employeeschema.pre('save', function (next) {
  const currentDate = new Date();

  this.updated_at = currentDate;
  next();
});
// Duplicate the ID field.
employeeschema.virtual('employeeid').get(function () {
  return this._id.toString();
}).set(function (v) {
    this.__employeeid = v;
});;

// Ensure virtual fields are serialised.
employeeschema.set('toObject', {
  virtuals: true,
  versionKey: false
});

employeeschema.set('toJSON', {
  virtuals: true,
  versionKey: false
});

employeeschema.methods.serialize = function (employee) {
  return {
      employeeid: employee._id,
      name: employee.name,
      dob: employee.dob,
      department: employee.department,
      doj: employee.doj,
      gender: employee.gender,
      created_at: employee.created_at,
      updated_at: employee.updated_at
  }
};

export const EmployeeSchema = employeeschema;
