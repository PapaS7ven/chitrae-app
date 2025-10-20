
export function updateusername(data) {
            const profilename = document.querySelector(".profilename");
            profilename.innerHTML = `${data.userFirstName} ${data.userLastName}`;
            document.querySelector(".username").innerHTML = `@${data.userName}`;
            document.getElementById("rightavatar").src = data.avatar;
    
};

export function followUnfollowFnc() {
    document.querySelectorAll(".followbtn").forEach(btn => {
        btn.addEventListener("click", async () => {
            const token = localStorage.getItem("authToken");
            const userId = btn.getAttribute("data-ID");
            const isFollowing = btn.dataset.following === "true";

            btn.dataset.following = (!isFollowing).toString();
            btn.textContent = isFollowing ? "Follow":"Unfollow";
            btn.classList.toggle("Unfollow", !isFollowing);
            

        if (isFollowing) {
            await fetch(`/api/unfollow/${userId}`, {method: "DELETE", headers: {"authorization": `Bearer ${token}`}});
            
        } else {
            await fetch(`/api/follow/${userId}`, {method: "PUT", headers: {"authorization": `Bearer ${token}`}});
        }
            
        })
    });
}