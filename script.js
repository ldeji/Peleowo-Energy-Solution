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
    // Hamburger toggle (assuming you want this in script.js)
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) { // Check if elements exist
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('open');
        });
    }

    // Dynamic Year for Footer (assuming you want this in script.js)
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Day/Night Mode Toggle (assuming you want this in script.js)
    const modeToggle = document.getElementById('modeToggle');
    const body = document.body;
    if (modeToggle && body) {
        // Check for saved mode preference
        const savedMode = localStorage.getItem('theme');
        if (savedMode) {
            body.className = savedMode;
            modeToggle.textContent = savedMode === 'day-mode' ? 'Night Mode' : 'Day Mode';
        } else {
            // Default to night mode if no preference is saved
            body.classList.add('night-mode');
            modeToggle.textContent = 'Day Mode';
        }

        modeToggle.addEventListener('click', () => {
            if (body.classList.contains('night-mode')) {
                body.classList.replace('night-mode', 'day-mode');
                modeToggle.textContent = 'Night Mode';
                localStorage.setItem('theme', 'day-mode');
            } else {
                body.classList.replace('day-mode', 'night-mode');
                modeToggle.textContent = 'Day Mode';
                localStorage.setItem('theme', 'night-mode');
            }
        });
    }


    // Video Player Controls
    const video = document.getElementById('myVideo');
    const playPauseButton = document.getElementById('playPauseButton');
    const progressBar = document.getElementById('progressBar');
    const currentTimeSpan = document.getElementById('currentTime');
    const durationSpan = document.getElementById('duration');
    const volumeBar = document.getElementById('volumeBar');

    // Only proceed if all video elements are found
    if (video && playPauseButton && progressBar && currentTimeSpan && durationSpan && volumeBar) {

        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }

        playPauseButton.addEventListener('click', () => {
            if (video.paused || video.ended) {
                video.play();
                playPauseButton.textContent = 'Pause';
            } else {
                video.pause();
                playPauseButton.textContent = 'Play';
            }
        });

        video.addEventListener('timeupdate', () => {
            // Update progress bar value directly with currentTime if max is duration
            progressBar.value = video.currentTime;
            currentTimeSpan.textContent = formatTime(video.currentTime);
        });

        video.addEventListener('loadedmetadata', () => {
            durationSpan.textContent = formatTime(video.duration);
            progressBar.max = video.duration; // Set max for progress bar to video duration
            // Also initialize current time and progress bar here in case video loads paused
            progressBar.value = video.currentTime;
            currentTimeSpan.textContent = formatTime(video.currentTime);
            // Initialize volume bar value
            volumeBar.value = video.volume;
        });

        progressBar.addEventListener('input', () => {
            // Now you can directly set currentTime to progressBar.value
            video.currentTime = progressBar.value;
        });
        
        volumeBar.addEventListener('input', () => {
            video.volume = volumeBar.value;
        });

        // Initialize button text
        playPauseButton.textContent = 'Play';

        // Optional: Add a listener for when the video ends to reset the button
        video.addEventListener('ended', () => {
            playPauseButton.textContent = 'Play';
            video.currentTime = 0; // Reset to the beginning
            progressBar.value = 0; // Reset progress bar
        });
    }
});

