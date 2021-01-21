import mongoose from "mongoose";

const PatternSchema = new mongoose.Schema({
    id: Number,
    createdAts: [{
        type: Date,
        default: Date.now
    }],
    name: String,
    value: Number,
    related: [{
        id:Number,
        name: String,
        value: String,
        count: Number
    }],
    createdBy: String
});

const model = mongoose.model("Pattern", PatternSchema);

export default model;