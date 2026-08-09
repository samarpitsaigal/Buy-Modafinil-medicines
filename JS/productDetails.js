const detailsContainer = document.getElementById("productDetailsContainer");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const product = products.find((p) => String(p.id) === String(productId));

if (!product) {
  detailsContainer.innerHTML = `
    <div class="not-found">
      <h2>Product not found</h2>
      <a href="modafinil.html">&larr; Back to Shop</a>
    </div>
  `;
} else {
  const image = product.image || product.img;
  const stars = "★".repeat(product.rating || 5);
  const pricing = product.pricing || [{ label: "Standard", price: product.price }];

  const pricingRows = pricing
    .map(
      (tier) => `
        <tr>
          <td>${tier.label}</td>
          <td>${tier.price}</td>
        </tr>
      `
    )
    .join("");

  detailsContainer.innerHTML = `
    <div class="product-image">
      <img src="${image}" alt="${product.name}">
    </div>

    <div class="product-info">
      <h1>${product.name}</h1>

      <div class="rating">
        ${stars}
        <span>${product.customers ? product.customers + " HAPPY CUSTOMERS" : ""}</span>
      </div>

      ${product.manufacturer ? `<p class="manufacturer">Manufacturer: ${product.manufacturer}</p>` : ""}

      ${product.description ? `<p class="description">${product.description}</p>` : ""}

      <div class="price">
        ${product.price}
        ${product.oldPrice ? `<span class="old-price">${product.oldPrice}</span>` : ""}
      </div>
    </div>

    <div class="pricing-section">
      <h2>Pricing</h2>

      <table class="pricing-table">
        <thead>
          <tr>
            <th>Pack</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${pricingRows}
        </tbody>
      </table>

      <button class="buy-btn">Buy Now</button>
    </div>
  `;

  const buyBtn = detailsContainer.querySelector(".buy-btn");
  buyBtn.addEventListener("click", () => {
    addToCart(product);
    window.location.href = "cart.html";
  });
}
