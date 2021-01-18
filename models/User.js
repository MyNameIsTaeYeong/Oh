import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    avartarUrl:String,
    googleId: Number,
    naverId: Number,
    kakaoId: Number
});

const model = mongoose.model("User", UserSchema);

export default model;