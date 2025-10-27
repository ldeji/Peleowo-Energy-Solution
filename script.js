// --- Cart Setup ---
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartItemsCount = document.getElementById('nav-item-count');
const cartSidebarCount = document.getElementById('item-count');
const cartSidebarItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

// --- Update Cart Display ---
function updateCart() {
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItemsCount) cartItemsCount.textContent = totalItems;
  if (cartSidebarCount) cartSidebarCount.textContent = totalItems;

  if (cartSidebarItems) {
    cartSidebarItems.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} x${item.quantity} - ₦${(item.price * item.quantity).toLocaleString()}`;
      cartSidebarItems.appendChild(li);
      totalPrice += item.price * item.quantity;
    });

    if (cartTotal) cartTotal.textContent = `Total: ₦${totalPrice.toLocaleString()}`;
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}

// --- Add to Cart ---
document.querySelectorAll('.add-btn').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCart();
    // Optional: toast instead of alert
    // showToast(`${name} added to cart!`);
  });
});

// --- Clear Cart ---
const clearCartBtn = document.getElementById('clear-cart');
if (clearCartBtn) {
  clearCartBtn.addEventListener('click', () => {
    cart = [];
    updateCart();
  });
}

// --- Hamburger Toggle (for mobile) ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    hamburger.classList.toggle('open');
  });
}

// Initialize cart display
updateCart();
