
// =================== select a subscription plan ====================

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".buy-plan-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      const plan = btn.dataset.plan;
      const loggedInUser = localStorage.getItem("loggedInUser");

      if (!loggedInUser) {
        // ✅ Show login modal if not logged in
        alert("Please log in to continue.");
        const loginModalEl = document.getElementById("loginModal");
        if (loginModalEl) {
          const loginModal = new bootstrap.Modal(loginModalEl);
          loginModal.show();
        }
        return; // ❌ Stop further processing
      }

      // ✅ Save selected plan and redirect
      localStorage.setItem("selectedPlan", plan);
      window.location.href = "slot_booking.html";
    });
  });
});



// =================== PLAN DATA ====================

const planData = {
  monthly: {
    name: "Monthly Membership",
    pricePerMonth: 19.99,
    months: 12,
    total: 239.88,
    discount: 0,
    payNow: 19.99,
    payType: "monthly"
  },
  annual: {
    name: "Annual Membership",
    pricePerMonth: 14.08,
    months: 12,
    total: 169.00,
    discount: 30,
    payNow: 169.00,
    payType: "yearly"
  }
};



// =================== SLOT BOOKING ====================

document.addEventListener("DOMContentLoaded", function () {
  const slotForm = document.getElementById("slotBookingForm");
  if (!slotForm) return;

  slotForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const type = document.getElementById("classType").value;
    const day = document.getElementById("classDay").value;
    const time = document.getElementById("classTime").value;

    localStorage.setItem("selectedSlot", JSON.stringify({ type, day, time }));

    window.location.href = "cart.html";
  });
});

