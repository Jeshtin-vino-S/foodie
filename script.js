// menu-bar //
const navBar = document.querySelector(".navbar");
const menuBar = document.querySelector(".menubar");
const closeBtn = document.querySelector(".closebtn");

menuBar.addEventListener("click", () => {
  navBar.style.right = "0";
});
closeBtn.addEventListener("click", () => {
  navBar.style.right = "-250px";
});

// email //
const form = document.querySelector("form");
const email = document.querySelector(".email");
const btnEl = document.querySelector(".submit");
const error = document.querySelector(".error");

btnEl.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateInputs()) {
    form.reset();
  }
});

const validateInputs = () => {
  const emailVal = email.value.trim();
  let isValid = true;
  if (emailVal === "") {
    error.innerText = "Email is required";
    isValid = false;
  } else if (!emailFormat(emailVal)) {
    error.innerText = "Invalid email format";
    isValid = false;
  } else {
    error.innerText = "";
  }
  return isValid;
};

const emailFormat = (emailVal) => {
  return String(emailVal)
    .toLocaleLowerCase()
    .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
};

// Cart Open/Close //
const cart = document.querySelector(".cart-container");
const cartBar = document.querySelector(".fa-cart-arrow-down");
const cartClose = document.querySelector(".cartclose");

cartBar.addEventListener("click", () => {
  cart.style.right = "0";
});
cartClose.addEventListener("click", (e) => {
  e.preventDefault();
  cart.style.right = "-300px";
});

// CART FUNCTIONALITY //

let cartItems = {};

// Cart
document.querySelectorAll(".cart-dish").forEach((el) => el.remove());

const cartItemCountEl = document.querySelector(".cart-item");
const cartTotalEl = document.querySelector(".cart-footer p");
const cartFooter = document.querySelector(".cart-footer");

function updateCartUI() {
  document.querySelectorAll(".cart-dish").forEach((el) => el.remove());

  let total = 0;
  let totalCount = 0;

  Object.entries(cartItems).forEach(([name, data]) => {
    const itemTotal = data.price * data.count;
    total += itemTotal;
    totalCount += data.count;

    const dish = document.createElement("div");
    dish.classList.add("cart-dish");
    dish.dataset.name = name;
    dish.innerHTML = `
      <div class="img-cont">
        <img src="${data.imgSrc}" style="width:100%" />
      </div>
      <div class="item-amt">
        <h4>${name}</h4>
        <p>$${itemTotal.toFixed(2)}</p>
      </div>
      <div class="cart-count">
        <i class="fa-solid fa-circle-minus" onclick="changeCount('${name}', -1)"></i>
        <h5>${data.count}</h5>
        <i class="fa-solid fa-circle-plus" onclick="changeCount('${name}', 1)"></i>
      </div>
    `;

    cart.insertBefore(dish, cartFooter);
  });

  cartItemCountEl.textContent = totalCount;
  cartTotalEl.textContent = `Total: $${total.toFixed(2)}`;
}

function changeCount(name, delta) {
  if (!cartItems[name]) return;
  cartItems[name].count += delta;
  if (cartItems[name].count <= 0) {
    delete cartItems[name];
  }
  updateCartUI();
}

// Menu items
document.querySelectorAll(".menu-item").forEach((item) => {
  const btn = item.querySelector("a");
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = item.querySelector("h4").textContent;
    const priceText = item.querySelector("span h5").textContent; // "$9.67"
    const price = parseFloat(priceText.replace("$", ""));
    const imgSrc = item.querySelector("img").src;

    if (cartItems[name]) {
      cartItems[name].count += 1;
    } else {
      cartItems[name] = { price, count: 1, imgSrc };
    }

    updateCartUI();
  });
});
