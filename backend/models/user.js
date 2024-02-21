const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    // validate: {
    //   validator: (value) => {
    //     const regex = /\w+@\w+.\w+/;
    //     return regex.test(value);
    //   },
    //   message: "Die E-Mail-Adresse ist ungültig.",
    // },
  },
  password: {
    type: String,
    required: true,
    // validate: {
    //   validator: (value) => {
    //     const regex =
    //       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // ^...$ start and end of the string, (?=.*[A-Za-z]) at least one letter, (?=.*\d) at least one number, (?=.*[@$!%*?&]) at least one special character, [A-Za-z\d@$!%*?&]{8,} 8 or more characters from the mentioned characters
    //     return regex.test(value);
    //   },
    //   message:
    //     "Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Buchstaben, eine Zahl und ein Sonderzeichen enthalten.",
    // },
  },
  salt: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
