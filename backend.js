import express, { raw } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs, { link } from "fs"
import fetch from "node-fetch";
import path from "path";
import { json } from "express";
import { upload } from "./upload.js";
import { Dropbox } from "dropbox";
import {tweetData} from "./Models/TweetsSchema.js"
import { chitraeUsers } from "./Models/ChitraeUsers.js";
import dotenv from "dotenv";
import { sign } from "crypto";
import { auth } from "googleapis/build/src/apis/abusiveexperiencereport/index.js";
import { log } from "console";
dotenv.config();


//We used MongoDB to connect with our database using the connection string.
// let connectiontoDB = await mongoose.connect("mongodb://localhost:27017/Twitter");
let connectiontoDB = await mongoose.connect(process.env.MONGODB_URI);

//Here we accessed our database with the schema we created.
let TweetData = mongoose.model('tweetData')


const app = express()
const port = process.env.PORT || 3000;

// ==================== DROPBOX TOKEN REFRESH HELPER ====================
async function getDropboxAccessToken() {
  let {
    DROPBOX_ACCESS_TOKEN,
    DROPBOX_REFRESH_TOKEN,
    DROPBOX_APP_KEY,
    DROPBOX_APP_SECRET,
  } = process.env;

  console.log({
    DROPBOX_ACCESS_TOKEN,
    DROPBOX_REFRESH_TOKEN,
    DROPBOX_APP_KEY,
    DROPBOX_APP_SECRET,
  });
  
  // Refresh the token every time before using Dropbox
  const response = await fetch("https://api.dropbox.com/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: DROPBOX_REFRESH_TOKEN,
      client_id: DROPBOX_APP_KEY,
      client_secret: DROPBOX_APP_SECRET,
    }),
  });

  const data = await response.json();

  if (data.access_token) {
    // Update .env and process.env for runtime
    let envFile = fs.readFileSync("./DROPBOX_ACCESS_TOKEN.env", "utf8");
    envFile = envFile.replace(
      /DROPBOX_ACCESS_TOKEN=.*/g,
      `DROPBOX_ACCESS_TOKEN=${data.access_token}`
    );
    fs.writeFileSync("./DROPBOX_ACCESS_TOKEN.env", envFile);

    process.env.DROPBOX_ACCESS_TOKEN = data.access_token;

    return data.access_token;
  } else {
    console.error("❌ Dropbox token refresh failed:", data);
    throw new Error("Dropbox token refresh failed");
  }
}




//We're using express.static to serve the frontend directly from our backend instead of running it seperately.
app.use(express.static('Frontend'))

//We're using this express.json which is a middleware which parses all the incoming json data.
app.use(express.json());



// const DROPBOX_ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TOKEN;
const JWT_SECRET = process.env.JWT_SECRET_KEY;

//This is our default backend endpoint.
app.post('/api/verifytoken', (req, res) => {
  const authHeader = req.headers.authorization;

  
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({success: false, message: "No token found!"})
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({success: true, user: decoded})
    
  } catch (error) {
    res.status(403).json({success: false, message: "Invalid Token!", error})
  }

})


app.post('/api/usersignup', async(req, res) =>{
  let signupdetails = req.body;
  console.log(signupdetails);

  const plaintextpassword = signupdetails.userPassword;
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(plaintextpassword, saltRounds);
    signupdetails.userPassword = hashedPassword;
    console.log("hashed Password:", hashedPassword);

    const newUser = new chitraeUsers(signupdetails);
    newUser.save();
    res.json({success: true});

  } catch (error) {
    console.error("Error in hashing the password:", error);
    res.json({success: false});
  }

})

app.post('/api/userlogin', async(req, res) =>{
  let userlogindetails = req.body;

  
  const plaintextpassword = userlogindetails.userPassword;
  try {
    const userdata = await chitraeUsers.findOne({userEmail: userlogindetails.userEmail});
    if (!userdata) {
      return res.status(404).json({success: false, message: "user not found!"})
    }

    const passMatch = await bcrypt.compare(plaintextpassword, userdata.userPassword)
    if (!passMatch) {
      return res.status(401).json({success: false, message: "Invalid Password!!"})
    }

    const token = jwt.sign(
      {userId: userdata.userID, userEmail: userdata.userEmail, userName: userdata.userName, userFirstName: userdata.userFirstName, userLastName: userdata.userLastName, avatar: userdata.userProfilePicture},
      JWT_SECRET,
      {expiresIn: "7d"} //token valid for 7 days.
    )

    res.json({success: true, message: "login successful", token, userId: userdata.userID, userFirstName: userdata.userFirstName, userLastName: userdata.userLastName, userName: userdata.userName, avatar: userdata.userProfilePicture});

  } catch (error) {
    console.error("Error verifying the login details:", error);
    res.json({success: false});
  }

})


//This is our custom endpoint. When we click on post button the eventlistener will make a call to this api and it will save the tweet to our backed.
app.post('/api/posttweet', async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  
  const decoded = jwt.verify(token, JWT_SECRET);
  
  const userID = decoded.userId

  

  let rawData = req.body; 
  rawData.userID = userID;

  
  const tweet = new tweetData(rawData);
  
  tweet.save();


  res.json({ success: true });

})

//This an endpoint used to upload image to Dropbox and getting the shareable link to save in db.
app.post('/api/uploadimage', upload.single("image"), async (req, res) => {
  if (req.file) {
    console.log("received on backend");
    
  }

  const fileBuffer = req.file.buffer;
  const fileName = req.file.originalname;

   // 🔁 Get a valid access token (auto refresh if needed)
    const DROPBOX_ACCESS_TOKEN = await getDropboxAccessToken();

  //Step 1 - upload the file to dropbox
  const uploadRes = await fetch("https://content.dropboxapi.com/2/files/upload", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${DROPBOX_ACCESS_TOKEN}`,
      "Dropbox-API-Arg": JSON.stringify({
        path: `/uploads/${fileName}`,
        mode: "add",
        autorename: true,
        mute: false
      }),
      "Content-Type": "application/octet-stream"
    },
    body: fileBuffer
  });

  const uploadedFile = await uploadRes.json();
console.log(uploadedFile);


  //Step 2 - Create shareable link
  const linkRes = await fetch("https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${DROPBOX_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({path: uploadedFile.path_lower})
  });

  let linkData = await linkRes.json();
  console.log(linkData);
  
  let shareableURL = linkData.url.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("dl=0", "");

  res.json({imageURL: shareableURL});
  console.log(shareableURL);
})



//This is our another endpoint. This is used to retrieve the latest TweetId. The frontend function requests our backend to get the latest tweet id stored in the database to which the backend checkes the database and provides the latest tweetid then the frontend updates the latest tweet id whenever a new tweet is posted.
app.get('/api/latestId', async(req, res) =>{
  let latestDoc = await tweetData.findOne().sort({TweetId: -1}).limit(1).select('TweetId');
  if (latestDoc == null) {
    let latestId = 0;
      res.json(latestId);
  } else {
    let latestId = latestDoc.TweetId;
    res.json(latestId);
  }

})


//This is another endpoint to get all the tweets back from our db and send it to our frontend to render it on the page.
app.get('/api/gallery', async(req, res) => {
  // let allTweets = await tweetData.find({}).populate("userID", "userName userFirstName userLastName userProfilePicture userID").sort({TweetId: -1}).select('TweetContent PostedOn ImageLink userID');
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.verify(token, JWT_SECRET);
  const currentUserID = decoded.userId; //got the ID of the current logged in user.

  const CurrentUser = await chitraeUsers.findOne({userID: currentUserID}).select("userID userFollowing");

  

  //This fetches all gallery posts from the database.
  let allGalleryPosts = await tweetData.find({userID: [CurrentUser.userID, ...CurrentUser.userFollowing]}).sort({TweetId: -1});
  // .select("TweetContent PostedOn ImageLink userID");

  //now we'll fetch the related users of all posts.
  let userIDs = [...new Set(allGalleryPosts.map(t => t.userID))];
  let users = await chitraeUsers.find({userID: {$in: userIDs}}).select("userID userName userFirstName userLastName userProfilePicture");

  //now we'll build a lookup to get each post with its user
  const userMap = {};
  users.forEach(element => userMap[element.userID] = element);

  const fullData = allGalleryPosts.map(post => ({
    ...post.toObject(),
    userDetails: userMap[post.userID] || null
  }));
  
  res.json(fullData);
})

app.get('/api/spotlight', async(req, res) =>{

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.verify(token, JWT_SECRET);
  const currentUserID = decoded.userId; //got the ID of the current logged in user.

  const CurrentUser = await chitraeUsers.findOne({userID: currentUserID}).select("userID userFollowing");

  

  //This fetches all spotlight posts from the database. from users current logged in user don't follow.
  let allSpotlightPosts = await tweetData.find({userID: { $nin: [CurrentUser.userID, ...CurrentUser.userFollowing]}}).sort({TweetId: -1});
  // .select("TweetContent PostedOn ImageLink userID");

  //now we'll fetch the related users of all posts.
  let userIDs = [...new Set(allSpotlightPosts.map(t => t.userID))];
  let users = await chitraeUsers.find({userID: {$in: userIDs}}).select("userID userName userFirstName userLastName userProfilePicture");

  //now we'll build a lookup to get each post with its user
  const userMap = {};
  users.forEach(element => userMap[element.userID] = element);

  const fullData = allSpotlightPosts.map(post => ({
    ...post.toObject(),
    userDetails: userMap[post.userID] || null
  }));
  
  res.json(fullData);
})

app.post('/api/getProfile', async (req, res) => {
    const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  
  const decoded = jwt.verify(token, JWT_SECRET);
  
  const userID = decoded.userId

  let allProfilePosts = await tweetData.find({userID: userID}).sort({TweetId: -1}).select('TweetContent PostedOn ImageLink userID');
  let userdetails = await chitraeUsers.find({userID: userID}).select("userName userFirstName userLastName userBio userProfilePicture userFollowing userFollowers");

  
  
  res.json({profile: userdetails, posts: allProfilePosts});
})


//We're getting the list of all the discoverable users - execpt the logged in profile and the profile we already follow.
app.get('/api/discover', async (req, res) => {
const authHeader = req.headers.authorization;
const token = authHeader && authHeader.split(" ")[1];
const decoded = jwt.verify(token, JWT_SECRET);
const currentUserID = decoded.userId; //got the ID of the current logged in user.

//now we'll get the current user and its following list.
const currentUser = await chitraeUsers.findOne({userID: currentUserID}).select("userFollowing");

//now we'll exclude the current user and already in following.
const excludeUser = [currentUserID];  //if wanna exclude already followed users use - ...currentUser.userFollowing

//now we'll get all the users except the excluded users.
const users = await chitraeUsers.find({userID: {$nin: excludeUser}}).select("userID userName userFirstName userLastName userProfilePicture")
  
const result = users.map(allusers => ({
  ...allusers.toObject(),
  isFollowing: currentUser.userFollowing.includes(allusers.userID)
}));

res.json(result);
console.log(result);
  
})

app.put('/api/follow/:id', async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.verify(token, JWT_SECRET);
  const currentUserID = decoded.userId; //got the ID of the current logged in user.

  const targetUserId = req.params.id;

  //now we'll add the user to our following list
  await chitraeUsers.updateOne({userID: currentUserID}, {$addToSet: {userFollowing: targetUserId}});

  //we'll also add our user id to the other person's profile.
  await chitraeUsers.updateOne({userID: targetUserId}, {$addToSet: {userFollowers: currentUserID}});

  res.json({success: true, message: "User Followed"});

  
});

app.delete('/api/unfollow/:id', async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.verify(token, JWT_SECRET);
  const currentUserID = decoded.userId; //got the ID of the current logged in user.

  const targetUserId = req.params.id;

  //now we'll remove  the user from our following list
  await chitraeUsers.updateOne({userID: currentUserID}, {$pull: {userFollowing: targetUserId}});

  //we'll also remove our user id from the other person's profile.
  await chitraeUsers.updateOne({userID: targetUserId}, {$pull: {userFollowers: currentUserID}});

  res.json({success: true, message: "User Unfollowed"});
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
