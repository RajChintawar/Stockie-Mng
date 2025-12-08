const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AuthUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// hash password before save
AuthUserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

module.exports = (conn) => conn.model("AuthUser", AuthUserSchema);
