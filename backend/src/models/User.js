const mongoose = require("mongoose");
const { lowercase } = require("zod");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: string,
      default: "",
    },
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
      },
    ],
    clerkId: {
      type: string,
    },
  },
  { timestamps: true }
);

module.export = mongoose.model("User", userSchema);
