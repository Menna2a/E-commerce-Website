let addedItem = localStorage.getItem("productsincart") ? JSON.parse(localStorage.getItem("productsincart")) : [];
let productsRes = localStorage.getItem("productsRes") ? JSON.parse(localStorage.getItem("productsRes")) : [];
let allProducts = document.querySelector(".products");
let userinfo = document.getElementById("userinfo");
let userdata = document.getElementById("user");
let links = document.getElementById("links");
let badge = document.querySelector(".badge");
let totaldiv = document.querySelector(".total");
let favprods = localStorage.getItem("favitems") ? JSON.parse(localStorage.getItem("favitems")) : [];

if (localStorage.getItem("username")) {
    links.remove();
    userinfo.style.display = "block";
    userdata.innerHTML = localStorage.getItem("username");
    badge.style.display = "block";
    badge.innerHTML = addedItem.length;
}

let logoutbtn = document.querySelector(".log_out");
logoutbtn.addEventListener("click", () => {
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    }, 1500);
});

function drawproducts(arr1, arr2) {
    let total = 0;
    let y = arr1.map((item) => {
        let itemall = arr2.find(thing => thing.title === item.title);
        total += itemall.price * item.num;
        return `
       <div class="col-6">
        <div class="card cartitem1 mb-3" >
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${itemall.imageUrl}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body text-center mt-4">
              <h4 class="card-title">${itemall.title}</h4>
              
              <p class="card-text fs-5 mt-4">$${itemall.price}</p>
              <p class="card-text fs-5 mt-3"><i class="fa-solid fa-plus btn" onclick="incrementItem('${itemall.title}')"></i>&nbsp ${item.num} &nbsp<i class="fa-solid fa-minus sub btn" onclick="decrementItem('${itemall.title}')"></i></p>
            </div>
          </div>
        </div>
      </div> 
    </div>
       `;
    });
    totaldiv.innerHTML = `$${total}`;
    allProducts.innerHTML = y.join(' ');
}

if (addedItem.length > 0) {
    drawproducts(productsRes, addedItem);
}

function decrementItem(title) {
    let addedItem = localStorage.getItem("productsincart") ? JSON.parse(localStorage.getItem("productsincart")) : [];
    let productsRes = localStorage.getItem("productsRes") ? JSON.parse(localStorage.getItem("productsRes")) : [];

    let index = addedItem.findIndex(item => item.title === title);
    if (index > -1) {
        addedItem.splice(index, 1);
        let productResItem = productsRes.find(item => item.title === title);
        if (productResItem) {
            productResItem.num--;
            if (productResItem.num <= 0) {
                productsRes = productsRes.filter(item => item.title !== title);
            }
        }
        localStorage.setItem("productsincart", JSON.stringify(addedItem));
        localStorage.setItem("productsRes", JSON.stringify(productsRes));
        drawproducts(productsRes, addedItem);
        badge.innerHTML = addedItem.length;
    }
}

function incrementItem(title) {
    let addedItem = localStorage.getItem("productsincart") ? JSON.parse(localStorage.getItem("productsincart")) : [];
    let productsRes = localStorage.getItem("productsRes") ? JSON.parse(localStorage.getItem("productsRes")) : [];

    let item = addedItem.find(item => item.title === title);
    if (item) {
        addedItem.push(item);
        let productResItem = productsRes.find(item => item.title === title);
        if (productResItem) {
            productResItem.num++;
        } else {
            productsRes.push({ title: item.title, num: 1 });
        }
        localStorage.setItem("productsincart", JSON.stringify(addedItem));
        localStorage.setItem("productsRes", JSON.stringify(productsRes));
        drawproducts(productsRes, addedItem);
        badge.innerHTML = addedItem.length;
    }
}

function removeDuplicates(array, key) {
    let seen = new Set();
    return array.filter(item => {
        let k = item[key];
        return seen.has(k) ? false : seen.add(k);
    });
}
favprods = removeDuplicates(favprods, 'id');

function generateSlide(favprods) {
    let slideHtml = '<div class="carousel-item"><div class="row">';
    favprods.forEach(product => {
        slideHtml += `
        <div class="card col-12 col-md-3 fav-item me-1 ms-4">
            <img src="${product.imageUrl}" class="card-img-top fav-item-img" alt="..." height="350">
            <div class="card-body fav-item-desc">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.category}<a class="btn btn-dark position-absolute end-0 me-2 text-danger" id="fav${product.id}" onClick="removefav(${product.id})"><i class="fa-solid fa-heart"></i></a>
              </p>
            </div>
          </div>`;
    });
    slideHtml += '</div></div>';
    return slideHtml;
}

function chunkArray(array, chunkSize) {
    let chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}

function generateFavs(arr) {
    let slides = chunkArray(arr, 4);
    let carouselInner = document.querySelector('.carousel-inner');
    carouselInner.innerHTML = ''; // Clear the existing content
    slides.forEach((slide, index) => {
        let slideHtml = generateSlide(slide);
        if (index === 0) {
            slideHtml = slideHtml.replace('<div class="carousel-item">', '<div class="carousel-item active">');
        }
        carouselInner.innerHTML += slideHtml;
    });
    let carousel = new bootstrap.Carousel(document.querySelector('.carousel'), {
        interval: false // Disable automatic sliding
    });
}

function removefav(id) {
    let favitem = document.querySelector("#fav" + id);
    if (favitem.classList.contains("text-danger")) {
        let inx = favprods.findIndex(item => item.id == id);
        if (inx != -1) {
            favprods.splice(inx, 1);
            localStorage.setItem("favitems", JSON.stringify(favprods));
            favitem.classList.remove("text-danger");
            favitem.classList.add("text-light");
            // Remove the item from the DOM
            favitem.closest('.fav-item').remove();
            regenerateCarousel(favprods);
        }
    }
}

function regenerateCarousel(favprods) {
    let carouselInner = document.querySelector('.carousel-inner');
    carouselInner.innerHTML = ''; 
    generateFavs(favprods); 
}


generateFavs(favprods);
