var firstName = document.querySelector("#first-name")
var lastName = document.querySelector("#last-name")
var fullName = firstName.value.trim() + lastName.value.trim()
var email = document.querySelector("#email")
var password = document.querySelector("#password")
var passwordCheck = document.querySelector("#password-check")
var register = document.querySelector("#submit")

register.addEventListener("click", function(e){
    e.preventDefault()
    if(firstName){
    firstName.style.borderColor = "rgb(204, 204, 204)"
    }
    if(lastName){
        lastName.style.borderColor = "rgb(204, 204, 204)"
    }
    if(email){
        email.style.borderColor = "rgb(204, 204, 204)"
    }
    if(password){
        password.style.borderColor = "rgb(204, 204, 204)"
    }
    if(passwordCheck){
        passwordCheck.style.borderColor = "rgb(204, 204, 204)"
    }
    if(!firstName.value || !lastName.value || !email.value || !password.value || !passwordCheck.value){
        if(!firstName.value){
           firstName.style.borderColor = "red"
        }
        if(!lastName.value){
            lastName.style.borderColor = "red"
        }
        if(!email.value){
            email.style.borderColor = "red"
        }
        if(!password.value){
            password.style.borderColor = "red"
        }
        if(!passwordCheck.value){
            passwordCheck.style.borderColor = "red"
        }
        alert("All inputs are required, please fill them all.")
        return
    }
    var indexAt = email.value.indexOf("@")
    console.log
    var indexDot = email.value.indexOf(".")
    if(indexAt == -1 || email.value.length == indexAt + 1 || indexDot == -1 || email.value.length == indexDot + 1 || indexDot < indexAt){
        alert("Enter correct email.")
        return
    }
    if(password.value != passwordCheck.value){
        alert("Passwords are not the same.")
        return
    }
    setTimeout(() => {
        window.location = "Login.html"
    }, 1000);
})