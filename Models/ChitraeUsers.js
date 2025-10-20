import mongoose from "mongoose";

const newusers = new mongoose.Schema({
    
    userID: {
    type: mongoose.Schema.Types.ObjectId, // auto-generated unique ID
    default: () => new mongoose.Types.ObjectId(),
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true, // removes extra spaces
  },
  userFirstName: {
    type: String,
    required: true,
    trim: true,
  },
  userLastName: {
    type: String,
    required: true,
    trim: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  userPassword: {
    type: String,
    required: true,
    minlength: 6,
  },
  userBio: {
    type: String,
    default: "",
    maxlength: 250,
  },
  userProfilePicture: {
    type: String, // store image URL (e.g., Cloudinary, S3, local uploads)
    default: "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg",
  },
  userFollowers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // references other users
    },
  ],
  userFollowing: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // references other users
    },
  ],
}, { timestamps: true }); // adds createdAt & updatedAt


export const chitraeUsers = mongoose.model("chitraeUsers", newusers);

