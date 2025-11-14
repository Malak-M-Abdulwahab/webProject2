var loggedIn = localStorage.getItem("login")
var user

var loggedInHeader = document.querySelector("#loggedIn")
var logoutBtn = document.querySelector("#logout")
var welcome = document.querySelector("#welcome")

var loggedOutHeader = document.querySelector("#loggedOut")
var loginBtn = document.querySelector("#login")
var registerBtn = document.querySelector("#register")

if(loggedIn){
    user = JSON.parse(localStorage.getItem("userData"))
    loggedInHeader.style.display = "block"
    loggedOutHeader.style.display = "none"
    welcome.textContent += user.userName
}
else{
    loggedOutHeader.style.display = "block"
    loggedInHeader.style.display = "none"
}

logoutBtn.addEventListener("click" ,function(){
    localStorage.removeItem("userData")
    localStorage.setItem("login", 0)
    loggedOutHeader.style.display = "block"
    loggedInHeader.style.display = "none"
})

loginBtn.addEventListener("click", function(){
    setTimeout(() => {
        window.location = "Login.html"
    }, 500);
})

registerBtn.addEventListener("click", function(){
    setTimeout(() => {
        window.location = "Register.html"
    }, 500);
})

