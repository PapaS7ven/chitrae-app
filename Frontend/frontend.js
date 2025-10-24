dayjs.extend(window.dayjs_plugin_relativeTime);
import { loadPage } from "./Components/SPARendererSwitchCases.js";
import { populateDOM } from "./Components/PopulateDOM.js";
import { updateusername } from "./Components/usernameupdatehelper.js";
import { followUnfollowFnc } from "./Components/usernameupdatehelper.js";

console.log("Interactivity starts here!!!");

//loading animation
const loadingOverlay = document.getElementById("loading-overlay");

 export function showLoading() {
  loadingOverlay.classList.remove("hidden");
}

export function hideLoading() {
  loadingOverlay.classList.add("hidden");
}

//Function to convert heic images to jpg
export async function heictoJpg(imgfile) {
  let imageblob;
  const uniqueName = `photo_${Date.now()}.jpeg`;
  const heicfile = imgfile[0];
  if (heicfile && heicfile.type === "image/heic" || heicfile.name?.endsWith(".heic")) {
    const conversionResult = await heic2any({
      blob: heicfile,
      toType: 'image/jpeg'});
    
    imageblob = new File([conversionResult], uniqueName, {type: "image/jpeg"}); 

    return imageblob;
  }

  imageblob = new File([heicfile], uniqueName, {type: "image/jpeg"});
  return imageblob;
}

//Toggling the sidebar on mobile so that when we are on authentication page it hides the nav bar.
export function toggleSidebar(){
  const sidebar = document.querySelector(".sidebar");

  if(!sidebar) return;

  const onAuthPage = document.querySelector(".login") || document.querySelector(".signup");

  sidebar.classList.toggle("hidden", !!onAuthPage);
}


 //Default feed on page load.
document.addEventListener("DOMContentLoaded", async() => {
  showLoading()
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
  hideLoading();
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

//Image preview function to preview the image being posted before actually posting it.
let imgPreview = document.getElementById("imageUpload");
imgPreview.addEventListener("change", async (e) => {
  const currFile = e.target.files;
  console.log(currFile);
    const updatedFile = await heictoJpg(currFile);
   console.log(updatedFile);
    
    let src = URL.createObjectURL(updatedFile);
    let imagePreviewshow = document.getElementById("imagePreviewshow");
    imagePreviewshow.src = src;
    imagePreviewshow.style.display = "block";});

//   if (updatedFile.length > 0) {
             
//     let src = URL.createObjectURL(currFile[0]);
//     let imagePreviewshow = document.getElementById("imagePreviewshow");
//     imagePreviewshow.src = src;
//     imagePreviewshow.style.display = "block";
//   }
// })



//logout of the app functionality.
let logoutbtn = document.getElementById("logoutbtn");
  logoutbtn.addEventListener("click", ()=>{
  localStorage.removeItem("authToken");
  window.location.reload(true);
})




//Function to record the timestamp for our posted tweet so we can keep the postedon time in the db.
function recordTimeStamp() {
  // const now = new Date();
  // const readableTime = now.toLocaleString();
  const readableTime = new Date().toISOString();
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
              <div class="flex gap-3 items-center">
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
  showLoading();
    e.preventDefault()
    //We'll get the shareable link for our image from dropbox
    let orgfile = document.getElementById("imageUpload").files;
    let file = await heictoJpg(orgfile);

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
     hideLoading();
})




