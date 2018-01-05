import { Schema } from 'mongoose';

export const userschema = new Schema({
  name: String,
  age: Number,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  admin: Boolean,
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

/**
 * On every save, add the date
 */
userschema.pre('save', function (next) {
  const currentDate = new Date();

  this.updated_at = currentDate;
  next();
});
// Duplicate the ID field.
userschema.virtual('userid').get(function () {
  return this._id.toString();
}).set(function (v) {
  this.__userid = v;
});;

// Ensure virtual fields are serialised.
userschema.set('toObject', {
  virtuals: true,
  versionKey: false
});

userschema.set('toJSON', {
  virtuals: true,
  versionKey: false
});

userschema.methods.serialize = function (user) {
  return {
    userid: user._id,
    name: user.name,
    age: user.age,
    username: user.username,
    password: user.password,
    email: user.email,
    admin: user.admin,
    created_at: user.created_at,
    updated_at: user.updated_at
  }
};
userschema.methods.serialised = function(user) {
  return {
    id: user._id,
    username: user.username,
    email: user.email
  }
};
export const UserSchema = userschema;
