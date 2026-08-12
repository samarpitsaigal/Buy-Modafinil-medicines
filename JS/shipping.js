
const orderItem = document.getElementById("order-item");
const totalPrice = document.getElementById("total-price");

function renderOrderSummary() {
  if (!orderItem) return;

  const cart = getCart();

  if (cart.length === 0) {
    orderItem.innerHTML = `<p>Your cart is empty.</p>`;
    if (totalPrice) totalPrice.textContent = formatPrice(0);
    return;
  }

  orderItem.innerHTML = cart
    .map(
      (item) => `
        <div class="order-container">
          <div class="order-image-price">
            <img src="${item.image}" alt="${item.name}" width="60" height="60">
            <div class="order-productName-packSize">
              <span class="order-productName">${item.name}</span>
              <span class="order-quantity">Qty: ${item.qty}</span>
            </div>
          </div>
          <span class="order-price">${formatPrice(parsePrice(item.unitPrice) * item.qty)}</span>
        </div>
      `
    )
    .join("");

  if (totalPrice) totalPrice.textContent = formatPrice(getCartSubtotal());
}

document.addEventListener("DOMContentLoaded", renderOrderSummary);
