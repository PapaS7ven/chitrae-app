import { renderDiscoverPeople, renderMyFeed } from "./ComponentRenderFunctions.js";
import { renderSpotlight } from "./ComponentRenderFunctions.js";
import { renderNotifications } from "./ComponentRenderFunctions.js";
import { renderCollections } from "./ComponentRenderFunctions.js";
import { renderChatroom } from "./ComponentRenderFunctions.js";
import { renderMyProfile } from "./ComponentRenderFunctions.js";
import { renderSettings } from "./ComponentRenderFunctions.js";
import { renderlogin } from "./ComponentRenderFunctions.js";
import { rendersignup } from "./ComponentRenderFunctions.js";
import { userSignupLogic } from "./loginsignup.js";
import { userloginlogic } from "./loginsignup.js";
import { populateMyProfile } from "./PopulateDOM.js";
import { populateDOM } from "./PopulateDOM.js";
import { populateDiscoverPeople } from "./PopulateDOM.js";
import { populateSpotlight } from "./PopulateDOM.js";

export async function loadPage(page) {
    const mainContent = document.getElementById("mainContent");
    const appRoot = document.getElementById("appRoot");
    mainContent.innerHTML = "";

    switch (page) {
        case "My Gallery":

            mainContent.innerHTML = renderMyFeed(page);
            await populateDOM(".allPosts");
            let logoutbtn2 = document.getElementById("logoutbtn2");
                logoutbtn2.addEventListener("click", ()=>{
                localStorage.removeItem("authToken");
                window.location.reload(true);
                })
            break;

        case "Spotlight":
            mainContent.innerHTML = renderSpotlight(page);
            await populateSpotlight(".allPosts");
            break;

        case "Notifications":
            mainContent.innerHTML = renderNotifications(page);
            break;
        

        case "Chatroom":
            mainContent.innerHTML = renderChatroom(page);
            break;

        case "Collections":
            mainContent.innerHTML = renderCollections(page);
            break;

        case "Settings":
            mainContent.innerHTML = renderSettings(page);
            break;

        case "My Profile":
                mainContent.innerHTML = renderMyProfile(page);
                await populateMyProfile(".allPosts")
                break;

        case "login":

                appRoot.innerHTML = renderlogin(page);
                userloginlogic()
                break;

        case "signup":

                appRoot.innerHTML = rendersignup(page);
                let avatar = document.getElementById("avatar");
                let imgSignupPreview = document.querySelector(".preview");
                avatar.addEventListener("change", (e) =>{
                const currFile = e.target.files;
                    if (currFile.length > 0) {
                        imgSignupPreview.src = "";
                        let newsrc = URL.createObjectURL(currFile[0]);
                        imgSignupPreview.src = newsrc;
                            }
                        })
                userSignupLogic();
                break;
    
        case "Discover People":
            mainContent.innerHTML = renderDiscoverPeople(page);
            await populateDiscoverPeople(".wrapper")
            break;

        default:
            mainContent.innerHTML = `<p class="text-gray-400">Page not found</p>`;
    }
}

