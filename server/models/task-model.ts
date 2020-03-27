import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  text: String,
  owner: { type: String, required: true },
  status: { type: String, required: true },
  created: { type: String, required: true },
  updated: { type: String, required: true },
  isDone: { type: String, required: true },
})

export default mongoose.model("task", taskSchema);
