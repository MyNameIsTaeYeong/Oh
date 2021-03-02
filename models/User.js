import mongoose from "mongoose";

const memoOfTheDay = mongoose.Schema({
    memos: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Memo" 
    }
})

const patternOfTheDay = mongoose.Schema({
    // 해당 날짜의 패턴값들.
    patternsValue: [{
        type: String
    }]
})

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    avartarUrl:String,
    googleId: Number,
    naverId: Number,
    kakaoId: Number,
    
    // 날짜를 키값으로 메모 값을 기록
    memosMap:{
        type: Map,
        of: memoOfTheDay
    },

    // 날짜를 키값으로 패턴들의 값을 기록
    patternsMap:{
        type: Map,
        of: patternOfTheDay,
        default: { 
            "oh" : { patternsValue : [] }    
        }
    },

    // 전체 통계를 위한 패턴배열.
    patterns:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Pattern"
    }],
    
    toDos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"ToDo" 
    }]
});

const model = mongoose.model("User", UserSchema);

export default model;