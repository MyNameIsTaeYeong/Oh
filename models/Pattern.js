import mongoose from "mongoose";

const PatternSchema = new mongoose.Schema({
    // 패턴 이름
    name: String,
    // 패턴 생성자
    createdBy: String,
    /* 
        패턴의 값에 따라 
        [0] : "good"일 때
        [1] : "avg"일 때
        [2] : "bad"일 때
        연관된 패턴들 
    */
    patternsAssociatedWithValues : [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "RelatedPattern"
    }],

    /*
        날짜와 패턴의 값을 저장.
        예) 20210303에 "good", 20210304에 "bad"가 발생했다면
        {
            "20210303" : "good",
            "20210304" : "bad"
        } 
    */
    theDayValueOccurred : {
        type: Map,
        of: String,
        default: {
            "oh" : "TaeYeong is handsome"
        }
    }
});

const model = mongoose.model("Pattern", PatternSchema);

export default model;