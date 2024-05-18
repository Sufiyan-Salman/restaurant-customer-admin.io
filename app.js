//===================
function goToCustomer() {
    window.location.href = "customer_auth.html";
}
function goToIndex() {
    window.location.href = "index.html";
}

function goToAdmin() {
    window.location.href = "admin_auth.html";
}

function gotToPreviousPage(){
  window.history.back()
}
//===================

function updateUserCart(updatedCart){
  const currUser = JSON.parse(localStorage.getItem("currUser"))
  currUser.cart = updatedCart;
  
  var existingUsers = JSON.parse(localStorage.getItem("customerUsers"));
  existingUsers = existingUsers.map(user => {
    if (user.email === currUser.email) {
      return currUser;
    }
    return user;
  });
  // Save the updated users array to localStorage
  localStorage.setItem("customerUsers", JSON.stringify(existingUsers));
}
function addToCart(parentNode) {
  // const menuId = parseInt(parentNode.querySelector('span.hidden').textContent);
  const menuName = parentNode.querySelector('h5.card-title').textContent;
  const menuPrice = parentNode.querySelector('p.card-text').textContent;
  var currCart = JSON.parse(localStorage.getItem("currCart")) || [];
  const cartItemExists = currCart.some(item => item.name === menuName);
  if (cartItemExists) { // update cart
    cartItem = currCart.find(item => item.name === menuName)
    console.log("item",cartItem)
    cartItem.quantity= cartItem.quantity+1
    currCart = currCart.map(item => {
      if (item.name === cartItem.name) {
        console.log("updated",currCart)
        console.log("item",item)
        console.log("menu",cartItem)
        return cartItem;
      }
      return item;
    });
  }else currCart.push({ name: menuName, price: menuPrice, quantity: 1 });
  localStorage.setItem("currCart", JSON.stringify(currCart));
  updateUserCart(currCart)
  alert("Item added to cart!")

  

}
function displayListItemInShowCartMethod(currCart){
  let total = 0;
    currCart.forEach(function(item, index) {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.textContent = item.name+" x"+item.quantity ;
        total+= item.quantity*item.price
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger", "float-end");
        deleteButton.addEventListener("click", function() {
            deletedItem = currCart [index] // get the item that is to be deleted

            currCart.splice(index, 1);// delete the item

            total -= deletedItem.quantity*deletedItem.price  // calculate the price that is to be reduced from total and update in total span
            const totalSpan = document.getElementById("total");
            totalSpan.innerText = "Total: "+total+" Rs"

            localStorage.setItem("currCart", JSON.stringify(currCart)); // update cart and user
            updateUserCart(currCart)
            listItem.remove();
            // displayListItemInShowCartMethod(currCart)
        });

        const totalSpan = document.getElementById("total");
        totalSpan.innerText = "Total: "+total+" Rs"
        listItem.appendChild(deleteButton);
        cartItemList.appendChild(listItem);

      const cartModal = new bootstrap.Modal(document.getElementById("cartModal"), {});
      cartModal.show();
    });
}
function showCart() {

  const currCart = JSON.parse(localStorage.getItem("currCart")) || [];
    const cartItemList = document.getElementById("cartItemList");
    cartItemList.innerHTML = "";
    if (currCart.length==0) {
      alert("Cart is Empty!")
      return
    }

    let total = 0;
    // currCart.forEach(function(item, index) {
    //     const listItem = document.createElement("li");
    //     listItem.classList.add("list-group-item");
    //     listItem.textContent = item.name+" x"+item.quantity ;
    //     total+= item.quantity*item.price
    //     const deleteButton = document.createElement("button");
    //     deleteButton.textContent = "Delete";
    //     deleteButton.classList.add("btn", "btn-danger", "float-end");
    //     deleteButton.addEventListener("click", function() {
    //         deletedItem = currCart [index] // get the item that is to be deleted

    //         currCart.splice(index, 1);// delete the item

    //         total -= deletedItem.quantity*deletedItem.price  // calculate the price that is to be reduced from total and update in total span
    //         const totalSpan = document.getElementById("total");
    //         totalSpan.innerText = "Total: "+total+" Rs"

    //         localStorage.setItem("currCart", JSON.stringify(currCart)); // update cart and user
    //         updateUserCart(currCart)
    //         listItem.remove();
    //     });

    //     const totalSpan = document.getElementById("total");
    //     totalSpan.innerText = "Total: "+total+" Rs"
    //     listItem.appendChild(deleteButton);
    //     cartItemList.appendChild(listItem);

    //   const cartModal = new bootstrap.Modal(document.getElementById("cartModal"), {});
    //   cartModal.show();
    // });


    displayListItemInShowCartMethod(currCart)

}
//===================
//Authentication
// Customer Sign Up
function customerSignUp() {
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    
    // Get existing users from localStorage or initialize an empty array
    const existingUsers = JSON.parse(localStorage.getItem("customerUsers")) || [];
    
    // Check if user with the same email already exists
    const userExists = existingUsers.some(user => user.email === email);
    
    if (!userExists) {
      // Add new user to the array
      cart = []
      existingUsers.push({ email, password, cart });
      // Save updated users array to localStorage
      localStorage.setItem("customerUsers", JSON.stringify(existingUsers));
      alert("Sign up successful!");
    } else {
      alert("User already exists!");
    }
}
  
// Customer Sign In
function customerSignIn() {
    const email = document.getElementById("signinEmail").value;
    const password = document.getElementById("signinPassword").value;
    
    // Get existing users from localStorage or initialize an empty array
    const existingUsers = JSON.parse(localStorage.getItem("customerUsers")) || [];
    
    // Check if there is a user with provided email and password
    const user = existingUsers.find(user => user.email === email && user.password === password);
    
    if (user) {
      alert("Sign in successful!");
      localStorage.setItem("userType","customer")
      localStorage.setItem("currCart", JSON.stringify(user.cart))
      localStorage.setItem("currUser", JSON.stringify(user))
      window.location.href = "restaurants.html?fromPage=customer_auth.html"; // Redirect to restaurants page
    } else {
      alert("Invalid email or password!");
    }
}
  
// Restaurant Admin Sign Up
function adminSignUp() {
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const restaurantName = document.getElementById("restaurantName").value;
    
    // Get existing admins from localStorage or initialize an empty array
    const existingAdmins = JSON.parse(localStorage.getItem("adminUsers")) || [];
    
    // Check if admin with the same email already exists
    const adminExists = existingAdmins.some(admin => admin.email === email);
    
    if (!adminExists) {
      // Add new admin and restaurant to the array

      const existingRestaurants = JSON.parse(localStorage.getItem("restaurants")) || [];
      // Check if restaurant with the same name already exists
      const restaurantExists = existingRestaurants.some(restaurant => restaurant.name === restaurantName);
      if (!restaurantExists) {
        restId = addRestaurant(restaurantName)
        existingAdmins.push({ email, password, restId });
        
        // Save updated admins array to localStorage
        localStorage.setItem("adminUsers", JSON.stringify(existingAdmins));
        alert("Sign up successful!");
      }else{
        alert("Sign up unsuccessful!, Restaurant already exists");

      }

    } else {
      alert("Admin already exists!");
    }
}
  
// Restaurant Admin Sign In
function adminSignIn() {
    const email = document.getElementById("signinEmail").value;
    const password = document.getElementById("signinPassword").value;
    
    // Get existing admins from localStorage or initialize an empty array
    const existingAdmins = JSON.parse(localStorage.getItem("adminUsers")) || [];
    
    // Check if there is an admin with provided email and password
    const admin = existingAdmins.find(admin => admin.email === email && admin.password === password);
    

    if (admin) {

      alert("Sign in successful!");

      // restaurantList = getRestaurantList()
      RestaurantList.restaurants = RestaurantListMethods.loadFromLocalStorage()

      currentRestaurant = RestaurantList.restaurants.find(restaurant => restaurant.id === admin.restId )
      localStorage.setItem("currRestaurant",JSON.stringify(currentRestaurant))
      localStorage.setItem("currRestaurantId",JSON.stringify(currentRestaurant.id))
      
      localStorage.setItem("userType","admin")

      window.location.href = "restaurant_admin.html?fromPage=admin_auth.html"; // Redirect to restaurant admin page
    } else {
        alert("Invalid email or password!");
    }
}
  



//===================

function editRestaurant(parentNode){

  // Update restaurant name 
  currentRestaurantId = JSON.parse(localStorage.getItem("currRestaurantId"))
  // const currRestaurantId = parseInt(parentNode.querySelector('span.hidden').textContent);
  
  restaurantName = prompt("Enter Restaurant Name: ")
  if (restaurantName && restaurantName.trim() !== "") {

    // Restaurant name is valid, edit the Restaurant
    alert("Restaurant edited successfully!");
    
    RestaurantListMethods.updateRestaurant(currentRestaurantId, restaurantName)

    
    RestaurantList.restaurants = RestaurantListMethods.loadFromLocalStorage()
    currentRestaurant = RestaurantList.restaurants.find(restaurant => restaurant.id === currentRestaurantId )
    localStorage.setItem("currRestaurant",JSON.stringify(currentRestaurant))
    
    //reload
    window.location.href = "restaurant_admin.html?fromPage=admin_auth.html"; // Redirect to restaurant admin page
    // RestaurantMethods.showMeOnPage(currentRestaurant)


    
  } else {
      // Category name is empty or blank, show an error message
      alert("Category name cannot be empty, try again editing!");
  }

}
function addRestaurantCategory(parentNode){
    // Add category in the selected restaurant

    RestaurantList.restaurants = RestaurantListMethods.loadFromLocalStorage()
    currentRestaurantId = JSON.parse(localStorage.getItem("currRestaurantId"))
    currentRestaurant = RestaurantList.restaurants.find(restaurant => restaurant.id === currentRestaurantId )

    const category =new Object(Category);

    catName = prompt("Enter Category Name: ")
    if (catName && catName.trim() !== "") {
        // Category name is valid, add the category
        alert("Category added successfully!");
        CategoryMethods.setName(category,catName)

        RestaurantMethods.addCategory(currentRestaurant,category)
       
        //save in storage
        RestaurantListMethods.updateLocalStorage(RestaurantList)
    
    } else {
        // Category name is empty or blank, show an error message
        alert("Category name cannot be empty, try again adding!");
    }

}
function editCategory(parentNode){

    // Update category name in the selected restaurant

    RestaurantList.restaurants = RestaurantListMethods.loadFromLocalStorage()
    currentRestaurantId = JSON.parse(localStorage.getItem("currRestaurantId"))
    currentRestaurant = RestaurantList.restaurants.find(restaurant => restaurant.id === currentRestaurantId )

    const categoryId = parseInt(parentNode.querySelector('span.hidden').textContent);
    catName = prompt("Enter Category Name: ")
    if (catName && catName.trim() !== "") {
      // Category name is valid, add the category
      alert("Category edited successfully!");
     
      RestaurantMethods.updateCategory(currentRestaurant,categoryId, catName)
      // save restaurant list
      RestaurantListMethods.updateLocalStorage(RestaurantList)
      //reload
      goToCategoriesPage(currentRestaurantId, true)
      
    } else {
        // Category name is empty or blank, show an error message
        alert("Category name cannot be empty, try again editing!");
    }

}
function deleteRestaurantCategory(parentNode){
    RestaurantList.restaurants = RestaurantListMethods.loadFromLocalStorage()
    currentRestaurantId = JSON.parse(localStorage.getItem("currRestaurantId"))
    currentRestaurant = RestaurantList.restaurants.find(restaurant => restaurant.id === currentRestaurantId )

    // Delete category in the selected restaurant
    const categoryId = parseInt(parentNode.querySelector('span.hidden').textContent);

    RestaurantMethods.deleteCategory(currentRestaurant,categoryId)

    //save
    RestaurantListMethods.updateLocalStorage(RestaurantList)

    //reload
    goToCategoriesPage(currentRestaurantId, true)


}
function addCategoryMenu(parentNode){
    RestaurantList.restaurants = RestaurantListMethods.loadFromLocalStorage()
    currentRestaurantId = JSON.parse(localStorage.getItem("currRestaurantId"))
    currentRestaurant = RestaurantList.restaurants.find(restaurant => restaurant.id === currentRestaurantId )
        
    const currentCategoryId = parseInt(parentNode.querySelector('span.hidden').textContent);
    currentCategory = currentRestaurant.categories.find(category => category.id === currentCategoryId )
    
    // Add menu item in selected category
    menuName = prompt("Enter Menu Name: ")
    menuPrice = prompt("Enter Menu Price: ")
    if ((menuName && menuName.trim() !== "") && (menuPrice && menuPrice.trim() !== "") ) {
        // Menu name and price is valid, add the menu        
        const menuItem =new Object(MenuItem);

        MenuItemMethods.setName(menuItem,menuName)
        MenuItemMethods.setPrice(menuItem,menuPrice)

        CategoryMethods.addMenuItem(currentCategory,menuItem)

        // save
        RestaurantListMethods.updateLocalStorage(RestaurantList)


    } else {
        // Menu name or price is empty or blank, show an error message
        alert("Menu name or price cannot be empty, try again adding!");
    }
    

}
function editMenu(parentNode){
// Update category menu in the selected restaurant
    RestaurantList.restaurants = RestaurantListMethods.loadFromLocalStorage()
    currentRestaurantId = JSON.parse(localStorage.getItem("currRestaurantId"))
    currentRestaurant = RestaurantList.restaurants.find(restaurant => restaurant.id === currentRestaurantId )

    currentCategoryId = JSON.parse(localStorage.getItem("currCategoryId"))
    currentCategory = currentRestaurant.categories.find(category => category.id === currentCategoryId )


    const menuId = parseInt(parentNode.querySelector('span.hidden').textContent);
    menuName = prompt("Enter Menu Name: ")
    menuPrice = prompt("Enter Menu Price: ")
    if ((menuName && menuName.trim() !== "") && (menuPrice && menuPrice.trim() !== "") ) {
        // Menu name and price is valid, edit the menu
        alert("Menu edited successfully!");

        CategoryMethods.updateMenuItem(currentCategory,menuId,menuName,menuPrice)
        //save
        RestaurantListMethods.updateLocalStorage(RestaurantList)

        //reload with new data
        goToMenu(currentCategoryId, true)


    } else {
        // Menu name or price is empty or blank, show an error message
        alert("Menu name or price cannot be empty, try again editing!");
    }

}
function deleteMenu(parentNode){
    RestaurantList.restaurants = RestaurantListMethods.loadFromLocalStorage()
    currentRestaurantId = JSON.parse(localStorage.getItem("currRestaurantId"))
    currentRestaurant = RestaurantList.restaurants.find(restaurant => restaurant.id === currentRestaurantId )

    currentCategoryId = JSON.parse(localStorage.getItem("currCategoryId"))
    currentCategory = currentRestaurant.categories.find(category => category.id === currentCategoryId )

    // Delete menu item from selected category
    const menuId = parseInt(parentNode.querySelector('span.hidden').textContent);
   
    CategoryMethods.deleteMenuItem(currentCategory,menuId)   

    //save
    RestaurantListMethods.updateLocalStorage(RestaurantList)

    //reload
    goToMenu(currentCategoryId, true)

}
// Helpmer methods to reduce code duplicacy
const HTMLHelperMethods = {

  createButton : (text, onClickMethod, btnClrClass) => {
     const button = document.createElement("button");
     button.textContent = text;
     button.classList.add("btn");
     button.classList.add(btnClrClass);
     button.setAttribute("type", "button");
     button.setAttribute("onClick", onClickMethod);
     return button;
 },

  createSpan : (text, className) => {
     const span = document.createElement("span");
     span.textContent = text;
     span.classList.add(className);
     return span;
 },

  createTextElement :(text, tag = "p", className = "card-text") => {
     const element = document.createElement(tag);
     element.textContent = text;
     element.classList.add(className);
     return element;
 },
  
}


// Object for MenuItemMethods
const MenuItemMethods = {
  setName(menuItem, name) {
    menuItem.name = name;
  },
  setPrice(menuItem, price) {
    menuItem.price = price;
  },
  setId(menuItem, id) {
    menuItem.id = id;
  },
  toHTML(menuItem) {
    const cardDiv1 = document.createElement("div");
    cardDiv1.classList.add("card");
    cardDiv1.classList.add("widthHeight");

    const cardDiv2 = document.createElement("div");
    cardDiv2.classList.add("card-body");
    
    const menuName = HTMLHelperMethods.createTextElement(menuItem.name, "h5", "card-title");
   
    const menuDecrip = HTMLHelperMethods.createTextElement(menuItem.price);

    const menuId = HTMLHelperMethods.createSpan(menuItem.id, "hidden");

    
    
    cardDiv2.appendChild(menuName);
    cardDiv2.appendChild(menuDecrip);
    cardDiv2.appendChild(menuId);
    if (localStorage.getItem("userType")==="admin")  
    {// Only Admin can access these buttons
      const editMenuItemBtn = HTMLHelperMethods.createButton("Edit", "editMenu(this.parentNode)","btn-primary");
      cardDiv2.appendChild(editMenuItemBtn);

      const deleteMenuItemBtn = HTMLHelperMethods.createButton("Delete", "deleteMenu(this.parentNode)","btn-danger");
      cardDiv2.appendChild(deleteMenuItemBtn);
    }
    if (localStorage.getItem("userType")==="customer")  
      {// Only Admin can access these buttons
        const addToCartBtn = HTMLHelperMethods.createButton("Add to Cart", "addToCart(this.parentNode)","btn-primary");
        cardDiv2.appendChild(addToCartBtn);
        
        const cartButton = document.getElementById("cartButton");
        cartButton.style.display="block"

      }


    cardDiv1.appendChild(cardDiv2);

    return cardDiv1;
  }
};
const MenuItem = {
  id: 0,
  name: "",
  price: 0,
};

const CategoryMethods = {
  setName(category, name) {
    category.name = name;
  },
  setId(category, id) {
    category.id = id;
  },
  addMenuItem(category, item) {
    MenuItemMethods.setId(item,this.getNewIdForMenu(category))
    if (!this.menuExists(category.menuItems, item.name)) {
      
      category.menuItems.push(item);

     //update
      alert("Menu Added successfuly!");

    } else {
      alert("Menu already exists!");
    }
  },menuExists(menuItems, menuName){
     return menuItems.some(menu => menu.name === menuName);
  }
  ,
  getNewIdForMenu(category) {
    return category.menuItems.length;
  },
  deleteMenuItem(category, index) {
    if (index >= 0 && index < category.menuItems.length) {
      category.menuItems.splice(index, 1);
    } else {
      console.log("Invalid index");
    }
  },
  updateMenuItem(category, index, newName, newPrice) {
    if (index >= 0 && index < category.menuItems.length) {
      const menuItem = category.menuItems[index];
      MenuItemMethods.setName(menuItem,newName);
      MenuItemMethods.setPrice(menuItem,newPrice);
    } else {
      console.log("Invalid index");
    }
  },
  getMenuItemsList(category) {
    const menuItemsList = document.querySelector(".menu_div");
    category.menuItems.forEach((item) => {
      menuItemsList.appendChild(MenuItemMethods.toHTML(item));
      // menuItemsList.appendChild(item.toHTML());
    });
    return menuItemsList;
  },
  toHTML(category) {
    const cardDiv1 = document.createElement("div");
    cardDiv1.classList.add("card");
    cardDiv1.classList.add("widthHeight");
    const cardDiv2 = document.createElement("div");
    cardDiv2.classList.add("card-body");
    
    const categoryName = HTMLHelperMethods.createTextElement(category.name, "h5", "card-title");
    
    const categoryDecrip = HTMLHelperMethods.createTextElement("Category Description Here");
    
    const categoryId = HTMLHelperMethods.createSpan(category.id, "hidden");
    
    const seeMenuItemsBtn = HTMLHelperMethods.createButton("See menu items", "goToMenu(this.parentNode)", "btn-primary");


    cardDiv2.appendChild(categoryName);
    cardDiv2.appendChild(categoryDecrip);
    cardDiv2.appendChild(categoryId);
    cardDiv2.appendChild(seeMenuItemsBtn);

    if (localStorage.getItem("userType")==="admin")  
    {// Only Admin can access these buttons
      const AddMenuItemBtn = HTMLHelperMethods.createButton("Add menu item", "addCategoryMenu(this.parentNode)", "btn-primary");
      cardDiv2.appendChild(AddMenuItemBtn);

      const editBtn = HTMLHelperMethods.createButton("Edit", "editCategory(this.parentNode)","btn-primary");
      cardDiv2.appendChild(editBtn);

      const deleteBtn = HTMLHelperMethods.createButton("Delete", "deleteRestaurantCategory(this.parentNode)","btn-danger");
      cardDiv2.appendChild(deleteBtn);

    }


    cardDiv1.appendChild(cardDiv2);

    return cardDiv1;
  }
};

// Object for Category
const Category = {
  id: 0,
  name: "",
  menuItems: []
};



const RestaurantMethods = {
  setName(restaurant, name) {
    restaurant.name = name;
  },
  setId(restaurant, id) {
    restaurant.id = id;
  },
  addCategory(restaurant, category) {
    CategoryMethods.setId(category, this.getNewIdForCategory(restaurant))
    restaurant.categories.push(category);
  },
  getNewIdForCategory(restaurant) {
    return restaurant.categories.length;
  },
  deleteCategory(restaurant, index) {
    if (index >= 0 && index < restaurant.categories.length) {
      restaurant.categories.splice(index, 1);
    } else {
      console.log("Invalid index");
    }
  },
  updateCategory(restaurant, index, newName) {
    if (index >= 0 && index < restaurant.categories.length) {
      const category = restaurant.categories[index];
      CategoryMethods.setName(category,newName)
    } else {
      console.log("Invalid index");
    }
  },
  getCategoriesList(restaurant) {
    const categoryList = document.querySelector(".category_div");
    restaurant.categories.forEach((category) => {
      categoryList.appendChild(CategoryMethods.toHTML(category));
    });
    return categoryList;
  },
  toHTML(restaurant) {
    const cardDiv1 = document.createElement("div");
    cardDiv1.classList.add("card");
    cardDiv1.classList.add("widthHeight");
    const cardDiv2 = document.createElement("div");
    cardDiv2.classList.add("card-body");
    
    const restaurantName = HTMLHelperMethods.createTextElement(restaurant.name, "h5", "card-title");
    
    const restaurantDecrip = HTMLHelperMethods.createTextElement("Restaurant Description Here");
    
    const restaurantId = HTMLHelperMethods.createSpan(restaurant.id, "hidden");
    
    const seeCategoriesBtn = HTMLHelperMethods.createButton("See Categories", "goToCategoriesPage(this.parentNode)", "btn-primary");

    cardDiv2.appendChild(restaurantName);
    cardDiv2.appendChild(restaurantDecrip);
    cardDiv2.appendChild(restaurantId);
    cardDiv2.appendChild(seeCategoriesBtn);

    if (localStorage.getItem("userType")==="admin")  
    {// Only Admin can access these buttons
      const editBtn = HTMLHelperMethods.createButton("Edit", "editRestaurant(this.parentNode)","btn-primary");
      cardDiv2.appendChild(editBtn);

      // const deleteBtn = HTMLHelperMethods.createButton("Delete", "deleteRestaurant(this.parentNode)","btn-danger");
      // cardDiv2.appendChild(deleteBtn);
    }

    cardDiv1.appendChild(cardDiv2);

    return cardDiv1;
  },
  showMeOnPage(restaurant) {
    const restaurantDiv = document.querySelector(".restaurant_div");
    
    const cardDiv1 = document.createElement("div");
    cardDiv1.classList.add("card");
    cardDiv1.classList.add("widthHeight");
    const cardDiv2 = document.createElement("div");
    cardDiv2.classList.add("card-body");
    
    const restaurantName = HTMLHelperMethods.createTextElement(restaurant.name, "h5", "card-title");
    
    const restaurantDecrip = HTMLHelperMethods.createTextElement("Restaurant Description Here");
    
    const restaurantId = HTMLHelperMethods.createSpan(restaurant.id, "hidden");
    
    // const editBtn = HTMLHelperMethods.createButton("Edit", "editRestaurant(this.parentNode)","btn-primary");

    // const deleteBtn = HTMLHelperMethods.createButton("Delete", "deleteRestaurant(this.parentNode)","btn-danger");

    const seeCategoriesBtn = HTMLHelperMethods.createButton("See Categories", "goToCategoriesPage(this.parentNode)", "btn-primary");
    
    cardDiv2.appendChild(restaurantName);
    cardDiv2.appendChild(restaurantDecrip);
    cardDiv2.appendChild(restaurantId);
    cardDiv2.appendChild(seeCategoriesBtn);

    if (localStorage.getItem("userType")==="admin")  
      {// Only Admin can access these buttons
        const addCategoryBtn = HTMLHelperMethods.createButton("Add Category", "addRestaurantCategory(this.parentNode)", "btn-primary");
        cardDiv2.appendChild(addCategoryBtn);

        const editBtn = HTMLHelperMethods.createButton("Edit", "editRestaurant(this.parentNode)","btn-primary");
        cardDiv2.appendChild(editBtn);
  
        // const deleteBtn = HTMLHelperMethods.createButton("Delete", "deleteRestaurant(this.parentNode)","btn-danger");
        // cardDiv2.appendChild(deleteBtn);

      }
    
    cardDiv1.appendChild(cardDiv2);
    
    restaurantDiv.appendChild(cardDiv1);
  }
};

// Object for Restaurant
const Restaurant = {
  id: 0,
  name: "",
  categories: []
};


const RestaurantListMethods = {
  addRestaurant(restaurantList, restaurant) {
    RestaurantMethods.setId(restaurant, this.getNewIdForRestaurant(restaurantList))
    restaurantList.restaurants = this.loadFromLocalStorage();
    if (!this.restaurantExists(restaurantList.restaurants, restaurant.name)) {

      restaurantList.restaurants.push(restaurant);
      

      this.updateLocalStorage(restaurantList);

      alert("Restaurant Added successfuly!");

    } else {
      alert("Restaurant already exists!");
    }

  },
  restaurantExists(restaurants,name){
    return restaurants.some(restaurant => restaurant.name === name);
    
    
  },
  getNewIdForRestaurant(restaurantList) {
    return restaurantList.restaurants.length;
  },
  getRestaurantsList(restaurantList) {
    const restaurantListDiv = document.querySelector(".restaurants_div");
    // we can first load from the storage here
      restaurantList.restaurants = this.loadFromLocalStorage();
      restaurantList.restaurants.forEach(restaurant => {
      restaurantListDiv.appendChild(RestaurantMethods.toHTML(restaurant));
    });
    return restaurantListDiv;
  },
  updateRestaurant(index, newName) {
    RestaurantList.restaurants = JSON.parse(localStorage.getItem("restaurants"))
    if (index >= 0 && index < RestaurantList.restaurants.length) {
      const restaurant = RestaurantList.restaurants[index];
      restaurant.name = newName
    } else {
      console.log("Invalid index");
    }
    this.updateLocalStorage(RestaurantList)
  },
  updateLocalStorage(restaurantList) {
    localStorage.setItem("restaurants", JSON.stringify(restaurantList.restaurants));
  },
  loadFromLocalStorage() {
    const savedRestaurants = JSON.parse(localStorage.getItem("restaurants"));
    if (savedRestaurants) {
      // restaurantList.restaurants = savedRestaurants;
      return savedRestaurants;
    }else {
      
        return [];
    }
  }
};


// Object for RestaurantList
const RestaurantList = {
  restaurants: RestaurantListMethods.loadFromLocalStorage(),
};



function goToMenu(parentNode,isReload){
            
            // to get the categoryId from category card, which will be used to select menu from menu list and show menu list after selecting 
            categoryId = 0 ;
            if (!isReload) {
               categoryId = parseInt(parentNode.querySelector('span.hidden').textContent);
            }else  categoryId = JSON.parse(localStorage.getItem("currCategoryId"))

            RestaurantList.restaurants = RestaurantListMethods.loadFromLocalStorage()

            currentRestaurantId = JSON.parse(localStorage.getItem("currRestaurantId"))
            currentRestaurant = RestaurantList.restaurants.find(restaurant => restaurant.id === currentRestaurantId )

            currentCategory = currentRestaurant.categories[categoryId]

            localStorage.setItem("currCategory",JSON.stringify(currentCategory))
            localStorage.setItem("currCategoryId",categoryId)
                       
            window.location.assign('/menu.html?fromPage=categories.html');

            
        }

window.onload = function() {
          const urlParams = new URLSearchParams(window.location.search);
          const fromPage = urlParams.get('fromPage');
          //for showing menu items
         if (window.location.pathname.includes("menu.html") && fromPage === "categories.html") {

              currentCategory = JSON.parse(localStorage.getItem("currCategory"))
              CategoryMethods.getMenuItemsList(currentCategory)
             
          }
          
          // for showing category items
          else if (window.location.pathname.includes("categories.html") && fromPage === "restaurants.html") {
              // Check if the current page is categories.html and from restaurant.html
              currentRestaurant = JSON.parse(localStorage.getItem("currRestaurant"))
              RestaurantMethods.getCategoriesList(currentRestaurant)
              
          }
          else if (window.location.pathname.includes("restaurants.html") && fromPage === "customer_auth.html") {
              // Check if the current page is categories.html and from restaurant.html
              RestaurantList.restaurants = RestaurantListMethods.loadFromLocalStorage()
              RestaurantListMethods.getRestaurantsList(RestaurantList)
              
          }
          else if (window.location.pathname.includes("restaurant_admin.html") && fromPage === "admin_auth.html") {
              // Check if the current page is categories.html and from restaurant.html
              
              currentRestaurant = JSON.parse(localStorage.getItem("currRestaurant"))
              RestaurantMethods.showMeOnPage(currentRestaurant)
              
          }
        };
        
function goToCategoriesPage(parentNode, isReload){
            // to get the restaurantId from restaurant card, which will be used to select category from category list and show menu after selecting category
            RestaurantList.restaurants = RestaurantListMethods.loadFromLocalStorage()
            restaurantId = 0;
            if(!isReload) {restaurantId = parseInt(parentNode.querySelector('span.hidden').textContent);}
            else restaurantId =  JSON.parse(localStorage.getItem("currRestaurantId"))
         
            currentRestaurant = RestaurantList.restaurants.find(restaurant => restaurant.id === restaurantId )
            
            localStorage.setItem("currRestaurant",JSON.stringify(currentRestaurant))
            localStorage.setItem("currRestaurantId",JSON.stringify(restaurantId))
           
            window.location.assign('/categories.html?fromPage=restaurants.html');

                        
        }

function goToRestaurantsPage(parentNode){
            // to get the restaurantId from restaurant card, which will be used to select category from category list and show menu after selecting category
            // const restaurantId = parseInt(parentNode.querySelector('span.hidden').textContent);
            // currentRestaurant = restaurantList.restaurants[restaurantId];
           
            location.href='/restaurants.html'
            RestaurantList.restaurants = RestaurantListMethods.loadFromLocalStorage();
            RestaurantList.restaurants.getRestrauntsList()
            
              
}

function addRestaurant(restName){
  // to get the restaurantId from restaurant card, which will be used to select category from category list and show menu after selecting category
  
  var restaurant =new Object(Restaurant);
  // restaurant.name = restName;
  RestaurantMethods.setName(restaurant,restName)
  
  RestaurantListMethods.addRestaurant(RestaurantList, restaurant)
  // console.log(restaurant.id)
  
  return restaurant.id;

    
}

function showMenuItems(){
  
  currentCategory = JSON.parse(localStorage.getItem("currCategory"))


  CategoryMethods.getMenuItemsList(currentCategory)
// currentCategory.getMenuItemsList()

}
// function getCurrentRestaurant(){
//   RestaurantList.restaurants = RestaurantListMethods.loadFromLocalStorage()
//   currentRestaurantId = JSON.parse(localStorage.getItem("currRestaurantId"))
//   return
// }

