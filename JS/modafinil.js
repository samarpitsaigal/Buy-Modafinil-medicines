const modafinilContainer = document.getElementById("modafinilContainer");

const modafinilProducts = products.filter((p) => p.category === "Modafinil");

function renderModafinilProducts() {
  modafinilContainer.innerHTML = "";

  modafinilProducts.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const stars = "★".repeat(p.rating || 5);
    const customers = p.customers ? `${p.customers} HAPPY CUSTOMERS` : "";

    card.innerHTML = `
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}">
      </div>

      <div class="rating">
        ${stars}
        <span>${customers}</span>
      </div>

      <h3>${p.name}</h3>

      <div class="price">${p.price}</div>

      <p>${p.description}</p>

      <a href="#" class="read-more">Read more &gt;&gt;</a>

      <button class="buy-btn">Buy Now</button>
    `;

    const buyBtn = card.querySelector(".buy-btn");
    buyBtn.addEventListener("click", () => {
      addToCart(p);
      window.location.href = "cart.html";
    });

    modafinilContainer.appendChild(card);
  });
}

renderModafinilProducts();