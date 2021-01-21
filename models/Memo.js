import mongoose from "mongoose";

const MemoSchema = new mongoose.Schema({
    // 생성된 날짜
    createdAt:{
        type: Date,
        default: Date.now
    },
    content:String,
    createdBy: String   
});

const model = mongoose.model("Memo", MemoSchema);

export default model;