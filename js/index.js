let productsDiv = document.querySelector(".products");
let username = localStorage.getItem("username");
let links = document.querySelector("#links");
let userinfo = document.querySelector("#userinfo");
let user = document.querySelector("#user");
let logoutbtn = document.querySelector(".log_out");

if (username) {
    links.remove();
    userinfo.style.display = "block";
    user.innerHTML = username;
}

logoutbtn.addEventListener("click", () => {
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    }, 1500);
});

let products = [
    { id: 2, title: "Patrick Ta Blush", category:"Makeup", price: "45", imageUrl: "images/makeup/patricktablush.jpg" },
    { id: 6, title: "Laneige Lip Kit", category: "Skincare", price: "90", imageUrl: "images/skincare/laneigelipkit2.jpg" },

    { id: 3, title: "Rare Beauty Blush", category: "Makeup", price: "30", imageUrl: "images/makeup/rarebeautyblush.jpg" },
    
    { id: 5, title: "Tower 28 Lip Gloss", category: "Makeup", price: "40", imageUrl: "images/makeup/tower28gloss.jpg" },
    { id: 12, title: "Kayali Vanilla Candy", category: "Fragrance", price: "190", imageUrl: "images/fragrance/kayali.jpg" },
    { id: 7, title: "Biossacce Radiance Set", category: "Skincare", price: "85", imageUrl: "images/skincare/biossanceset.jpg" },
    { id: 1, title: "Ilia Super Serum", category: "Makeup", price: "40", imageUrl: "images/makeup/iliasuperserum.jpg" },
    { id: 10, title: "YSL Libre", category: "Fragrance", price: "180", imageUrl: "images/fragrance/YSLlibre.jpg" },
    { id: 13, title: "Chanel Chance", category: "Fragrance", price: "170", imageUrl: "images/fragrance/chanelchance.jpg" },

    { id: 8, title: "Sol de Janeiro Body Oil", category: "Skincare", price: "68", imageUrl: "images/skincare/SoldeJaneirobodyoil.jpg" },
    { id: 4, title: "Rare Beauty Bronze Stick", category: "Makeup", price: "35", imageUrl: "images/makeup/rarebeautybronzestick.jpg" },

    { id: 9, title: "The Ordinary Acne Set", category: "Skincare", price: "50", imageUrl: "images/skincare/theordinaryacneset.jpg" },
    { id: 11, title: "Valentino Born in Roma", category: "Fragrance", price: "160", imageUrl: "images/fragrance/valentino.jpg" },



];

function draw(prods) {
    let y = prods.map(item => {
        return `
        <div class="card col-lg-3 col-md-4 s-iteam product-item">
            <img src="${item.imageUrl}" class="card-img-top product-item-img" alt="...">
            <div class="card-body product-item-desc">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text"><strong>$ ${item.price}</strong><br>Category:<strong> ${item.category}</strong></p>
              <a class="btn btn-dark text-light" id="fav${item.id}" onClick="addtofav(${item.id})"><i class="fa-solid fa-heart"></i></a>
              <a class="btn btn-dark" id="addbtn${item.id}" onClick="addtocart(${item.id})">Add to Cart</a>
            </div>
          </div>
        `;
    });
    productsDiv.innerHTML = y.join('');
}

draw(products);

let addedItem = localStorage.getItem("productsincart") ? JSON.parse(localStorage.getItem("productsincart")) : [];
let cartproductdiv = document.querySelector(".carts_products div");
let badge = document.querySelector(".shopping_cart .badge");

function updateCartDisplay() {
    let itemCounts = addedItem.reduce((acc, item) => {
        acc[item.title] = (acc[item.title] || 0) + 1;
        return acc;
    }, {});

    let addedItemresult = Object.entries(itemCounts).map(([title, num]) => ({ 
        title,
        num
    }));

    cartproductdiv.innerHTML = "";

    addedItemresult.forEach(item => {
        cartproductdiv.innerHTML += `<p class="px-2">${item.num} ${item.title} 
        <i class="fa-solid fa-plus" onclick="incrementItem('${item.title}')"></i> 
        <i class="fa-solid fa-minus sub" onclick="decrementItem('${item.title}')"></i>
        <br>
        </p>`;
    });

    localStorage.setItem("productsRes", JSON.stringify(addedItemresult));
    badge.style.display = "block";
    badge.innerHTML = addedItem.length;
}

if (addedItem.length > 0) {
    updateCartDisplay();
}

function addtocart(id) {
    if (username) {
        let addbtn = document.querySelector("#addbtn" + id);
        let chosenItem = products.find(item => item.id == id);

        if (addbtn.classList.contains("btn-dark")) {
            addbtn.classList.remove("btn-dark");
            addbtn.classList.add("btn-danger");
            addbtn.innerHTML = "Remove from cart";

            addedItem.push(chosenItem);
            localStorage.setItem("productsincart", JSON.stringify(addedItem));
            updateCartDisplay();
        } else {
            addedItem = addedItem.filter(item => item.id !== id);
            localStorage.setItem("productsincart", JSON.stringify(addedItem));
            updateCartDisplay();

            addbtn.classList.remove("btn-danger");
            addbtn.classList.add("btn-dark");
            addbtn.innerHTML = "Add to Cart";
        }
    } else {
        setTimeout(() => {
            window.location = "login.html";
        }, 1500);
    }
}

function incrementItem(title) {
    let item = addedItem.find(item => item.title === title);
    if (item) {
        addedItem.push(item);
        localStorage.setItem("productsincart", JSON.stringify(addedItem));
        updateCartDisplay();
    }
}

function decrementItem(title) {
    let itemIndex = addedItem.findIndex(item => item.title === title);
    if (itemIndex > -1) {
        addedItem.splice(itemIndex, 1);
        localStorage.setItem("productsincart", JSON.stringify(addedItem));
        updateCartDisplay();
    }
}

let favitems = localStorage.getItem("favitems") ? JSON.parse(localStorage.getItem("favitems")) : [];
function addtofav(id) {
    let favitem = document.querySelector("#fav" + id);
    let chosenfavitem = products.find(item => item.id == id);

    if (favitem.classList.contains("text-light")) {
        favitem.classList.remove("text-light");
        favitem.classList.add("text-danger");
        favitems.push(chosenfavitem);
        localStorage.setItem("favitems", JSON.stringify(favitems));
    } else {
        let indx = favitems.map(i => i.id).indexOf(id);
        favitems.splice(indx, 1);
        localStorage.setItem("favitems", JSON.stringify(favitems));
        favitem.classList.remove("text-danger");
        favitem.classList.add("text-light");
    }
}

let shoppingcart = document.querySelector(".shopping_cart i");
let cartproduct = document.querySelector(".carts_products");

shoppingcart.addEventListener("click", () => {
    if (cartproductdiv.innerHTML != "") {
        if (cartproduct.style.display == "block") {
            cartproduct.style.display = "none";
        } else {
            cartproduct.style.display = "block";
        }
    } else {
        cartproduct.style.display = "none";
    }
});

let searchop = document.querySelector(".searchop");
let searcht = document.querySelector(".searcht");
let searchbyval = "Name";

searchop.addEventListener("change", () => {
    searchbyval = searchop.value;
    console.log(searchbyval);
});

searcht.addEventListener('input', function () {
    var currentValue = searcht.value;
    if (currentValue !== "") {
        if (searchbyval === "Name") {
            var len = currentValue.length;
            console.log(len);
            let result = products.filter((item) => {
                return item.title.toLowerCase().substring(0, len) == currentValue.toLowerCase();
            });

            draw(result);
        } else {
            var len = currentValue.length;
            console.log(len);
            let result = products.filter((item) => {
                return item.category.toLowerCase().substring(0, len) == currentValue.toLowerCase();
            });

            draw(result);
        }
    } else {
        draw(products); // Draw all products if search input is empty
    }
    console.log(currentValue);
});

products.forEach(prod => {
    let favindex = favitems.findIndex(fitem => prod.id == fitem.id);
    let cartindex = addedItem.findIndex(citem => prod.id == citem.id);
    if (favindex != -1) {
        let favbutton = document.querySelector("#fav" + prod.id);
        favbutton.classList.remove("text-light");
        favbutton.classList.add("text-danger");
    }
    if (cartindex != -1) {
        let cartbutton = document.querySelector("#addbtn" + prod.id);
        cartbutton.classList.remove("btn-dark");
        cartbutton.classList.add("btn-danger");
        cartbutton.innerHTML = "Remove from cart";
        updateCartDisplay();
    }
});
