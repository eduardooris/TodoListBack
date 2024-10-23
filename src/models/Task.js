const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  isn_usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
  dsc_annex: { type: String },
  date: { type: Date, default: Date.now },
});

const TaskSchema = new mongoose.Schema({
  isn_usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  comments: [CommentSchema],
});

module.exports = mongoose.model("Task", TaskSchema);
