import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {StudentDetails} from "../models/studentDetails.models.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req, res) =>{
    //Handling JSON data
    let count = 0;
    for (const element of req.parsedData) {
        
        const {registrationNo, studentName, NSP, MOOC,I3,Assignment,Total} = element

        if(registrationNo === ""){
            throw new ApiError(400, "Registration ID is required")
        }
        if(studentName === ""){
            throw new ApiError(400, "Student Name is required")
        }
    
        const existingUser = await StudentDetails.findOne({
            $or: [{registrationNo},{studentName}]
        })
    
        if(existingUser) {
            existingUser.NSP = NSP;
            existingUser.MOOC = MOOC;
            existingUser.I3 = I3;
            existingUser.Assignment = Assignment;
            existingUser.Total = Total;
    
            await existingUser.save();
            
            //res.status(200).json({ message: "User data updated successfully" });
        } else {
            await StudentDetails.create({
                registrationNo: registrationNo.toLowerCase(), 
                studentName: studentName.toLowerCase(), 
                NSP, 
                MOOC,
                I3,
                Assignment,
                Total
            })
        }
        count++;
    }
    
    return res.status(201).json(
        new ApiResponse(200, `Details of ${count} Students Uploaded Succesfully!`)
    )
})

const fetchUserGrades = asyncHandler(async (req,res)=>{
    const {registrationNo, studentName} = req.body
    //console.log(req.body)

    if(registrationNo === ""){
        throw new ApiError(400, "Registration ID is required")
    }
    if(studentName === ""){
        throw new ApiError(400, "Student Name is required")
    }

    const existingUser = await StudentDetails.findOne({
        $and: [
            { "registrationNo": { $regex: new RegExp(registrationNo, "i") } },
            { "studentName": { $regex: new RegExp(studentName, "i") } }
        ]  
    })

    if(existingUser) {
        const userData = {
            id : existingUser.registrationNo,
            name : existingUser.studentName,
            nsp : existingUser.NSP,
            mooc : existingUser.MOOC,
            i3 : existingUser.I3,
            assign : existingUser.Assignment,
            total : existingUser.Total
        }
        res.status(200).json(
            new ApiResponse(200, "User details fetched succesfully.", userData)
        );
    } else {
            throw new ApiError(404, "User not found.")
    }
})

export {registerUser, fetchUserGrades}

// - Get User details according to user model from frontend (Postman can be used)
// - validation: check for not empty or for correct format
// - check if user already exists (using reg id or name)
// - check for user uploaded files
// - upload them to cloudinary
// - create user object - create entry in db
// - remove password and refresh token field from response
// - check for user creation
// - return response
