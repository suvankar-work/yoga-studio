// ==============================
// Yoga Studio - Cart Page Logic
// ==============================

document.addEventListener("DOMContentLoaded", function () {
  // Run only if cart elements are present
  if (!document.getElementById("package_name")) return;

  // -----------------------------
  // 1. Fetch Selected Plan & Slot
  // -----------------------------
  const planKey = localStorage.getItem("selectedPlan");
  const slot = JSON.parse(localStorage.getItem("selectedSlot"));

  if (!planKey || !planData[planKey] || !slot) {
    const cartContent = document.getElementById("cartContent");
    if (cartContent) {
      cartContent.innerHTML = "<p>Please select a subscription plan and book a slot first.</p>";
    }
    return;
  }

  const plan = planData[planKey];

  // -----------------------------
  // 2. Calculate Next Billing Date
  // -----------------------------
  const nextDate = new Date();
  if (plan.payType === "monthly") {
    nextDate.setMonth(nextDate.getMonth() + 1);
  } else {
    nextDate.setFullYear(nextDate.getFullYear() + 1);
  }

  const nextDateText = nextDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  // -----------------------------
  // 3. Fill Cart Summary Section
  // -----------------------------
  document.getElementById("package_name").textContent = plan.name;
  document.getElementById("next_subscription_type").textContent = plan.payType;
  document.getElementById("next_subscription").textContent = nextDateText;
  document.getElementById("pckg_price").textContent = plan.payNow.toFixed(2);

  document.getElementById("membershipType").textContent = plan.name;
  document.getElementById("membershipPrice").textContent = `$${plan.payNow.toFixed(2)}`;
  document.getElementById("membershipSubtext").textContent = `$${plan.total.toFixed(2)}`;
  document.getElementById("itemCount").textContent = "1";

  const subtotal = plan.payType === "monthly" ? plan.payNow : plan.total;
  document.getElementById("subtotalAmount").textContent = `$${subtotal.toFixed(2)}`;

  const discountAmount = (plan.total * plan.discount) / 100;
  document.getElementById("discountPercent").textContent = `${plan.discount}%`;
  document.getElementById("discountAmount").textContent = `-$${discountAmount.toFixed(2)}`;

  document.getElementById("totalAmount").textContent = `$${plan.payNow.toFixed(2)}`;
});


// ==============================
// Fallback Booking Form (for testing/demo purposes)
// ==============================

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("slotBookingForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const slotData = {
      trainer: "Joe Thomas", // Hardcoded trainer name (fallback)
      trainerType: document.getElementById("classType").value,
      classDay: document.getElementById("classDay").value,
      classTime: document.getElementById("classTime").value,
      plan: localStorage.getItem("selectedPlan")
    };

    localStorage.setItem("selectedSlot", JSON.stringify(slotData));
    window.location.href = "cart.html";
  });
});


// ==============================
// Go to Checkout Page on Button Click
// ==============================

document.addEventListener("DOMContentLoaded", function () {
  const checkoutBtn = document.getElementById("checkout_btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      window.location.href = "checkout.html";
    });
  }
});
