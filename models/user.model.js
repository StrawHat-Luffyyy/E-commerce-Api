import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please Provide a email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please Provide a password"],
      minlenght: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// hash Password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


export default mongoose.model("User", userSchema);