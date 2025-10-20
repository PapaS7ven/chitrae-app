
export function renderMyFeed(MyGallery) {
    return `<div class="second w-full border-x-[1px] border-gray-500">
      <div class="top flex justify-center items-center border-b-[1px] border-gray-500 text-lg">              
      <li class="flex justify-left items-center gap-2 p-1 hover:bg-[#779177] hover:cursor-pointer hover:border-0 hover:rounded-2xl absolute left-[5px] md:hidden" id="logoutbtn">
            <span class="material-symbols-outlined">logout</span><span class="hidden md:block">Logout</span>
          </li>
        <div class="center text-center p-2.5 hover:bg-[#779177] hover:cursor-pointer relative">
          <span>${MyGallery}</span>
          <div class="bar h-[5px] w-[100%] bg-[#06f906] absolute left-0 border-0 rounded-3xl"></div>
        </div>
      </div>

      <div class="allPosts h-[170vh] overflow-x-hidden overflow-y-scroll scrollbar-hide scroll-smooth">


      </div>
    </div>`
};

export function renderSpotlight(Spotlight){
  return `<div class="second w-full border-x-[1px] border-gray-500">
      <div class="top flex justify-center items-center border-b-[1px] border-gray-500 text-lg">
        <div class="center text-center p-2.5 hover:bg-[#779177] hover:cursor-pointer relative">
          <span>${Spotlight}</span>
          <div class="bar h-[5px] w-[100%] bg-[#06f906] absolute left-0 border-0 rounded-3xl"></div>
        </div>
      </div>

      <div class="allPosts h-[170vh] overflow-x-hidden overflow-y-scroll scrollbar-hide scroll-smooth">


      </div>
    </div>`
}

export function renderNotifications(Notifications) {
  return `<div class="second w-full border-x-[1px] border-gray-500">
      <div class="top flex justify-center items-center border-b-[1px] border-gray-500 text-lg">
        <div class="center text-center p-2.5 hover:bg-[#779177] hover:cursor-pointer relative">
          <span>${Notifications}</span>
          <div class="bar h-[5px] w-[100%] bg-[#06f906] absolute left-0 border-0 rounded-3xl"></div>
        </div>
      </div>

      <div class="allPosts h-[170vh] overflow-x-hidden overflow-y-scroll scrollbar-hide scroll-smooth">


      </div>
    </div>`
}


export function renderChatroom(Chatroom) {
  return `<div class="second w-full border-x-[1px] border-gray-500">
      <div class="top flex justify-center items-center border-b-[1px] border-gray-500 text-lg">
        <div class="center text-center p-2.5 hover:bg-[#779177] hover:cursor-pointer relative">
          <span>${Chatroom}</span>
          <div class="bar h-[5px] w-[100%] bg-[#06f906] absolute left-0 border-0 rounded-3xl"></div>
        </div>
      </div>

      <div class="allPosts h-[170vh] overflow-x-hidden overflow-y-scroll scrollbar-hide scroll-smooth">


      </div>
    </div>`
}


export function renderCollections(Collections) {
  return `<div class="second w-full border-x-[1px] border-gray-500">
      <div class="top flex justify-center items-center border-b-[1px] border-gray-500 text-lg">
        <div class="center text-center p-2.5 hover:bg-[#779177] hover:cursor-pointer relative">
          <span>${Collections}</span>
          <div class="bar h-[5px] w-[100%] bg-[#06f906] absolute left-0 border-0 rounded-3xl"></div>
        </div>
      </div>

      <div class="allPosts h-[170vh] overflow-x-hidden overflow-y-scroll scrollbar-hide scroll-smooth">


      </div>
    </div>`
}


export function renderSettings(Settings) {
  return `<div class="second w-full border-x-[1px] border-gray-500">
      <div class="top flex justify-center items-center border-b-[1px] border-gray-500 text-lg">
        <div class="center text-center p-2.5 hover:bg-[#779177] hover:cursor-pointer relative">
          <span>${Settings}</span>
          <div class="bar h-[5px] w-[100%] bg-[#06f906] absolute left-0 border-0 rounded-3xl"></div>
        </div>
      </div>

      <div class="allPosts h-[170vh] overflow-x-hidden overflow-y-scroll scrollbar-hide scroll-smooth">


      </div>
    </div>`
}


export function renderMyProfile(MyProfile) {
  return `<div class="second w-full border-x-[1px] border-gray-500">
      <div class="top flex justify-center items-center border-b-[1px] border-gray-500 text-lg">
        <div class="center text-center p-2.5 hover:bg-[#779177] hover:cursor-pointer relative">
          <span>${MyProfile}</span>
          <div class="bar h-[5px] w-[100%] bg-[#06f906] absolute left-0 border-0 rounded-3xl"></div>
        </div>
      </div>

      <div class="allPosts h-[170vh] overflow-x-hidden overflow-y-scroll scrollbar-hide scroll-smooth">

              
      </div>
    </div>`
}

export function renderlogin(login) {
  return `<div class="login bg-[#111811] text-white w-full h-[100%] absolute z-1 ">
    <div >
  <div class="apptitle place-items-center pt-[80px]"><img src="Chitrae-removebg-preview.png" alt="logo"></div>
  <div class="loginform place-items-center pt-[30px]">
    <form id="userlogin" class="flex flex-col gap-2.5 w-[30%] justify-center p-2">
      <label for="email">Email:</label>
      <input type="email" name="email" id="email" placeholder="Enter Your Email here!" class="border mb-[20px] h-[40px] p-1.5 hover:bg-[#779177]">

      <label for="password">Password:</label>
      <input type="password" name="password" id="password" placeholder="Enter Password" class="border mb-[20px] h-[40px] p-1.5 hover:bg-[#779177]">


      <button type="submit" value="Login" class="border hover:cursor-pointer mb-[20px] h-[40px] p-1.5 hover:bg-[#a7f7a7] bg-[#06f906] text-black">Login</button>

    <p>New to the platform? <span class="hover:underline hover:cursor-pointer" id="signup">Signup</span></p>
  </div>
  </div>
</div>`
}

export function rendersignup(signup) {
  return `<div class="signup bg-[#111811] text-white w-full h-[100%] absolute z-1 ">
    <div >
  <div class="apptitle place-items-center pt-[80px]"><img src="Chitrae-removebg-preview.png" alt="logo"></div>
  <div class="signupform place-items-center pt-[30px]">
    <form id="usersignup" enctype="multipart/form-data" class="flex flex-col gap-2.5 w-[30%] justify-center p-2">
      <label for="firstName">First Name:</label>
      <input type="text" name="firstName" id="firstName" placeholder="Enter Your First Name here!" class="border mb-[20px] h-[40px] p-1.5 hover:bg-[#779177]">

      <label for="lastName">Last Name:</label>
      <input type="text" name="lastName" id="lastName" placeholder="Enter Your Last Name here!" class="border mb-[20px] h-[40px] p-1.5 hover:bg-[#779177]">


      <label for="email">Email:</label>
      <input type="email" name="email" id="email" placeholder="Enter Your Email here!" class="border mb-[20px] h-[40px] p-1.5 hover:bg-[#779177]">

      <label for="username">UserName:</label>
      <input type="text" name="username" id="username" placeholder="Enter Your UserName here!" class="border mb-[20px] h-[40px] p-1.5 hover:bg-[#779177]">

      <label for="password">Password:</label>
      <input type="password" name="password" id="password" placeholder="Enter Password" class="border mb-[20px] h-[40px] p-1.5 hover:bg-[#779177]">

      <label for="avatar">Select Profile Photo:<div class="place-self-center w-full md:w-[20%] m-2.5 cursor-pointer"><img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" alt="avatar" class="preview border-0 rounded-full aspect-square object-cover"></div></label>
      <input type="file" name="avatar" id="avatar" accept="images/*" class="hidden">

      <button type="submit" value="Signup" class="border hover:cursor-pointer mb-[20px] h-[40px] p-1.5 hover:bg-[#a7f7a7] bg-[#06f906] text-black">Signup</button>
    </form>
    <p>Already registered? <span class="hover:underline hover:cursor-pointer" id="login">Login</span></p>
  </div>
  </div>
</div>`


}

export function renderDiscoverPeople(discoverpeople) {
  return `<div class="second w-full border-x-[1px] border-gray-500">
      <div class="top flex justify-center items-center border-b-[1px] border-gray-500 text-lg">
        <div class="center text-center p-2.5 hover:bg-[#779177] hover:cursor-pointer relative">
          <span>${discoverpeople}</span>
          <div class="bar h-[5px] w-[100%] bg-[#06f906] absolute left-0 border-0 rounded-3xl"></div>
        </div>
      </div>

      <div class="allPosts h-[170vh] overflow-x-hidden overflow-y-scroll scrollbar-hide scroll-smooth">
      <div class="discoverbody bg-[#273a27] text-white">
      <div class="wrapper grid grid-cols-4 gap-2.5 p-1.5"></div>
      </div>            

      </div>
    </div>`
}