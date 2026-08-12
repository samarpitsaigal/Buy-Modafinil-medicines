
function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch (err) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product, qty = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.qty += qty;
  } else {
    const unitPrice =
      product.pricing && product.pricing[0]
        ? product.pricing[0].price
        : product.price;

    cart.push({
      id: product.id,
      name: product.name,
      image: product.image || product.img,
      unitPrice: unitPrice,
      qty: qty,
    });
  }

  saveCart(cart);
}

function removeFromCart(id) {
  saveCart(getCart().filter((item) => item.id !== id));
}

function updateCartQty(id, qty) {
  const cart = getCart();
  const item = cart.find((item) => item.id === id);
  if (item) {
    item.qty = Math.max(1, qty);
    saveCart(cart);
  }
}

function clearCart() {
  localStorage.removeItem("cart");
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function parsePrice(value) {
  const num = parseFloat(String(value).replace(/[^0-9.]/g, ""));
  return isNaN(num) ? 0 : num;
}

function formatPrice(num) {
  return (
    "$" +
    num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

function getCartSubtotal() {
  return getCart().reduce(
    (sum, item) => sum + parsePrice(item.unitPrice) * item.qty,
    0
  );
}

const cartItems = document.getElementById("cartItems");

function renderCart() {
  const cart = getCart();

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-cart-shopping"></i>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <a href="modafinil.html" class="continue-btn">Continue Shopping</a>
      </div>
    `;
    updateCartSummary(0);
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-row" data-id="${item.id}">
          <div class="cart-row-img">
            <img src="${item.image}" alt="${item.name}">
          </div>

          <div class="cart-row-info">
            <h3>${item.name}</h3>
            <p class="cart-row-price">${formatPrice(parsePrice(item.unitPrice))}</p>
          </div>

          <div class="qty-control">
            <button class="qty-btn" data-action="minus">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" data-action="plus">+</button>
          </div>

          <p class="cart-row-total">${formatPrice(parsePrice(item.unitPrice) * item.qty)}</p>

          <button class="remove-btn" title="Remove">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `
    )
    .join("");

  attachCartEvents();
  updateCartSummary(cart.length);
}

function attachCartEvents() {
  cartItems.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = btn.closest(".cart-row");
      const id = row.dataset.id;
      const current = getCart().find((item) => item.id === id);

      if (!current) return;

      if (btn.dataset.action === "plus") {
        updateCartQty(id, current.qty + 1);
      } else if (current.qty > 1) {
        updateCartQty(id, current.qty - 1);
      }

      renderCart();
    });
  });

  cartItems.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.closest(".cart-row").dataset.id;
      removeFromCart(id);
      renderCart();
    });
  });
}

function updateCartSummary(itemCount) {
  const subtotal = getCartSubtotal();

  const summaryContainer = document.getElementById("cartSummary");
  if (!summaryContainer) return;

  if (itemCount === 0) {
    summaryContainer.innerHTML = "";
    return;
  }

  const shipping = subtotal > 0 ? 0 : 0;

  summaryContainer.innerHTML = `
    <h3>Order Summary</h3>

    <div class="summary-row">
      <span>Subtotal</span>
      <span>${formatPrice(subtotal)}</span>
    </div>

    <div class="summary-row">
      <span>Shipping</span>
      <span>${shipping === 0 ? "Free" : formatPrice(shipping)}</span>
    </div>

    <div class="summary-row summary-total">
      <span>Total</span>
      <span>${formatPrice(subtotal + shipping)}</span>
    </div>

    <button class="checkout-btn">Proceed to Checkout</button>
    <button class="clear-btn">Clear Cart</button>
  `;

  summaryContainer.querySelector(".clear-btn").addEventListener("click", () => {
    clearCart();
    renderCart();
  });

  summaryContainer.querySelector(".checkout-btn").addEventListener("click", () => {
    window.location.href = "shipping.html";
  });
}

document.addEventListener("DOMContentLoaded", renderCart);