// Peleowo Energy Cart & Navbar Script

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

  // Initialize Cart Display on Load 
  updateCart();
});

            // Setting for 3D Animation control buttons
  document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('myVideo');
    const playPauseButton = document.getElementById('playPauseButton');
    const progressBar = document.getElementById('progressBar');
    const currentTimeSpan = document.getElementById('currentTime');
    const durationSpan = document.getElementById('duration');
    const volumeBar = document.getElementById('volumeBar');

    // Remove the autoplay and loop attributes from the video tag
    // The video will now load but not play until the user clicks play

    // Play/Pause functionality
    playPauseButton.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playPauseButton.textContent = 'Pause';
        } else {
            video.pause();
            playPauseButton.textContent = 'Play';
        }
    });

    // Update progress bar as video plays
    video.addEventListener('timeupdate', () => {
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.value = progress;
        updateTime();
    });

    // Seek functionality when progress bar is clicked
    progressBar.addEventListener('input', () => {
        const seekTime = (progressBar.value / 100) * video.duration;
        video.currentTime = seekTime;
    });

    // Update current time and total duration
    video.addEventListener('loadedmetadata', () => {
        durationSpan.textContent = formatTime(video.duration);
        progressBar.max = 100; // Ensure max is 100 for percentage
    });

    function updateTime() {
        currentTimeSpan.textContent = formatTime(video.currentTime);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    // Volume control
    volumeBar.addEventListener('input', () => {
        video.volume = volumeBar.value;
    });

    // Initial state
    playPauseButton.textContent = 'Play'; // Set initial button text

    // Optional: Add a listener for when the video ends to reset the button
    video.addEventListener('ended', () => {
        playPauseButton.textContent = 'Play';
        video.currentTime = 0; // Reset to the beginning
        progressBar.value = 0; // Reset progress bar
    });
});
