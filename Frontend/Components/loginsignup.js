import { loadPage } from "./SPARendererSwitchCases.js";
import { renderMyFeed } from "./ComponentRenderFunctions.js";
import { populateDOM } from "./PopulateDOM.js";
import { updateusername } from "./usernameupdatehelper.js";

export function userSignupLogic() {
    const usersignupform = document.getElementById("usersignup");
    if (!usersignupform) return; //safeguard
    
    usersignupform.addEventListener("submit", async (e) =>{
        e.preventDefault();
                let file = document.getElementById("avatar").files[0];
                let imgurl;
    if(file){
      const formData = new FormData();
      formData.append("image", file);

    const uploadRes = await fetch("/api/uploadimage", {
      method: "POST",
      body: formData,
    });

        let uploadData = await uploadRes.json();
        imgurl = uploadData;
}
        
        
        const userFirstName = document.getElementById("firstName").value;
        const userLastName = document.getElementById("lastName").value;
        const userEmail = document.getElementById("email").value;
        const userName = document.getElementById("username").value;
        const userPassword = document.getElementById("password").value;
        const userProfilePicture = imgurl.imageURL;
        
        const res = await fetch("/api/usersignup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({userFirstName, userLastName, userEmail, userName, userPassword, userProfilePicture})
        })

        const data = await res.json();
        if(data.success){
            alert("Account successfully created, you may login now...")
            loadPage("login");
        }

    })

            //Handling login navigation
        const loginbtn = document.getElementById("login");
        if (loginbtn) {
            loginbtn.addEventListener("click", ()=>{
                loadPage("login");
            })
        }

}


export function userloginlogic() {
    const userloginform = document.getElementById("userlogin");
    if (!userloginform) return;

    userloginform.addEventListener("submit", async(e) =>{
        e.preventDefault();

        const userEmail = document.getElementById("email").value;
        const userPassword = document.getElementById("password").value;

        const res = await fetch("/api/userlogin", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({userEmail, userPassword})
        })

        const data = await res.json();
        if (data.success) {
            //save jwt token to local storage
            localStorage.setItem("authToken", data.token)

            await loadPage("My Gallery");
            const appRoot = document.getElementById("appRoot");
            appRoot.style.display = "none";
            window.location.reload(true);
            updateusername(data.token);
        }else{
            alert("Invalid Email or Password")
        }
    });
    
            //Handling login navigation
        const signupbtn = document.getElementById("signup");
        if (signupbtn) {
            signupbtn.addEventListener("click", ()=>{
                loadPage("signup");
            })
        }
}