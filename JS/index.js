// =================================================
// PRODUCTS SLIDER
// =================================================

const productTrack = document.getElementById("productsTrack");
const productPrevBtn = document.getElementById("prevBtn");
const productNextBtn = document.getElementById("nextBtn");
const modafinilProducts = products.filter((p) => p.category === "Modafinil");

function renderProducts() {
  productTrack.innerHTML = "";

  modafinilProducts.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-card-inner">
        <div class="product-img">
          <img src="${p.image}" alt="${p.name}">
        </div>

        <h3 class="product-name">${p.name}</h3>

        <div class="stars">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>

        <div class="product-price">
          ${p.oldPrice ? `<span class="price-old">${p.oldPrice}</span>` : ""}
          <span class="price-now">${p.price}</span>
        </div>

        <button class="buy-btn">Buy Now</button>
      </div>
    `;

    const buyBtn = card.querySelector(".buy-btn");
    buyBtn.addEventListener("click", () => {
      window.location.href = `HTML/productDetails.html?id=${p.id}`;
    });

    productTrack.appendChild(card);
  });
}

function getProductVisibleCount() {
  if (window.innerWidth <= 480) return 1;
  if (window.innerWidth <= 900) return 2;
  return 4;
}

let productSlideIndex = 0;
let productMaxSlide = 0;

function updateProductSlide() {
  const visible = getProductVisibleCount();
  productMaxSlide = Math.max(0, modafinilProducts.length - visible);

  if (productSlideIndex > productMaxSlide) productSlideIndex = productMaxSlide;

  const step = 100 / visible;
  productTrack.style.transform = `translateX(-${productSlideIndex * step}%)`;

  productPrevBtn.disabled = productSlideIndex === 0;
  productNextBtn.disabled = productSlideIndex === productMaxSlide;
}

productPrevBtn.addEventListener("click", () => {
  if (productSlideIndex > 0) {
    productSlideIndex--;
    updateProductSlide();
  }
});

productNextBtn.addEventListener("click", () => {
  if (productSlideIndex < productMaxSlide) {
    productSlideIndex++;
    updateProductSlide();
  }
});


// =================================================
// REVIEWS DATA
// =================================================

  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {

    question.addEventListener("click", () => {

      const faqItem = question.closest(".faq-item");
      const icon = question.querySelector(".icon");

      faqItem.classList.toggle("closed");

      if (faqItem.classList.contains("closed")) {
        icon.textContent = "+";
      } else {
        icon.textContent = "−";
      }

    });

  });


const reviews = [
  {
    id: 1,
    title: "Genuine 5 Star Service",
    text: "Had zero issues – I was as expected worried at first BUT everything went so smoothly.",
    author: "Janine B - Melb, VIC",
  },
  {
    id: 2,
    title: "SPEEDY delivery 🚚🚚🚚🚚",
    text: "Was impressed from initial email inquiry to received my product. Trust is key when ordering Modafinil online and Steve and his team made me at ease the whole time",
    author: "Tiffany B - Fortitude Valley, Qld",
  },
  {
    id: 3,
    title: "Modalert is it!!",
    text: "Kept crashing at work and couldn’t focus for long periods and Modalert tablets did the job – you can trust these guys – they are quick to respond and on top of their game.",
    author: "Harry N - Port Douglas, Qld",
  },
  {
    id: 4,
    title: "Easy Ordering Process",
    text: "Placed my order and within minutes I had a confirmation email. The whole process was simple, and I was kept updated the entire way.",
    author: "Sarah T - Sydney, NSW",
  },
  {
    id: 5,
    title: "Fast & Reliable Delivery",
    text: "Arrived in just a few days, well packaged and exactly what I ordered. Could not ask for a smoother experience.",
    author: "Michael R - Brisbane, Qld",
  },
  {
    id: 6,
    title: "Genuine Product, Great Value",
    text: "Quality is exactly as advertised and the price is hard to beat. Will definitely be ordering again.",
    author: "Emma L - Perth, WA",
  },
  {
    id: 7,
    title: "Highly Recommended",
    text: "Great communication from start to finish. The team is helpful, responsive and genuinely cares about their customers.",
    author: "Daniel K - Adelaide, SA",
  },
  {
    id: 8,
    title: "Excellent Customer Support",
    text: "Had a couple of questions before ordering and the support team sorted everything out quickly. Top service all round.",
    author: "Lucy M - Hobart, TAS",
  },
];


// =================================================
// REVIEWS SLIDER
// =================================================

const reviewTrack = document.getElementById("reviewsTrack");
const reviewPrevBtn = document.getElementById("reviewPrevBtn");
const reviewNextBtn = document.getElementById("reviewNextBtn");

function renderReviews() {
  reviewTrack.innerHTML = "";

  reviews.forEach((r) => {
    const slot = document.createElement("div");
    slot.className = "review-slot";

    slot.innerHTML = `
      <div class="review-card">
        <h3>${r.title}</h3>

        <div class="stars">
          ★★★★★
        </div>

        <p>${r.text}</p>

        <h4>${r.author}</h4>
      </div>
    `;

    reviewTrack.appendChild(slot);
  });
}

function getReviewVisibleCount() {
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 1100) return 2;
  return 3;
}

let reviewSlideIndex = 0;
let reviewMaxSlide = 0;

function updateReviewSlide() {
  const visible = getReviewVisibleCount();
  reviewMaxSlide = Math.max(0, reviews.length - visible);

  if (reviewSlideIndex > reviewMaxSlide) reviewSlideIndex = reviewMaxSlide;

  const step = 100 / visible;
  reviewTrack.style.transform = `translateX(-${reviewSlideIndex * step}%)`;

  reviewPrevBtn.disabled = reviewSlideIndex === 0;
  reviewNextBtn.disabled = reviewSlideIndex === reviewMaxSlide;
}

reviewPrevBtn.addEventListener("click", () => {
  if (reviewSlideIndex > 0) {
    reviewSlideIndex--;
    updateReviewSlide();
  }
});

reviewNextBtn.addEventListener("click", () => {
  if (reviewSlideIndex < reviewMaxSlide) {
    reviewSlideIndex++;
    updateReviewSlide();
  }
});


// =================================================
// INIT
// =================================================

window.addEventListener("resize", () => {
  updateProductSlide();
  updateReviewSlide();
});

renderProducts();
updateProductSlide();

renderReviews();
updateReviewSlide();
