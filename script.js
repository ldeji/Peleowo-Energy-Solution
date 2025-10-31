// === Peleowo Energy Cart & Navbar Script ===

// Run everything after DOM is ready
document.addEventListener("DOMContentLoaded", () => {

  console.log("✅ script.js loaded successfully");

  // --- Cart Setup ---
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartItemsCount = document.getElementById("nav-item-count");
  const cartSidebarCount = document.getElementById("item-count");
  const cartSidebarItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const clearCartBtn = document.getElementById("clear-cart");

  // --- Update Cart Display ---
  function updateCart() {
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Navbar cart counter
    if (cartItemsCount) cartItemsCount.textContent = totalItems;
    if (cartSidebarCount) cartSidebarCount.textContent = totalItems;

    // Sidebar items (for checkout page)
    if (cartSidebarItems) {
      cartSidebarItems.innerHTML = "";
      let totalPrice = 0;

      cart.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} x${item.quantity} - ₦${(
          item.price * item.quantity
        ).toLocaleString()}`;
        cartSidebarItems.appendChild(li);
        totalPrice += item.price * item.quantity;
      });

      if (cartTotal)
        cartTotal.textContent = `Total: ₦${totalPrice.toLocaleString()}`;
    }

    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // --- Add to Cart ---
  const addButtons = document.querySelectorAll(".add-btn");
  console.log(addButtons.length, "add buttons found");

  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));

      const existingItem = cart.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      updateCart();

      // Optional feedback (non-blocking)
      button.textContent = "Added ✓";
      button.style.background = "#00cc77";
      setTimeout(() => {
        button.textContent = "Add";
        button.style.background = "#00ff99";
      }, 1200);
    });
  });

  // --- Clear Cart ---
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      cart = [];
      updateCart();
      alert("Cart cleared!");
    });
  }

  // --- Hamburger Toggle (for mobile) ---
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
      hamburger.classList.toggle("open");
    });
  }

  // --- Initialize Cart Display on Load ---
  updateCart();
});

