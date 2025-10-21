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
import { showLoading } from "../frontend.js";
import { hideLoading } from "../frontend.js";

export async function loadPage(page) {
    const mainContent = document.getElementById("mainContent");
    const appRoot = document.getElementById("appRoot");
    mainContent.innerHTML = "";

    switch (page) {
        case "My Gallery":

            mainContent.innerHTML = renderMyFeed(page);
            showLoading();
            await populateDOM(".allPosts");
            hideLoading();
            let logoutbtn2 = document.getElementById("logoutbtn2");
                logoutbtn2.addEventListener("click", ()=>{
                localStorage.removeItem("authToken");
                window.location.reload(true);
                })
            break;

        case "Spotlight":
            mainContent.innerHTML = renderSpotlight(page);
            showLoading();
            await populateSpotlight(".allPosts");
            hideLoading();
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
                showLoading();
                await populateMyProfile(".allPosts")
                hideLoading();
                break;

        case "login":

                appRoot.innerHTML = renderlogin(page);
                showLoading();
                userloginlogic()
                hideLoading();
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
                showLoading();
                userSignupLogic();
                hideLoading();
                break;
    
        case "Discover People":
            mainContent.innerHTML = renderDiscoverPeople(page);
            showLoading();
            await populateDiscoverPeople(".wrapper")
            hideLoading();
            break;

        default:
            mainContent.innerHTML = `<p class="text-gray-400">Page not found</p>`;
    }
}

