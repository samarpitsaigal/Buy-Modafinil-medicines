// =================================================
// SHARED LAYOUT (HEADER + FOOTER)
// Loads HTML/header.html and HTML/footer.html
// =================================================

const isInHTMLFolder = /\/HTML\//i.test(window.location.pathname);
const base = isInHTMLFolder ? "" : "HTML/";

function toggleMenu() {
  const menu = document.getElementById("navMenu");
  if (menu) menu.classList.toggle("active");
}

async function loadLayout() {
  try {
    const [headerRes, footerRes] = await Promise.all([
      fetch(base + "header.html"),
      fetch(base + "footer.html"),
    ]);

    const header = await headerRes.text();
    const footer = await footerRes.text();

    document.body.insertAdjacentHTML("afterbegin", header);
    document.body.insertAdjacentHTML("beforeend", footer);

    fixNavLinks();
  } catch (err) {
    console.error("Layout load failed:", err);
  }
}

function fixNavLinks() {
  const home = document.getElementById("navHome");
  const shop = document.getElementById("navShop");
  const cart = document.getElementById("navCart");

  if (home) home.href = isInHTMLFolder ? "../index.html" : "index.html";
  if (shop) shop.href = isInHTMLFolder ? "modafinil.html" : "HTML/modafinil.html";
  if (cart) cart.href = isInHTMLFolder ? "cart.html" : "HTML/cart.html";
}

loadLayout();
