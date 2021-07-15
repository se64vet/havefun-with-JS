
fetch("./data.json")
.then(response => response.json())
.then(data => {
    // save data to JS Array
    const classicDrinks = data['classic-drinks']
    const alcoholFree = data['alcohol-free']
    const cocktails = data['cocktails']
    
    const mostOrd = [];
    findObjectByBoolenKey(classicDrinks,mostOrd, 'popular');
    findObjectByBoolenKey(alcoholFree,mostOrd, 'popular');
    findObjectByBoolenKey(cocktails,mostOrd, 'popular');
    

    const menuCard = document.querySelector(".menu-card")
    

    // Button selection
    const classicsBtn = document.querySelector("#classics");
    const alcFreeBtn = document.querySelector("#alcohol-free");
    const cocktailsBtn = document.querySelector("#cocktails");
    const mostOrdBtn = document.querySelector("#most-order");

    //loading default
    createItem(classicDrinks, menuCard);

    // load new menu on category click
    alcFreeBtn.addEventListener("click",() => {
        removeAllChildNodes(menuCard);
        createItem(alcoholFree, menuCard)
        filter.classList.toggle("display-flex");
    })
    classicsBtn.addEventListener("click",() => {
        removeAllChildNodes(menuCard);
        createItem(classicDrinks, menuCard)
        filter.classList.toggle("display-flex");
    })
    cocktailsBtn.addEventListener("click",() => {
        removeAllChildNodes(menuCard);
        createItem(cocktails, menuCard)
        filter.classList.toggle("display-flex");
    })
    mostOrdBtn.addEventListener("click",() => {
        removeAllChildNodes(menuCard);
        createItem(mostOrd, menuCard)
        filter.classList.toggle("display-flex");
    })

    // responsive
    // filter toggle on hamburger click
    const hamburger = document.querySelector(".hamburger")
    const filter = document.querySelector(".filter")
    hamburger.addEventListener("click", ()=>{
        filter.classList.toggle("display-flex");
    })
})

function createItem(category, menuCard){

    category.forEach(drink => {
        // create name/price/img/desc for each item
        const item = document.createElement("li");
        item.className = "menu-item";

        const name = document.createElement("h5");
        name.className = "item-name";
        name.innerText = drink.name;
        
        const price = document.createElement("span");
        price.className = "item-price";
        price.innerText = `$ ${drink.price}`;

        const pic = document.createElement("div");
        pic.className = "item-img";
            // create and add img tag insside pic div
            const img = document.createElement("img")
            img.src = drink.imgUrl;
            img.alt = drink.name;
            pic.appendChild(img);

        const desc = document.createElement("p");
        desc.className = "item-description";
        desc.innerText = drink.desc

        // append above elements to Item
        item.appendChild(name);
        item.appendChild(price);
        item.appendChild(pic);
        item.appendChild(desc);

        // append item to menu card
        menuCard.appendChild(item)
    });
}

function findObjectByBoolenKey(data,saveList,boolenKey){
    data.forEach(element => {
        if(element[boolenKey] === true){
            saveList.push(element);
        }
    });
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}