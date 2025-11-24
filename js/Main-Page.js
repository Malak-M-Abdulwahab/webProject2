var loggedIn = localStorage.getItem("login")
var user
var productsInCart = []
var productsInFavourite = []

if(!localStorage.getItem("productsInCart")){
    for(var i = 0; i < 12; i++){
        productsInCart[i] = 0
    }
    localStorage.setItem("productsInCart", JSON.stringify(productsInCart))
}else{
    productsInCart = JSON.parse(localStorage.getItem("productsInCart"))
}

if(!localStorage.getItem("productsInFavourite")){
    for(var i = 0; i < 12; i++){
        productsInFavourite[i] = 0
    }
    localStorage.setItem("productsInFavourite", JSON.stringify(productsInFavourite))
}else{
    productsInFavourite = JSON.parse(localStorage.getItem("productsInFavourite"))
}

/* ///////////////////////// USER INFO /////////////////////////// */
/* /////////////////////////////////////////////////////////////// */
/* //////////////////// END HEADER BUTTONS /////////////////////// */

var loggedInHeader = document.querySelector("#loggedIn")
var logoutBtn = document.querySelector("#logout")
var welcome = document.querySelector("#welcome")

var loggedOutHeader = document.querySelector("#loggedOut")
var loginBtn = document.querySelector("#login")
var registerBtn = document.querySelector("#register")

if(loggedIn == 1){
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
    localStorage.removeItem("productsInCart")
    localStorage.removeItem("productsInFavourite")
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

/* /////////////////////// HEADER BUTTONS //////////////////////// */
/* /////////////////////////////////////////////////////////////// */
/* ///////////////////////// PRODUCTS //////////////////////////// */

class product{
    constructor(id, img, name, price, type){
        this.id = id
        this.img = img
        this.name = name
        this.price = price
        this.type = type
    }
}

var products = []
products[0] = new product(1, "images/products1.jpg", "Princess - Vera Wang", 560, "Sweet, Sharp")
products[1] = new product(2, "images/products2.jpg", "Palazzo Nobile", 1025, "Floral, Vibrant")
products[2] = new product(3, "images/products3.jpg", "Cherry Blossom - Guerlain", 1200, "Floral, Fresh")
products[3] = new product(4, "images/products4.jpg", "Flower Knows", 2900, "Floral, Sweet")
products[4] = new product(5, "images/products5.jpg", "Narciso Rodriguez", 800, "Floral, Musky")
products[5] = new product(6, "images/products6.jpg", "Spicy Vanilla - Karimadon", 680, "Vanilla, Warm")
products[6] = new product(7, "images/products7.jfif", "Fifi - Chachnil", 990, "Floral, Feminine")
products[7] = new product(8, "images/products8.jfif", "Miss Dior", 720, "Floral, Fresh")
products[8] = new product(9, "images/products9.jfif", "White Floral", 2600, "Sweet, Feminine")
products[9] = new product(10, "images/products10.jpg", "A Chant for the Nymphs", 2100, "Floral, Tropical")
products[10] = new product(11, "images/products11.jpg", "A Winter Melody", 1800, "Woody, Musky")
products[11] = new product(12, "images/products12.jpg", "Winter's Spring", 1600, "Floral, Musky")

var itemContainer = document.querySelector("#items")

for(var i = 0; i < 12; i++){
    itemContainer.innerHTML += `<div id="item${products[i].id}" class="item" productID="${products[i].id}">
                        <img src="${products[i].img}" alt="product ${products[i].id}">
                        <h3>${products[i].name}</h3>
                        <p id="price">${products[i].price}$</p>
                        <p id="type">${products[i].type}</p>
                        <div id="itemCart">
                            <i class="fa-solid fa-heart" id="heart"></i>
                            <button id="add">Add to cart</button>
                            <button id="remove">Remove from cart</button>
                        </div>
                    </div>`
}

/* //////////////////////// END PRODUCTS ///////////////////////// */
/* /////////////////////////////////////////////////////////////// */
/* /////////////////////////// CART ////////////////////////////// */

var shoppingCart = document.querySelector(".fa-cart-shopping")
var shoppingCartDropDown = document.querySelector("#headerCart")
var viewProducts = document.querySelector("#viewProducts")
var cartLogo = document.querySelector("#cartLogo")
var itemNumber = document.querySelector("#itemNumber")
var headerProducts = document.querySelector("#headerProducts")

var shoppingCartClick = 0

function showCartNumber(){
    sum = productsInCart.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    if(sum > 0){
        cartLogo.style.visibility = "visible"
        itemNumber.innerHTML = `${sum}`
    }
    else{
        cartLogo.style.visibility = "hidden"
    }
}

showCartNumber()

function showInCart(){
    var headerHeight = 50;
    headerProducts.innerHTML = ""
    for(var i = 0; i < 12; i++){
        if(productsInCart[i]>0){
            headerProducts.innerHTML+=`<div id="headerProduct">
                                <div id="firstLine">
                                    <h3>${products[i].name}</h3>
                                    <p>${products[i].price}$</p>
                                </div>
                                <div id="secondLine" productID="${i}">
                                    <button id="cartMinus">-</button>
                                    <p id="numberOfProducts">${productsInCart[i]}</p>
                                    <button id="cartPlus">+</button>
                                </div>
                            </div>`
            headerHeight += 140;
        }
    }

    shoppingCartDropDown.style.height = `${headerHeight}px`
    
    var cartMinus = document.querySelectorAll("#cartMinus")
    var cartPlus = document.querySelectorAll("#cartPlus")
    
    if(cartMinus){
        cartMinus.forEach(function(item){
            item.addEventListener("click", function(){
                var cartItemId = item.parentElement.getAttribute("productID")
                productsInCart[cartItemId]--
                if(productsInCart[cartItemId] < 0){
                    productsInCart[cartItemId] = 0
                }
                localStorage.setItem("productsInCart", JSON.stringify(productsInCart))
                showInCart()
                showCartNumber()
        }, { once: true })
        })
    }

    if(cartPlus){
        cartPlus.forEach(function(item){
            item.addEventListener("click", function(){
                var cartItemId = item.parentElement.getAttribute("productID")
                productsInCart[cartItemId]++
                localStorage.setItem("productsInCart", JSON.stringify(productsInCart))
                showInCart()
                showCartNumber()
        }, { once: true })
        })
    }

}

shoppingCart.addEventListener("click", function(){
    if(shoppingCartClick){
        shoppingCartDropDown.style.visibility = "hidden"
        shoppingCartDropDown.style.marginLeft = "10px"
        shoppingCartClick = 0;
    }
    else{
        shoppingCartDropDown.style.visibility = "visible"
        shoppingCartDropDown.style.marginLeft = "60px"
        shoppingCartClick = 1;
        showInCart()
    }
})

viewProducts.addEventListener("click", function(){
    setTimeout(() => {
        window.location = "Shopping-Cart.html"
    }, 500);
})

/* ////////////////////////// END CART /////////////////////////// */
/* /////////////////////////////////////////////////////////////// */
/* /////////////////////////// ITEM ////////////////////////////// */

var eachItem = document.querySelectorAll(".item")

eachItem.forEach(function(item) {
    var itemID = +(item.getAttribute("productID"))
    var addItem = document.querySelector(`#item${itemID} #add`)
    var removeItem = document.querySelector(`#item${itemID} #remove`)
    var favourite = document.querySelector(`#item${itemID} #heart`)
    if(productsInCart[itemID] > 0){
        addItem.style.display = "none"
        removeItem.style.display = "inline"
    }
    if(productsInFavourite[itemID] == 1){
        favourite.style.color = "rgb(194, 57, 102)"
    }
    item.addEventListener("mouseover", function(){
        addItem.addEventListener("click", function(){
            if(loggedIn==1){
                productsInCart[itemID]++
                localStorage.setItem("productsInCart", JSON.stringify(productsInCart))
                addItem.style.display = "none"
                removeItem.style.display = "inline"
                showInCart()
                showCartNumber()
                setTimeout(200);
            }else{
                setTimeout(() => {
                    window.location = "Login.html"
                }, 500);
            }
            // make the remove button visible!!!
            // check if im logged in!!!!!!!!!!!!!
        }, { once: true })
        removeItem.addEventListener("click", function(){
            if(loggedIn == 1){
                productsInCart[itemID]--
                if(productsInCart[itemID] < 0){
                    productsInCart[itemID] = 0
                }
                localStorage.setItem("productsInCart", JSON.stringify(productsInCart))
                addItem.style.display = "inline"
                removeItem.style.display = "none"
                showInCart()
                showCartNumber()
                setTimeout(200);
            }else{
                setTimeout(() => {
                    window.location = "Login.html"
                }, 500);
            }
        }, { once: true })
        favourite.addEventListener("click", function(){
            if(loggedIn == 1){
                if(productsInFavourite[itemID] == 1){
                    favourite.style.color = "black"
                    productsInFavourite[itemID] = 0
                    localStorage.setItem("productsInFavourite", JSON.stringify(productsInFavourite))
                }else{
                    favourite.style.color = "rgb(194, 57, 102)"
                    productsInFavourite[itemID] = 1
                    localStorage.setItem("productsInFavourite", JSON.stringify(productsInFavourite))
                }
            }else{
                setTimeout(() => {
                    window.location = "Login.html"
                }, 500);
            }
        }, { once: true })
    }, { once: true })
});

/* ///////////////////////// END ITEM //////////////////////////// */
/* /////////////////////////////////////////////////////////////// */
/* ////////////////////////// SEARCH ///////////////////////////// */

var searchBy = document.querySelector("#searchBy")
var searchBtn = document.querySelector("#searchBtn")
var searchIn = document.querySelector("#searchIn")

var itemContainer = document.querySelector("#items")

searchBtn.addEventListener("click", function(){
    var name = searchIn.value
    itemContainer.innerHTML = ""
    if(searchBy.value == "name"){
        for(var i = 0; i < 12; i++){
            if(products[i].name.toLowerCase().includes(name.toLowerCase())){
                itemContainer.innerHTML += `<div id="item${products[i].id}" class="item" productID="${products[i].id}">
                        <img src="${products[i].img}" alt="product ${products[i].id}">
                        <h3>${products[i].name}</h3>
                        <p id="price">${products[i].price}$</p>
                        <p id="type">${products[i].type}</p>
                        <div id="itemCart">
                            <i class="fa-solid fa-heart" id="heart"></i>
                            <button id="add">Add to cart</button>
                            <button id="remove">Remove from cart</button>
                        </div>
                    </div>`
            }
        }
    }
    else if(searchBy.value == "type"){
        for(var i = 0; i < 12; i++){
            if(products[i].type.toLowerCase().includes(name.toLowerCase())){
                itemContainer.innerHTML += `<div id="item${products[i].id}" class="item" productID="${products[i].id}">
                        <img src="${products[i].img}" alt="product ${products[i].id}">
                        <h3>${products[i].name}</h3>
                        <p id="price">${products[i].price}$</p>
                        <p id="type">${products[i].type}</p>
                        <div id="itemCart">
                            <i class="fa-solid fa-heart" id="heart"></i>
                            <button id="add">Add to cart</button>
                            <button id="remove">Remove from cart</button>
                        </div>
                    </div>`
            }
        }
    }
})