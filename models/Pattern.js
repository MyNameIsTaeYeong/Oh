import mongoose from "mongoose";

const PatternSchema = new mongoose.Schema({
    name: String,
    // 패턴이 발생한 날들.
    createdAts: [{
        type: String
    }],
    relatedPattern : [{
            type: Map,
            of: Number
    }],
    createdBy: String
});

const model = mongoose.model("Pattern", PatternSchema);

export default model;