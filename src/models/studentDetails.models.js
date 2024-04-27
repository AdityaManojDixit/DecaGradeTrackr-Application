import mongoose, { plugin } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const studentSchema = new mongoose.Schema({
    registrationNo: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    studentName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    NSP: {
        type: Number,
        required: true,
        min: 0,
        max: 20
    },
    MOOC: {
        type: Number,
        required: true,
        min: 0,
        max: 20
    },
    I3: {
        type: Number,
        required: true,
        min: 0,
        max: 20
    },
    Assignment: {
        type: Number,
        required: true,
        min: 0,
        max: 20
    },
    Total: {
        type: Number,
        required: true,
        min: 0,
        max: 80
    }
}, {timestamps: true}

);

studentSchema.plugin(mongooseAggregatePaginate)

export const StudentDetails = mongoose.model("StudentDetail", studentSchema);