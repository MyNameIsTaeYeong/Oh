import mongoose from "mongoose";

const MemoSchema = new mongoose.Schema({
    content:[String],
    createdBy: String   
});

const model = mongoose.model("Memo", MemoSchema);

export default model;