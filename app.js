const slides = document.querySelectorAll(".slide");
const carousel = document.querySelectorAll(".carousel");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const carouselRight = document.querySelector(".carousel-btn-right");
const carouselLeft = document.querySelector(".carousel-btn-left");
const dotContainer = document.querySelector(".dots");
const thumbnail = document.querySelector(".thumbnail");

let curSlide = 0;
const maxSlide = slides.length - 1;

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
  carousel.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

goToSlide(0);
// CREATE IMAGE THUMBNAIL
const createDot = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="dot-img-box">
      <img
        class="dots-dots"
        src="images/image-product-${i + 1}-thumbnail.jpg"
        alt="Image Product 1 image-product-${i + 1}-thumbnail"
        data-slide="${i}"
      />
    </div>
    `
    );
  });

  carousel.forEach(function (_, i) {
    thumbnail.insertAdjacentHTML(
      "beforeend",
      `
      <div class="dot-img-box">
      <img
        class="dots-dots"
        src="images/image-product-${i + 1}-thumbnail.jpg"
        alt="Image Product 1 image-product-${i + 1}-thumbnail"
        data-slide="${i}"
      />
    </div>
    `
    );
  });
};

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots-dots")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
thumbnail.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots-dots")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

const activateDot = function (slide) {
  document.querySelectorAll(".dots-dots").forEach((dot) => {
    dot.classList.remove("dot-active");
  });

  const dott = document.querySelector(`.dots-dots[data-slide="${slide}"]`);

  dott.classList.add(`dot-active`);
};

createDot();

const nextSlide = function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
  console.log(curSlide);
};
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
  console.log(curSlide);
};

btnRight.addEventListener("click", nextSlide);
carouselRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
carouselLeft.addEventListener("click", prevSlide);

// UI VARIABLES
const toggleBtn = document.querySelector(".btn-mobile-nav");
const iconClose = document.querySelector(".icon-close");
const header = document.querySelector(".header");

const btnCheckOut = document.querySelector(".checkout");
const btnAddToCart = document.querySelector(".add--cart");
const btnCart = document.querySelector(".cart");

// MOBILE NAV
toggleBtn.addEventListener("click", function () {
  header.classList.add("nav-open");
});
iconClose.addEventListener("click", function () {
  header.classList.remove("nav-open");
  console.log("click");
});

const totalAdd = document.querySelector(".info__total__add"); // span with 0
const totalCart = document.querySelector(".cart-item");
const btnCheckout = document.querySelector(".container__cart__button");

// console.log(btnCart);
const cartContainer = document.querySelector(".container__cart");

const containerCartInfo = document.querySelector(".container__cart__info");

btnCart.addEventListener("click", () => {
  // console.log("click");
  cartContainer.classList.toggle("container__cart--active");
});

// BUTTON DECREMENT

const btnDecrement = document.getElementById("decrement");

btnDecrement.addEventListener("click", () => decrement());

// BUTTON INCREMENT

const btnIncrement = document.getElementById("increment");

btnIncrement.addEventListener("click", () => increment());

// BUTTON ADD TO CART

btnAddToCart.addEventListener("click", () => {
  totalCart.innerHTML = totalAdd.innerHTML;
  totalCart.innerHTML > 0
    ? totalCart.classList.add("cart-item--active")
    : totalCart.classList.remove("cart-item--active");

  let goods = totalAdd.innerHTML;

  if (goods === 0) return;

  const html = `
  <div class="container__cart__info__img">
  <img src="images/image-product-1.jpg" alt="Image product">
</div>
<div class="container__cart__info__price">
  <p class="p">Fall Limited Edition Sneakers</p>
  <p class="price-cart">$125.00 x ${goods} <span>$${calculate(goods)}</span></p>
</div>
<div class="container__cart__info__delete">
  <img src="images/icon-delete.svg" alt="delete" id="btnDelete">
</div>
    
    `;

  containerCartInfo.innerHTML = html;
  btnCheckOut.classList.remove("hidden");

  const btnDelete = document.getElementById("btnDelete");
  btnDelete.addEventListener("click", () => {
    deleteProducts();
    btnCheckout.classList.add("hidden");
    totalCart.innerHTML = "0";
    totalCart.classList.remove("cart-item--active");
  });
});
function deleteProducts() {
  return (containerCartInfo.innerHTML = `<p>Your cart is empty</p>`);
}
function decrement() {
  let item;
  item = totalAdd.innerHTML;

  if (item === "0") return;
  item--;

  totalAdd.innerHTML = `${item}`;
}

function increment() {
  let item;

  item = totalAdd.innerHTML;
  if (item === "99") return;
  item++;
  totalAdd.innerHTML = `${item}`;
}

function calculate(num) {
  let price = 125;
  return price * num;
}

// ////////////////////////////
// MODAL CLASS///////////////////

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");

function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

slides.forEach((tab) => {
  tab.addEventListener("click", openModal);
});
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
