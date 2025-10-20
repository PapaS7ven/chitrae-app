dayjs.extend(window.dayjs_plugin_relativeTime);
import { loadPage } from "./Components/SPARendererSwitchCases.js";
import { populateDOM } from "./Components/PopulateDOM.js";
import { updateusername } from "./Components/usernameupdatehelper.js";
import { followUnfollowFnc } from "./Components/usernameupdatehelper.js";

console.log("Interactivity starts here!!!");

 //Default feed on page load.
document.addEventListener("DOMContentLoaded", async() => {
  const token = localStorage.getItem("authToken");
  if (token) {
    //verify token with backend
    let res = await fetch("/api/verifytoken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      }
    });

    let data = await res.json();
    console.log(data);
    
    
    if (data.success) {
        loadPage("My Gallery");
      updateusername(data.user);
      whotofollow();
      }
      else{
        loadPage("login")
          }

  }
  else{
    loadPage("login");
  }
});

//adding a event listner to navigate the page.
let navbtn = document.querySelectorAll(".navbtn");
navbtn.forEach(element => {
  element.addEventListener("click", ()=>{
    const page = element.dataset.page;
    loadPage(page);
  })
});

//posting page on mobile
let postingPage = document.getElementById("postingpage");
let postSection = document.getElementById("postSection");
let navButtons = document.querySelectorAll(".navbtn, .userProfile")

postingPage.addEventListener("click", ()=>{
  postSection.classList.add("active");
})

navButtons.forEach(btn =>{
  btn.addEventListener("click", ()=>{
    postSection.classList.remove("active");
  })
});



let tweetObj = {};
let postForm = document.getElementById("postForm");
let tweetbox = document.getElementById("tweetbox");

let imgPreview = document.getElementById("imageUpload");
imgPreview.addEventListener("change", (e) => {
  const currFile = e.target.files
  if (currFile.length > 0) {
    let src = URL.createObjectURL(currFile[0]);
    let imagePreviewshow = document.getElementById("imagePreviewshow");
    imagePreviewshow.src = src;
    imagePreviewshow.style.display = "block";
  }
})



//logout of the app functionality.
let logoutbtn = document.getElementById("logoutbtn");
  logoutbtn.addEventListener("click", ()=>{
  localStorage.removeItem("authToken");
  window.location.reload(true);
})

//Function to record the timestamp for our posted tweet so we can keep the postedon time in the db.
function recordTimeStamp() {
  const now = new Date();
  const readableTime = now.toLocaleString();
  return readableTime;
}

//Function to get the latesttweet ID from the database so all the tweets are posted in a sequence of tweet ids. 
async function getLatestTweetId() {
  const response = await fetch("/api/latestId");
  const latestTweetIdJson = await response.json();
  const latestTweetId = JSON.parse(latestTweetIdJson);

  return latestTweetId;
}


//Rendering the Who to follow section on the homepage
async function whotofollow() {
    const token = localStorage.getItem("authToken");
    const res = await fetch("/api/discover", {
      headers:{
        "authorization": `Bearer ${token}`
      }
    });
    const users = await res.json();
  
    const peoplesection = document.querySelector(".people");
  
  
    users.forEach(user => {
      let peoplesectionhtml = `<div class="follow flex justify-between items-center cursor-default p-2.5 hover:bg-[#779177]">
              <div class="flex gap-3">
                <div class="w-[15%]">
                  <img class="border-0 rounded-full aspect-square object-cover"
                    src="${user.userProfilePicture}"
                    alt="Avatar" />
                </div>
  
                <div class="flex flex-col">
                  <h2 class="px-1 text-lg">${user.userFirstName} ${user.userLastName}</h2>
                  <p class="text-sm text-[#ffffff]">@${user.userName}</p>
                </div>
              </div>
              <button type="button"
                class="followbtn bg-[#ffffff] px-[20px] py-[7px] text-base h-fit w-fit border-0 rounded-3xl text-black hover:cursor-pointer" data-ID ="${user.userID}" data-following = "${user.isFollowing}">${user.isFollowing? "Unfollow" : "Follow"}
              </button>
            </div>`
  
        peoplesection.innerHTML += peoplesectionhtml;
    }); 
  
    followUnfollowFnc();
  
  return;
  };



//Added an event listener to our Post Button so we can post a tweet and save it in our database and later access it to populate our feed.
postForm.addEventListener("submit", async(e) => {
    e.preventDefault()
    //We'll get the shareable link for our image from dropbox
    let file = document.getElementById("imageUpload").files[0];

    if(file){
      const formData = new FormData();
      formData.append("image", file);
      
    const uploadRes = await fetch("/api/uploadimage", {
      method: "POST",
      body: formData,
    });

    let uploadData = await uploadRes.json();
    let imageLink = uploadData.imageURL;

    let tweetContent = tweetbox.value;
    let currentId = await getLatestTweetId()
    currentId++

    let postedOn = recordTimeStamp();

    tweetObj = {
      "TweetId" : currentId,
      "TweetContent" : tweetContent,
      "PostedOn" : postedOn,
      "ImageLink" : imageLink,
    }
    
    // let jsontweet = JSON.stringify(tweetObj, null, 2);
      const token = localStorage.getItem("authToken");

    if (token) {
    let postTweetApi =  fetch("/api/posttweet", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify(tweetObj)
    })

  }
        
    
    window.location.reload(await populateDOM(".allPosts"));
  
    tweetbox.value = "";
     };
})




