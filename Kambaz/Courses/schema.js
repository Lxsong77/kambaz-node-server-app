import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
   _id: String,
   name: String,
   number: String,
   credits: Number,
   description: String,
   startDate: Date,
   endDate: Date,
   department: String,
 },
 { collection: "courses" }
);
export default courseSchema;