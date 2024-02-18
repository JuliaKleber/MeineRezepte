const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(value);
      },
      message: 'Das Passwort muss mindestens 8 Zeichen lang sein und mindestens eine Zahl enthalten.',
    },
  },
  salt: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', function (next) {
  const saltRounds = 10;
  this.salt = bcrypt.genSaltSync(saltRounds);
  this.password = bcrypt.hashSync(this.password, this.salt);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
