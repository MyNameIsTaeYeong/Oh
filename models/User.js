import mongoose from "mongoose";

const memoOfTheDay = mongoose.Schema({
    memos: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Memo" 
    }
})

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    avartarUrl:String,
    googleId: Number,
    naverId: Number,
    kakaoId: Number,
    patterns:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Pattern"
    }],
   
    memosMap:{
        type: Map,
        of: memoOfTheDay
    },
    toDos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"ToDo" 
    }]
});

const model = mongoose.model("User", UserSchema);

export default model;