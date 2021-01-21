import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    avartarUrl:String,
    googleId: Number,
    naverId: Number,
    kakaoId: Number,
    patterns:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Pattern"
    },
    // 년 월 일 
    // 2021년 1월 21일의 첫번째 메모 => memos[0][0][20][0]
    // 2021년 1월 21일의 두번째 메모 => memos[0][0][20][1]
    memos:[[[[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Memo" 
    }]]]],
    toDos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"ToDo" 
    }]
});

const model = mongoose.model("User", UserSchema);

export default model;