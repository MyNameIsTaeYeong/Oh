import mongoose from "mongoose";

const PatternSchema = new mongoose.Schema({
    // 패턴 이름
    name: String,
    // 패턴이 발생한 날들.
    theDayGoodOccurred: [{
        type: String
    }],
    theDayAvgOccurred: [{
        type: String
    }],
    theDayBadOccurred: [{
        type: String
    }],
    // 패턴과 연관된 패턴들  
    patternRelatedWithGood : [{
        type: Map,
        of: Number
    }],
    patternRelatedWithAvg : [{
        type: Map,
        of: Number
    }],
    patternRelatedWithBad : [{
        type: Map,
        of: Number
    }],
    createdBy: String
});

const model = mongoose.model("Pattern", PatternSchema);

export default model;