// Toast notification logic for Admin_INDEX.html
function showUsernameToast() {
  var username = localStorage.getItem("username");
  var toast = document.getElementById("toast");
  var toastMsg = document.getElementById("toast-msg");
  if (username && toast && toastMsg) {
    toastMsg.textContent = `Hi, ${username}!`;
    toast.style.display = "flex";
    setTimeout(function() {
      toast.style.right = "30px";
      toast.style.opacity = "1";
    }, 100);
    setTimeout(function() {
      toast.style.right = "-400px";
      toast.style.opacity = "0";
      setTimeout(function() { toast.style.display = "none"; }, 600);
    }, 3500);
  }
}

document.addEventListener("DOMContentLoaded", showUsernameToast);
document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#orders tbody");
  const totalOrdersEl = document.getElementById("total-orders");
  const totalRevenueEl = document.getElementById("total-revenue");
  const expandBtn = document.getElementById("expand-orders");
  const toggleDetailsBtn = document.getElementById("toggle-details");
  const detailedAnalysis = document.getElementById("detailed-analysis");

  let orders = [];
  let orderIdCounter = 1000;


  const ctxOrders = document.getElementById("ordersChart");
  const ctxRevenue = document.getElementById("revenueChart");

  const ordersChart = new Chart(ctxOrders, {
    type: "bar",
    data: {
      labels: ["Today", "This Week", "This Month", "This Year"],
      datasets: [{
        label: "Orders",
        data: [0, 0, 0, 0],
        backgroundColor: "#f1c40f"
      }]
    }
  });

  const revenueChart = new Chart(ctxRevenue, {
    type: "line",
    data: {
      labels: ["Today", "This Week", "This Month", "This Year"],
      datasets: [{
        label: "Revenue",
        data: [0, 0, 0, 0],
        borderColor: "#e74c3c",
        fill: false
      }]
    }
  });

  function addOrder(name, order, amount, paymentStatus) {
    let orderId = "ORD" + orderIdCounter++;
    let newOrder = { id: orderId, name, order, amount, paymentStatus };
    orders.unshift(newOrder);
    renderOrders();
    updateStats();
  }

 
function renderOrders(showAll = false) {
  tableBody.innerHTML = "";
  let displayOrders = showAll ? orders : orders.slice(0, 5);

  displayOrders.forEach(o => {
    let statusClass = o.paymentStatus.toLowerCase() === "paid" ? "paid" : "pending";

    let row = document.createElement("tr");
    row.innerHTML = `
      <td data-label="ID">${o.id}</td>
      <td data-label="Name">${o.name}</td>
      <td data-label="Order">${o.order} <br> <small>₹${o.amount}</small></td>
      <td data-label="Payment" class="${statusClass}">
        <span>${o.paymentStatus}</span>
        <button class="toggle-payment">
          ${o.paymentStatus.toLowerCase() === "paid" ? "Mark Not Paid" : "Mark Paid"}
        </button>
      </td>
    `;
    tableBody.appendChild(row);

    // Toggle Payment
    let btn = row.querySelector(".toggle-payment");
    btn.addEventListener("click", () => {
      if (o.paymentStatus === "Paid") {
        o.paymentStatus = "Pending";
      } else {
        o.paymentStatus = "Paid";
      }
      renderOrders(showAll);
      updateStats();
    });
  });

  const overlay = document.getElementById("expand-overlay");
  overlay.style.display = orders.length > 5 && !showAll ? "flex" : "none";
}



  // Update stats + charts
  function updateStats() {
    let totalOrders = orders.length;
    let totalRevenue = orders.filter(o => o.paymentStatus.toLowerCase() === "paid")
                             .reduce((sum, o) => sum + o.amount, 0);

    totalOrdersEl.textContent = totalOrders;
    totalRevenueEl.textContent = "₹" + totalRevenue;

    // Update charts
    ordersChart.data.datasets[0].data[0] = totalOrders; // today
    revenueChart.data.datasets[0].data[0] = totalRevenue; // today
    ordersChart.update();
    revenueChart.update();
  }

  // Expand orders
  expandBtn.addEventListener("click", () => renderOrders(true));

  // Toggle details
  toggleDetailsBtn.addEventListener("click", () => {
    detailedAnalysis.style.display = detailedAnalysis.style.display === "none" ? "block" : "none";
    toggleDetailsBtn.textContent = detailedAnalysis.style.display === "none" ? "Show Detailed" : "Hide Detailed";
  });

  // Example orders
  addOrder("Noushad", "Pizza", 250, "Paid");
  addOrder("Achal", "Burger", 180, "Pending");
  addOrder("Divya", "Pasta", 300, "Paid");
  addOrder("Prince", "Fries", 120, "Pending");
  addOrder("Om", "Sandwich", 200, "Paid");
  addOrder("Jiya", "Samosa", 50, "Pending"); // triggers expand
});

// Toggle expand/collapse
const wrapper = document.querySelector(".orders-wrapper");
const overlay = document.getElementById("expand-overlay");
const expandBtn = document.getElementById("expand-orders");

expandBtn.addEventListener("click", () => {
  wrapper.classList.toggle("expanded");
  if (wrapper.classList.contains("expanded")) {
    overlay.style.display = "none"; // hide overlay when expanded
    expandBtn.textContent = "Show Less ↑";
  } else {
    overlay.style.display = "flex"; // show overlay again
    expandBtn.textContent = "Show All Orders ↓";
  }
});
