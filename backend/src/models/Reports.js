const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  summary: String,
  keyFindings: [String],
  rawData: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fileName: {
      type: String,
    },
    fileUrl: {
      type: String,
    },
    extractedText: String,
    results: resultSchema,
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
