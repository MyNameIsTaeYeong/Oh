import mongoose from "mongoose";

const RelatedPatternSchema = new mongoose.Schema({
    /*  
        예) 연관된 패턴이 0번째일 경우 
        relatedPatterns[0]에서 
        0번째 패턴의 "good", "avg", "bad"가
        각각 몇번 발생했는지 기록.
    */
    relatedPatterns : [{
        type: Map,
        of: Number
    }]
});

const model = mongoose.model("RelatedPattern", RelatedPatternSchema);

export default model;