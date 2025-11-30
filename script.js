// Peleowo Energy Cart & Navbar Script - MERGED VERSION

// Run everything after DOM is ready
document.addEventListener("DOMContentLoaded", () => {

  console.log("✅ script.js loaded successfully");

  // --- Search Elements ---
  const productSearchInput = document.getElementById('productSearch');
  const searchButton = document.getElementById('searchButton');
  const productListingDiv = document.getElementById('productListing'); // The container for your product cards

  // --- Hamburger Toggle (for mobile) ---
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active"); // Using 'active' as per your inline script
      hamburger.classList.toggle("open"); // For hamburger icon animation
    });
  }

  // --- Dynamic Year for Footer ---
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
  }

  // --- Day/Night Mode Toggle (from inline script) ---
  const dayNightToggle = document.getElementById("day-night-toggle");
  const body = document.body;

  if (dayNightToggle && body) {
      // Check for saved theme preference
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "night") {
        body.classList.add("night-mode");
        dayNightToggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        // Default to day mode if no preference or preference is 'day'
        // Ensure you have a 'day-mode' class if needed for specific styling,
        // otherwise, no class usually means default styling.
        dayNightToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }

      dayNightToggle.addEventListener("click", () => {
        body.classList.toggle("night-mode");
        if (body.classList.contains("night-mode")) {
          dayNightToggle.innerHTML = '<i class="fas fa-sun"></i>';
          localStorage.setItem("theme", "night");
        } else {
          dayNightToggle.innerHTML = '<i class="fas fa-moon"></i>';
          localStorage.setItem("theme", "day");
        }
      });
  }


  // === CART LOGIC (from inline script, with improvements) ===
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartIcon = document.getElementById("cart-icon");
  const cartModal = document.getElementById("cart-modal");
  const cartModalItems = document.getElementById("cart-modal-items");
  const cartModalCount = document.getElementById("cart-modal-count");
  const cartModalTotal = document.getElementById("cart-modal-total");
  const navItemCount = document.getElementById("nav-item-count");
  const clearCartBtn = document.getElementById("clear-cart-btn"); // Using this ID from inline script

  function updateCartDisplay() {
    localStorage.setItem("cart", JSON.stringify(cart));

    let totalItems = 0;
    let totalPrice = 0;
    if (cartModalItems) cartModalItems.innerHTML = ""; // Check if element exists

    cart.forEach((item, index) => {
      totalItems += item.quantity;
      totalPrice += item.price * item.quantity;

      if (cartModalItems) { // Only append if cartModalItems exists
          const div = document.createElement("div");
          div.classList.add("cart-item");
          div.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <p>${item.price.toLocaleString()}</p>
          </div>
          <div class="quantity-controls">
            <button class="cart-quantity-btn" data-index="${index}" data-delta="-1">–</button>
            <span>${item.quantity}</span>
            <button class="cart-quantity-btn" data-index="${index}" data-delta="1">+</button>
          </div>
        `;
          cartModalItems.appendChild(div);
      }
    });

    if (cartModalCount) cartModalCount.textContent = totalItems;
    if (navItemCount) navItemCount.textContent = totalItems;
    if (cartModalTotal) cartModalTotal.textContent = `${totalPrice.toLocaleString()}`;

    // Re-attach listeners for dynamically created quantity buttons
    if (cartModalItems) {
        document.querySelectorAll(".cart-quantity-btn").forEach(button => {
            button.onclick = (event) => { // Using onclick for simplicity with dynamic elements, alternative is event delegation
                const index = parseInt(event.target.getAttribute("data-index"));
                const delta = parseInt(event.target.getAttribute("data-delta"));
                changeQuantity(index, delta);
            };
        });
    }
  }

  // NOTE: This `changeQuantity` function is made globally accessible
  // because it's called from `onclick` attributes in dynamically generated HTML.
  // If you prefer not to use global functions, you'd use event delegation
  // on the `cartModalItems` container.
  window.changeQuantity = function(index, delta) {
    if (cart[index]) { // Ensure item still exists in cart
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
          cart.splice(index, 1);
        }
        updateCartDisplay();
    }
  };


  document.querySelectorAll(".add-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-name");
      const price = parseFloat(btn.getAttribute("data-price"));
      const image = btn.getAttribute("data-image");

      const existing = cart.find((i) => i.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ name, price, image, quantity: 1 });
      }
      updateCartDisplay();

      // Optional feedback (non-blocking) - from original script
      btn.textContent = "Added ✓";
      btn.style.background = "#00cc77";
      setTimeout(() => {
          btn.textContent = "Add";
          btn.style.background = ""; // Reset to default or specific color via CSS
      }, 1200);
    });
  });

  if (cartIcon && cartModal) {
    cartIcon.addEventListener("click", () => {
      cartModal.style.display = "flex";
      updateCartDisplay();
    });
  }

  const closeCartBtn = document.getElementById("close-cart"); // Assuming this ID
  if (closeCartBtn && cartModal) {
      closeCartBtn.addEventListener("click", () => {
        cartModal.style.display = "none";
      });
  }

  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      cart = [];
      updateCartDisplay();
      alert("Cart cleared!"); // Optional feedback
    });
  }

  updateCartDisplay(); // Initial display of cart on load


  // === PRODUCT DETAIL MODAL LOGIC (from inline script) ===
  const productDetailModal = document.getElementById(
    "product-detail-modal"
  );
  const productDetailClose = document.getElementById(
    "product-detail-close"
  );
  const productDetailMainImage = document.getElementById(
    "product-detail-main-image"
  );
  const productDetailThumbnails = document.getElementById(
    "product-detail-thumbnails"
  );
  const productDetailName = document.getElementById("product-detail-name");
  const productDetailPrice = document.getElementById(
    "product-detail-price"
  );
  const productDetailDescription = document.getElementById(
    "product-detail-description"
  );
  const productDetailAddToCartBtn = document.getElementById(
    "product-detail-add-to-cart"
  );

  document.querySelectorAll(".product-card img").forEach((img) => {
    img.addEventListener("click", () => {
      const name = img.getAttribute("data-product-name");
      const price = parseFloat(img.getAttribute("data-product-price"));
      const description = img.getAttribute("data-product-description");
      // Safely parse JSON or default to empty array
      const imagesAttr = img.getAttribute("data-product-images");
      let images = [];
      try {
          images = imagesAttr ? JSON.parse(imagesAttr) : [];
      } catch (e) {
          console.error("Error parsing product images JSON:", e);
          images = [img.src]; // Fallback to main image if parsing fails
      }


      // Check if all necessary elements exist before populating
      if (productDetailName) productDetailName.textContent = name;
      if (productDetailPrice) productDetailPrice.textContent = `${price.toLocaleString()}`;
      if (productDetailDescription) productDetailDescription.textContent = description;

      if (productDetailAddToCartBtn) {
          productDetailAddToCartBtn.setAttribute("data-name", name);
          productDetailAddToCartBtn.setAttribute("data-price", price);
          // Set default image for cart, ensuring images array is not empty
          productDetailAddToCartBtn.setAttribute("data-image", images.length > 0 ? images[0] : img.src);
      }


      // Clear previous thumbnails
      if (productDetailThumbnails) productDetailThumbnails.innerHTML = "";

      // Set main image and generate thumbnails
      if (productDetailMainImage) {
          productDetailMainImage.src = images.length > 0 ? images[0] : img.src; // Use first image or fallback to card image
      }

      if (productDetailThumbnails && images.length > 0) {
          images.forEach((imgPath, index) => {
            const thumb = document.createElement("img");
            thumb.src = imgPath;
            thumb.alt = `${name} - view ${index + 1}`;
            thumb.classList.add("thumbnail");
            if (index === 0) {
              thumb.classList.add("active-thumbnail"); // Mark the first as active
            }
            thumb.addEventListener("click", () => {
              if (productDetailMainImage) productDetailMainImage.src = imgPath;
              // Remove active class from all and add to clicked one
              document
                .querySelectorAll(".thumbnail")
                .forEach((t) => t.classList.remove("active-thumbnail"));
              thumb.classList.add("active-thumbnail");
            });
            productDetailThumbnails.appendChild(thumb);
          });
      }

      // Show the modal
      if (productDetailModal) productDetailModal.style.display = "flex";
    });
  });

  if (productDetailClose && productDetailModal) {
      productDetailClose.addEventListener("click", () => {
        productDetailModal.style.display = "none";
      });
  }

  // Add to cart from product detail modal
  if (productDetailAddToCartBtn && productDetailModal) {
      productDetailAddToCartBtn.addEventListener("click", (event) => {
        const name = event.target.getAttribute("data-name");
        const price = parseFloat(event.target.getAttribute("data-price"));
        const image = event.target.getAttribute("data-image");

        const existing = cart.find((i) => i.name === name);
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({ name, price, image, quantity: 1 });
        }
        updateCartDisplay();
        productDetailModal.style.display = "none"; // Close modal after adding to cart
      });
  }

  // Close modal if clicked outside content
  if (productDetailModal) {
      productDetailModal.addEventListener("click", (e) => {
        if (e.target === productDetailModal) {
          productDetailModal.style.display = "none";
        }
      });
  }


  // --- Search Bar Logic (from original script) ---
  function performSearch() {
      const searchTerm = productSearchInput ? productSearchInput.value.toLowerCase().trim() : '';
      const productCards = document.querySelectorAll('.product-card'); // Get all product cards

      let productsFound = 0; // To track if any products match

      productCards.forEach(card => {
          const productName = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
          const productDescriptionElement = card.querySelector('.product-info p:not([id])');
          const productDescription = productDescriptionElement ? productDescriptionElement.textContent.toLowerCase() : '';

          // Ensure the image exists before trying to get its attribute
          const productImage = card.querySelector('img');
          const dataDescription = productImage ? productImage.getAttribute('data-product-description').toLowerCase() : '';


          if (productName.includes(searchTerm) || productDescription.includes(searchTerm) || dataDescription.includes(searchTerm)) {
              card.style.display = 'block'; // Show the product card
              productsFound++;
          } else {
              card.style.display = 'none'; // Hide the product card
          }
      });

      // Optional: Display a message if no products are found
      let noResultsMessage = document.getElementById('no-search-results');
      if (productsFound === 0 && searchTerm !== '') {
          if (!noResultsMessage && productListingDiv) { // Only create if it doesn't exist and productListingDiv exists
              const msg = document.createElement('p');
              msg.id = 'no-search-results';
              msg.textContent = 'No products found matching your search.';
              productListingDiv.appendChild(msg);
          }
      } else if (noResultsMessage) {
          noResultsMessage.remove(); // Remove message if products are found or search is cleared
      }
  }

  // Event listener for the search button
  if (searchButton) {
      searchButton.addEventListener('click', performSearch);
  }

  // Event listener for 'Enter' key in the search input
  if (productSearchInput) {
      productSearchInput.addEventListener('keypress', (event) => {
          if (event.key === 'Enter') {
              event.preventDefault(); // Prevent form submission if input is in a form
              performSearch();
          }
      });
      // Optional: Live search as user types
      productSearchInput.addEventListener('input', performSearch);
  }


  // --- Video Player Controls (from original script) ---
  const video = document.getElementById('myVideo');
  const playPauseButton = document.getElementById('playPauseButton');
  const progressBar = document.getElementById('progressBar');
  const currentTimeSpan = document.getElementById('currentTime');
  const durationSpan = document.getElementById('duration');
  const volumeBar = document.getElementById('volumeBar');

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
          progressBar.value = video.currentTime;
          currentTimeSpan.textContent = formatTime(video.currentTime);
      });

      video.addEventListener('loadedmetadata', () => {
          durationSpan.textContent = formatTime(video.duration);
          progressBar.max = video.duration;
          progressBar.value = video.currentTime;
          currentTimeSpan.textContent = formatTime(video.currentTime);
          volumeBar.value = video.volume;
      });

      progressBar.addEventListener('input', () => {
          video.currentTime = progressBar.value;
      });

      volumeBar.addEventListener('input', () => {
          video.volume = volumeBar.value;
      });

      playPauseButton.textContent = 'Play'; // Initial state

      video.addEventListener('ended', () => {
          playPauseButton.textContent = 'Play';
          video.currentTime = 0;
          progressBar.value = 0;
      });
  }

}); // End of DOMContentLoaded