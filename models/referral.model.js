import mongoose from "mongoose";

const referralSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
    },

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

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Referral = mongoose.model("Referral", referralSchema);

export default Referral;
