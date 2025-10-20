import mongoose from "mongoose";

const newtweet = new mongoose.Schema({
    TweetId : Number,
    TweetContent : String,
    PostedOn : Date,
    ImageLink : String,
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "chitraeUsers" },
    likes: [{type: String}] //this will be an array of the user IDs who liked the post.
});

export const tweetData = mongoose.model("tweetData", newtweet);

