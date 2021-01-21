import { defaults } from "autoprefixer";
import mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema({
    createdBy: String,
    content: String
});

const model = mongoose.model("ToDo", ToDoSchema);

export default model;