import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    // 🔐 Auth fields
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
      match: [/^[0-9]{10}$/, "Please enter valid phone number"],
    },

    category: {
      type: String,
      enum: ["user", "agent", "admin"],
      default: "user",
    },

    // 🏠 Referral/Profile fields
    referralType: {
      type: String,
      required: true,
    },

    clientProfession: {
      type: String,
      required: true,
    },

    propertyType: {
      type: String,
      required: true,
    },

    amenities: [
      {
        type: String,
      },
    ],

    budgetRange: {
      type: String,
    },

    clientDetails: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// 🔐 Hash password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// 🔐 Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
