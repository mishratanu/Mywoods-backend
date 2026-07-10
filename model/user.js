const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },

    phone: {
      type: String,
      trim: true,
    },

    age: {
      type: Number,
      min: 0,
    },

    address: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) {
    return;
  }

  this.password = crypto
    .createHash("sha256")
    .update(this.password)
    .digest("hex");
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  const hashedPassword = crypto
    .createHash("sha256")
    .update(enteredPassword)
    .digest("hex");

  return this.password === hashedPassword;
};

module.exports = mongoose.model("User", userSchema);