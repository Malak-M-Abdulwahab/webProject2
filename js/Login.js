var email = document.querySelector("#email")
var password = document.querySelector("#password")
var login = document.querySelector("#submit")

login.addEventListener("click", function(e){
    e.preventDefault()
    if(email){
        email.style.borderColor = "rgb(204, 204, 204)"
    }
    if(password){
        password.style.borderColor = "rgb(204, 204, 204)"
    }
    if(!email.value || !password.value){
        if(!email.value){
            email.style.borderColor = "red"
        }
        if(!password.value){
            password.style.borderColor = "red"
        }
        alert("All inputs are required, please fill them all.")
        return
    }
    var indexAt = email.value.indexOf("@")
    var indexDot = email.value.indexOf(".")
    if(indexAt == -1 || email.value.length == indexAt + 1 || indexDot == -1 || email.value.length == indexDot + 1 || indexDot < indexAt){
        alert("Enter correct email.")
        return
    }
    const user = JSON.parse(localStorage.getItem("userData"));
    if(user.userEmail != email.value || user.userPassword != password.value){
        alert("Username or Password incorrect!")
        return
    }
    alert("Login Successful!")
    setTimeout(() => {
        window.location = "Main-Page.html"
    }, 500);
})