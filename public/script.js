  //productdetails page
     document.querySelectorAll(".thumb-img").forEach(thumb => {
      thumb.addEventListener("click", function () {
        document.getElementById("mainProductImg").src = this.src;
      });
    });

    function startTimer(duration, display) {
      let timer = duration, days, hours, minutes, seconds;
      setInterval(function () {
        days = parseInt(timer / 86400, 10);
        hours = parseInt((timer % 86400) / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        display.textContent = `${days}Days : ${hours}Hours : ${minutes}Mins : ${seconds}Secs`;

        if (--timer < 0) {
          timer = 0;
        }
      }, 1000);
    }

    window.onload = function () {
      const countdownTime = 11 * 86400 + 15 * 3600 + 38 * 60 + 26;
      const display = document.querySelector('#timer');
      startTimer(countdownTime, display);
    };

    let quantity = 1;
    function changeQuantity(val) {
      quantity = Math.max(1, quantity + val);
      document.getElementById('qty').textContent = quantity;
    }

    //CART PAGE JS CODE FOR BUTTONS
    document.addEventListener('DOMContentLoaded', () => {
  // Select all quantity buttons
  document.querySelectorAll('.cart-table').forEach(cart => {
    cart.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const btn = e.target;
        const row = btn.closest('tr');
        const quantityBtnGroup = row.querySelector('.btn-group');
        const quantityDisplay = quantityBtnGroup.children[1];
        let quantity = parseInt(quantityDisplay.textContent);
        const price = parseFloat(row.querySelectorAll('td')[1].textContent.replace('$', ''));
        const totalCell = row.querySelectorAll('td')[3];

        if (btn.textContent === '+' && quantity < 10) {
          quantity++;
        } else if (btn.textContent === '−' && quantity > 1) {
          quantity--;
        }

        quantityDisplay.textContent = quantity;
        const total = (price * quantity).toFixed(2);
        totalCell.textContent = `$${total}`;
        updateSubtotal();
      }
    });
  });

  // Remove item
  document.querySelectorAll('.cart-table a.text-danger').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const row = e.target.closest('tr');
      row.remove();
      updateSubtotal();
    });
  });

  // Gift wrap checkbox logic
  const giftWrapCheckbox = document.getElementById('giftWrap');
  if (giftWrapCheckbox) {
    giftWrapCheckbox.addEventListener('change', updateSubtotal);
  }

  function updateSubtotal() {
    let subtotal = 0;
    document.querySelectorAll('.cart-table tbody tr').forEach(row => {
      const total = parseFloat(row.querySelectorAll('td')[3].textContent.replace('$', ''));
      subtotal += total;
    });

    if (giftWrapCheckbox && giftWrapCheckbox.checked) {
      subtotal += 5;
    }

    document.querySelector('strong:last-of-type').textContent = `$${subtotal.toFixed(2)} USD`;
  }

  updateSubtotal(); // Initial subtotal calc
});



//FUNCTION TO INCREASE OR DECREASE QUANTITY IN SIDEBAR CART
function changeQuantity(change) {
    const qtyElement = document.getElementById('qty');
    let currentQty = parseInt(qtyElement.textContent);

    // Make sure quantity does not go below 1
    currentQty += change;
    if (currentQty < 1) currentQty = 1;

    qtyElement.textContent = currentQty;
  }

  // index page sidebar cart quantity button description
  // Price of the product (in dollars)
const itemPrice = 25.00;

// Update subtotal and progress bar
function updateCartDisplay() {
    const qty = parseInt(document.getElementById("qty").textContent);
    const subtotal = itemPrice * qty;

    // Update subtotal display
    const subtotalElement = document.querySelector(".d-flex.justify-content-between.mb-2 strong");
    subtotalElement.textContent = `$${subtotal.toFixed(2)} USD`;

    // Update free shipping progress (e.g., free shipping over $75)
    const progressPercent = Math.min((subtotal / 75) * 100, 100);
    const progressBar = document.querySelector(".progress-bar");
    progressBar.style.width = `${progressPercent}%`;

    // Update message
    const shippingMsg = document.querySelector(".small strong");
    const remaining = 75 - subtotal;
    if (remaining > 0) {
        shippingMsg.parentElement.innerHTML = `Buy $${remaining.toFixed(2)} more to enjoy <strong>Free Shipping</strong>`;
    } else {
        shippingMsg.parentElement.innerHTML = `<strong>You're eligible for Free Shipping!</strong>`;
    }
}

// Change quantity function in full page shopping cart
function changeQuantity(change) {
    const qtyElement = document.getElementById("qty");
    let currentQty = parseInt(qtyElement.textContent);

    if (!isNaN(currentQty)) {
        let newQty = currentQty + change;
        if (newQty < 1) newQty = 1;
        qtyElement.textContent = newQty;
        updateCartDisplay();
    }
}

// Optional: Close cart overlay if you're using a checkbox toggle
document.querySelectorAll('label[for="toggle-cart"]').forEach(label => {
    label.addEventListener("click", () => {
        const toggleCart = document.getElementById("toggle-cart");
        if (toggleCart) toggleCart.checked = false;
    });
});

// Initialize cart on load
document.addEventListener("DOMContentLoaded", updateCartDisplay);



//  QUANTITY BUTTON UPDATE IN FULL SHOPPING CART


  document.addEventListener('DOMContentLoaded', function () {
    const cartPage = document.querySelector('/cart');

    // Attach click listeners to + and - buttons
    cartPage.querySelectorAll('.quantity-increase').forEach(button => {
      button.addEventListener('click', function () {
        changeQuantity(this, 1);
      });
    });

    cartPage.querySelectorAll('.quantity-decrease').forEach(button => {
      button.addEventListener('click', function () {
        changeQuantity(this, -1);
      });
    });

    function changeQuantity(button, delta) {
      const quantityValue = button.parentElement.querySelector('.quantity-value');
      let currentQuantity = parseInt(quantityValue.textContent);
      let newQuantity = currentQuantity + delta;

      if (newQuantity < 1) newQuantity = 1;
      quantityValue.textContent = newQuantity;

      // Update item's total
      const row = button.closest('tr');
      const priceText = row.querySelector('td:nth-child(2)').textContent;
      const unitPrice = parseFloat(priceText.replace('$', ''));
      const itemTotalCell = row.querySelector('.item-total');
      const newItemTotal = unitPrice * newQuantity;
      itemTotalCell.textContent = `$${newItemTotal.toFixed(2)}`;

      // Update subtotal
      updateSubtotal();
    }

    function updateSubtotal() {
      let subtotal = 0;
      document.querySelectorAll('.item-total').forEach(cell => {
        subtotal += parseFloat(cell.textContent.replace('$', ''));
      });

      const subtotalDisplay = document.querySelector('.cart-page strong:last-child');
      if (subtotalDisplay) {
        subtotalDisplay.textContent = `$${subtotal.toFixed(2)} USD`;
      }
    }

    // Initial subtotal calculation
    updateSubtotal();
  })
// MODAL POPUP FOR INDEX.EJS PAGE
  
 
    document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM loaded");
    localStorage.removeItem("newsletterModalShown"); // REMOVE THIS LINE after testing

    if (!localStorage.getItem("newsletterModalShown")) {
      console.log("Setting 5s timeout");
      setTimeout(() => {
        const modal = document.getElementById("popupModal");
        if (modal) {
          modal.style.display = "flex";
          localStorage.setItem("newsletterModalShown", "true");
          console.log("Modal displayed");
        } else {
          console.error("Modal element not found");
        }
      }, 5000);
    }

    const closeModalBtn = document.getElementById("closeModal22");
    const notInterestedBtn = document.querySelector(".not-interested");

    function closePopup() {
      const modal = document.getElementById("popupModal");
      if (modal) {
        modal.style.display = "none";
      }
    }

    if (closeModalBtn) closeModalBtn.addEventListener("click", closePopup);
    if (notInterestedBtn) notInterestedBtn.addEventListener("click", closePopup);
  });

  //basic chart data for admin dashbboard
  // Sales Line Chart
const ctx1 = document.getElementById('salesChart').getContext('2d');
new Chart(ctx1, {
  type: 'line',
  data: {
    labels: ['4 Jan', '5 Jan', '6 Jan', '7 Jan', '8 Jan', '9 Jan', '10 Jan'],
    datasets: [{
      label: 'Sales',
      data: [120, 190, 140, 200, 150, 180, 170],
      fill: true,
      borderColor: '#007bff',
      backgroundColor: 'rgba(0,123,255,0.1)',
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } }
  }
});

// Orders Doughnut Chart
const ctx2 = document.getElementById('ordersChart').getContext('2d');
new Chart(ctx2, {
  type: 'doughnut',
  data: {
    labels: ['Completed', 'Pending', 'Unpaid', 'Canceled'],
    datasets: [{
      data: [50, 25, 15, 10],
      backgroundColor: ['#007bff', '#ffc107', '#dc3545', '#6c757d'],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { position: 'bottom' } }
  }
});
