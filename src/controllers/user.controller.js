
import asyncHandler from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js"
import {User} from "../models/user.models.js"
import uploadOnCloudinary, {uploaOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async(req,res) =>{
   //get user data from req.body
   //validation -not empty
    //check if user already exists
    //hash password
    //check for images ,check for avatar
    //upload images to cloudinary,avatar
    //create user object -create entry in database
    //remove password and refresh token field from response
    //check for user creation
    //return res
    const {username,email,fullName,password}=req.body;
    console.log("email",email);

  if(
    [fullName,email,username,password].some((field)
=> field?.trim() === "")
  ){``
    throw new ApiError(400,"All fields are required")

  }
  const existUser=User.findOne({
    $or: [{ username }, {email}]
  })

  if(existedUser){
    throw new ApiError(400,"User with email or username already exists")
  }

 const avatarLocalPath= req.files?.avatar[0]?.path
 const coverImageLocalPath = req.files?.coverImage[0]?.path;


 if(!avatarLocalPath){
  throw new ApiError(400,"Avatar file is required")
 }

  const avatar=await uploadOnCloudinary(avatarLocalPath)
  const coverImage=await uploaOnCloudinary(coverImageLocalPath)

  if(!avatar){
     throw new ApiError(400,"Avatar file is required")

  }

  const user = User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  })

 const createduser=await User.findById(user._id).select(
  "-password -refreshToken"
 )

 if(!createduser){
  throw new ApiError(500,"Something went wrong while registering the user")

 }

 return res.status(201).json(
  new ApiResponse(200,createduser, "User Registered Succesfully")
 )

})



export {registerUser}