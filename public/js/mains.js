

// for cart 
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
let homeheader = document.querySelector(".header");

cartIcon.onclick = () => {
  cart.classList.add("active");
};

closeCart.onclick = () => {
  cart.classList.remove("active");
}



// Cart working js

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);

} else {
  start();

}

// making function
function start() {
  // load cart items from sessionStorage
  let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
  // let cartTotal 

  // render cart items
  renderCartItems(cartItems);
  renderCount(cartItems);

  addEvents();
}




// fuction addEvents
function addEvents() {
  // remove items from cart
  let cartRemove_btns = document.querySelectorAll(".cart-remove");
  console.log(cartRemove_btns);
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });
  // change item quantity 
  let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
  cartQuantity_inputs.forEach(input => {
    input.addEventListener("change", handle_changeItemQuantity);
  });

  // Add item to cart

  let addCart_btns = document.querySelectorAll(".add-cart");
  addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
    console.log("product is added")
  });

  // Buy Order
  const buy_btn = document.querySelector(".btn-buy");
  buy_btn.addEventListener("click", handle_buyOrder);

}

// handle events functions
let itemsAdded = []


function handle_addCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgSrc = product.querySelector(".product-img").src;
  // let quantity = product.querySelector(".cart-quantity").innerHTML;

  console.log(title, price, imgSrc);

  let newToAdd = {
    title,
    price,
    imgSrc,
    // quantity,
  };
  console.log(newToAdd);

  // handle item is already exist
  // if(itemsAdded.find(el => el.title == newToAdd.title)){
  //   alert("This item is already exsit!!");
  //   return;
  // } else{
  //   itemsAdded.push(newToAdd);
  // }
  // console.log(itemsAdded);


  // handle item is already exist
  let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
  let existingItem = cartItems.find((item) => item.title === newToAdd.title);
  if (existingItem) {
    alert("This item is already in the cart!!");
    return;
  } else {
    cartItems.push(newToAdd);
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems)); // store cart items in sessionStorage
  }
  

  // Add product to cart
  let cartBoxElement = CartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);
  sessionStorage.getItem('shop-product',);

  update();
}


// function handle_removeCartItem(){
//   this.parentElement.remove();
//   itemsAdded = itemsAdded.filter(
//     (el) => 
//       el.title !=
//       this.parentElement.querySelector('.cart-product-title').innerHTML 
//     );

//     update();
// }

function handle_removeCartItem() {
  let cartItem = this.parentElement;
  let title = cartItem.querySelector('.cart-product-title').innerHTML;

  // remove item from cartItems
  let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
  cartItems = cartItems.filter((item) => item.title !== title);
  sessionStorage.setItem('cartItems', JSON.stringify(cartItems)); // update sessionStorage
  cartItem.remove();
  update();
  return redirect(url_for('foo'))

}


// to render the cart items from sessionStorage
function renderCartItems(cartItems,) {
  let cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = '';
  cartItems.forEach(item => {
    cartContent.innerHTML += CartBoxComponent(item.title, item.price, item.imgSrc);
  });
  let count = cartItems.length || 0;

  let cartContentxx = homeheader.querySelector(".counter");
  cartContentxx.innerHTML = cartcount(count);
  updateTotal();
  updateCount();

}
function renderCount(cartItems,) {
  let count = cartItems.length || 0;

  let cartContentxx = homeheader.querySelector(".counter");
  cartContentxx.innerHTML = cartcount(count);
  updateTotal();

}
//   Update 

function update() {
  addEvents();
  updateTotal();
  updateCount();
}


function updateCount(){
  let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
  renderCount(cartItems);
}

function handle_changeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value);

 
  

  update();
}

function handle_buyOrder() {
  var itemsAdded = JSON.parse(sessionStorage.getItem('cartItems')) || [];
  if (itemsAdded.length==[]) {
    alert("There Is No Order To Place Yet! \n Please Make an Order First.");
    return;
  } else{
    var modal = document.getElementById("myModalxey");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtnxey");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("closexey")[0];

    // When the user clicks on the button, open the modal
    // btn.onclick = function() {
    modal.style.display = "block";
    // }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
  }

  
}



// update functions
function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });

  total = total.toFixed(2);
  totalElement.innerHTML = "$" + total;


}


// HTML Components 
function CartBoxComponent(title, price, imgSrc) {
  return `
      <div class="cart-box ">
        <img src="${imgSrc}" alt="" class="cart-img">
        <div class="detail-box">
          <div class="cart-product-title">${title}</div>
          <div class="cart-price">${price}</div>
          <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>
      </div>
    `;
}

function cartcount(count){
  console.log("yetataaaa scu ma amatifhi");
  console.log(count);
  return `
    <span class="badge badge-warning" id="lblCartCount"> ${count}</span>
    `;
}


