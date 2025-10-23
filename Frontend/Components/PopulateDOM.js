import { followUnfollowFnc } from "./usernameupdatehelper.js";

async function getGalleryPosts() {
  const token = localStorage.getItem("authToken");
  const response = await fetch("/api/gallery", {
    headers:{
      "authorization": `Bearer ${token}`
    }
  });
  const allTweetsJson = await response.json();

  return allTweetsJson;
} 

async function getSpotlightPosts() {
  const token = localStorage.getItem("authToken");
  const response = await fetch("/api/spotlight", {
    headers:{
      "authorization": `Bearer ${token}`
    }
  });
  const allTweetsJson = await response.json();

  return allTweetsJson;
} 


 export async function populateDOM(containerSelector) {
  let alltweets = await getGalleryPosts(); 
        console.log(alltweets);

    //this alltweets is giving me an array of objects. We need to run a loop on this to get the tweetcontent in an array 
    const conatinerClass = document.querySelector(containerSelector);

      
  
    for (let index = 0; index < alltweets.length; index++) {
      const element = alltweets[index];
      const tweetcon = element.TweetContent;
      const tweetdate = element.PostedOn;
      const tweetImg = element.ImageLink;
      const userName = element.userDetails.userName;
      const firstName = element.userDetails.userFirstName;
      const lastName = element.userDetails.userLastName;
      const avatar = element.userDetails.userProfilePicture;

      
      console.log(tweetcon);

    let htmlContent = `<div class="mainpost border-b-[1px] p-2.5 flex md:gap-5 gap-2">
          <div class="profiles md:w-[12%] md:h-[12%] w-[10%] h-[10%] flex">
            <img class="border-0 rounded-full aspect-square object-cover hover:cursor-pointer"
              src="${avatar}" alt="Rainmaker1973" />
          </div>

          <div class="posts md:w-[100%] w-[90%]">
            <div class="header flex justify-start items-center gap-2.5 text-xs md:text-sm">
              <h3 class="profileName">${firstName} ${lastName}</h3>
              <p class="handle text-sm text-gray-500 hover:cursor-pointer">
                @${userName}
              </p>
              <ul class="text-sm text-gray-500 list-disc list-inside">
                <li>${dayjs(tweetdate).fromNow()}</li>
              </ul>
            </div>
            <div class="text pt-2.5 pb-2.5">
              <p>
                ${tweetcon}
              </p>
            </div>
            <div class="media p-2.5 md:p-0 md:py-2.5">
              <img class="w-[100%] border-0 rounded-[10px] aspect-auto object-contain object-center"
                src="${tweetImg}"
                alt="Rock Floating in the air" />
            </div>

            <div class="actions flex justify-between items-center text-xs text-gray-500">
              <div class="reaction">
                <ul class="flex justify-center items-center gap-4">
                  <li class="flex justify-center items-center hover:cursor-pointer hover:text-white">
                    <span class="material-symbols-outlined">mode_comment</span>1K
                  </li>
                  <li class="flex justify-center items-center hover:cursor-pointer hover:text-white">
                    <span class="material-symbols-outlined">repeat</span>3.6K
                  </li>
                  <li class="flex justify-center items-center hover:cursor-pointer hover:text-white">
                    <span class="material-symbols-outlined">favorite</span>42K
                  </li>
                  <li class="flex justify-center items-center hover:cursor-pointer hover:text-white">
                    <span class="material-symbols-outlined">bar_chart_4_bars</span>10M
                  </li>
                </ul>
              </div>
              <div class="action">
                <ul class="flex justify-center items-center gap-1">
                  <li class="hover:cursor-pointer hover:text-white">
                    <span class="material-symbols-outlined">bookmark</span>
                  </li>
                  <li class="hover:cursor-pointer hover:text-white">
                    <span class="material-symbols-outlined">upload</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>`
        
    conatinerClass.innerHTML += htmlContent;
    } 
    return;
}

 export async function populateSpotlight(containerSelector) {
  let alltweets = await getSpotlightPosts(); 
        console.log(alltweets);

    //this alltweets is giving me an array of objects. We need to run a loop on this to get the tweetcontent in an array 
    const conatinerClass = document.querySelector(containerSelector);

      
  
    for (let index = 0; index < alltweets.length; index++) {
      const element = alltweets[index];
      const tweetcon = element.TweetContent;
      const tweetdate = element.PostedOn;
      const tweetImg = element.ImageLink;
      const userName = element.userDetails.userName;
      const firstName = element.userDetails.userFirstName;
      const lastName = element.userDetails.userLastName;
      const avatar = element.userDetails.userProfilePicture;

      
      console.log(tweetcon);

    let htmlContent = `<div class="mainpost border-b-[1px] p-2.5 flex md:gap-5 gap-2">
          <div class="profiles md:w-[12%] w-[10%]">
            <img class="border-0 rounded-full aspect-square object-cover hover:cursor-pointer"
              src="${avatar}" alt="Rainmaker1973" />
          </div>

          <div class="posts md:w-[100%] w-[90%]">
            <div class="header flex justify-start items-center gap-2.5">
              <h3 class="profileName">${firstName} ${lastName}</h3>
              <p class="handle text-sm text-gray-500 hover:cursor-pointer">
                @${userName}
              </p>
              <ul class="text-sm text-gray-500 list-disc list-inside">
                <li>${dayjs(tweetdate).fromNow()}</li>
              </ul>
            </div>
            <div class="text">
              <p>
                ${tweetcon}
              </p>
            </div>
            <div class="media p-2.5 md:p-0 md:py-2.5">
              <img class="w-[100%] border-0 rounded-[10px] aspect-auto object-contain object-center"
                src="${tweetImg}"
                alt="Rock Floating in the air" />
            </div>

            <div class="actions flex justify-between items-center text-xs text-gray-500">
              <div class="reaction">
                <ul class="flex justify-center items-center gap-4">
                  <li class="flex justify-center items-center hover:cursor-pointer hover:text-white">
                    <span class="material-symbols-outlined">mode_comment</span>1K
                  </li>
                  <li class="flex justify-center items-center hover:cursor-pointer hover:text-white">
                    <span class="material-symbols-outlined">repeat</span>3.6K
                  </li>
                  <li class="flex justify-center items-center hover:cursor-pointer hover:text-white">
                    <span class="material-symbols-outlined">favorite</span>42K
                  </li>
                  <li class="flex justify-center items-center hover:cursor-pointer hover:text-white">
                    <span class="material-symbols-outlined">bar_chart_4_bars</span>10M
                  </li>
                </ul>
              </div>
              <div class="action">
                <ul class="flex justify-center items-center gap-1">
                  <li class="hover:cursor-pointer hover:text-white">
                    <span class="material-symbols-outlined">bookmark</span>
                  </li>
                  <li class="hover:cursor-pointer hover:text-white">
                    <span class="material-symbols-outlined">upload</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>`
        
    conatinerClass.innerHTML += htmlContent;
    } 
    return;
}


export async function populateMyProfile(containerselector) {
      const token = localStorage.getItem("authToken");
      if (token) {
        let getprofile =  await fetch("/api/getProfile", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "authorization": `Bearer ${token}`
      },
    }) 

        let data = await getprofile.json();
        console.log(data);
        
        const conatinerClass = document.querySelector(containerselector);

       let htmlContent = `<div class="mainprofilemenu">
           <div class="profilehead p-3 flex justify-around items-center m-2 ">
             <div class="profilepic w-[30%] md:w-[18%]"><img src="${data.profile[0].userProfilePicture}" alt="" class="border-0 rounded-full aspect-square object-cover"></div>
              <div class="place-items-center"><div class="flex gap-2.5"><h2 class="profilename ">${data.profile[0].userFirstName} ${data.profile[0].userLastName}</h2><li class="username  list-none italic">@${data.profile[0].userName}</li></div>
              <div class="profilemetrics place-items-center p-2">
                <div class="flex gap-2 p-2">
              <div class="follower "><span>Followers : </span><span>${data.profile[0].userFollowers.length}</span></div>
              <div class="following "><span>Following : </span><span>${data.profile[0].userFollowing.length}</span></div></div>
              <div class="Posts "><span>Posts : </span><span>${data.posts.length}</span></div>
              </div>
              </div>
          </div>

          <div class="body">
            <div class="bodyheader border-b-2 border-gray-500 p-5 flex gap-8">
              <span class="hover:cursor-pointer relative text-amber-300">Shots<div class="bar h-[5px] w-[100%] bg-[#06f906] absolute left-0 border-0 rounded-3xl"></div></span>
              <span class="hover:cursor-pointer">My Collections</span>
              <span class="hover:cursor-pointer">About Me</span>
            </div>
            <div class="bodycontent">
              <div class="shots grid grid-cols-3 w-auto gap-3 p-2.5">

              </div>
            </div>
          </div>

        </div>`

       conatinerClass.innerHTML += htmlContent;
      
       let shots = document.querySelector(".shots");
       for (let index = 0; index < data.posts.length; index++) {
          const element = data.posts[index];
          const postImg = element.ImageLink;

          let htmlcontent2 = `<div class="shot"><img src="${postImg}" alt="" class="w-[30vw] h-[25vh] md:h-[27vh] object-cover border-0 rounded-2xl m-0.5"></div>`
        
          shots.innerHTML += htmlcontent2;
       }
       
      }



return;
}


export async function populateDiscoverPeople(containerselector) {
  const token = localStorage.getItem("authToken");
  const res = await fetch("/api/discover", {
    headers:{
      "authorization": `Bearer ${token}`
    }
  });
  const users = await res.json();


  const conatinerClass = document.querySelector(containerselector);

  users.forEach(user => {
      let htmlContent = `<div class="followCard w-full bg-black md:w-[12rem] hover:bg-[#779177] flex md:flex-col gap-1.5 justify-between md:justify-center items-center md:place-items-center p-2.5 rounded-2xl">
  <div class="image w-[5rem] md:w-[8rem]"><img src="${user.userProfilePicture}" alt="avatar" class="border-0 rounded-full aspect-square object-cover"></div>
  <div class="flex flex-col">
    <h2 class="px-1 text-lg">${user.userFirstName} ${user.userLastName}</h2>
    <p class="text-sm text-[#ffffff]">@${user.userName}</p>
  </div>
  <button type="button" class="followbtn bg-[#ffffff] px-[20px] py-[7px] text-base h-fit w-fit border-0 rounded-3xl text-black hover:cursor-pointer" data-ID ="${user.userID}" data-following = "${user.isFollowing}">${user.isFollowing? "Unfollow" : "Follow"}
  </button>
</div>`

    conatinerClass.innerHTML += htmlContent;
  }); 

  followUnfollowFnc();

return;
}


