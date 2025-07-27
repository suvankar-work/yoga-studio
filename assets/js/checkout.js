document.addEventListener("DOMContentLoaded", function () {
    // ===============================
    // 1. FETCH PLAN & SLOT FROM LOCAL STORAGE
    // ===============================
    const planKey = localStorage.getItem("selectedPlan");
    const slot = JSON.parse(localStorage.getItem("selectedSlot"));
  
    // Pricing Data
    const planData = {
      monthly: {
        name: "Monthly Membership",
        pricePerMonth: 19.99,
        total: 239.88,
        discount: 0,
        payNow: 19.99,
        payType: "monthly"
      },
      annual: {
        name: "Annual Membership",
        pricePerMonth: 14.08,
        total: 169.00,
        discount: 30,
        payNow: 169.00,
        payType: "yearly"
      }
    };
  
    // If required info is missing
    if (!planKey || !slot) {
      alert("Something went wrong. Please go back and try again.");
      return;
    }
  
    const plan = planData[planKey];
  
    // ===============================
    // 2. DISPLAY PRICE DETAILS
    // ===============================
    document.getElementById("membershipType").textContent = plan.name;
    document.getElementById("membershipPrice").textContent = `$${plan.payNow.toFixed(2)}`;
    document.getElementById("membershipSubtext").textContent = `$${plan.total.toFixed(2)} / year`;
    document.getElementById("itemCount").textContent = "1";
    document.getElementById("subtotalAmount").textContent = `$${(plan.payType === "monthly" ? plan.payNow : plan.total).toFixed(2)}`;
    document.getElementById("discountPercent").textContent = `${plan.discount}%`;
    const discountAmt = (plan.total * plan.discount) / 100;
    document.getElementById("discountAmount").textContent = `-$${discountAmt.toFixed(2)}`;
    document.getElementById("totalAmount").textContent = `$${plan.payNow.toFixed(2)}`;
  
    // ===============================
    // 3. HANDLE FORM SUBMISSION
    // ===============================
    document.getElementById("checkout_btn").addEventListener("click", function (e) {
      e.preventDefault();
  
      // Get input values
      const address = document.getElementById("address").value.trim();
      const city = document.getElementById("city").value.trim();
      const state = document.getElementById("state").value;
      const postalCode = document.getElementById("postalCode").value.trim();
      const cardName = document.getElementById("cardName").value.trim();
      const cardNumber = document.getElementById("cardNumber").value.trim().replace(/\s+/g, '');
      const expiryDate = document.getElementById("expiryDate").value;
      const cvc = document.getElementById("cvc").value.trim();
  
      // Reset error messages
      const fields = ["address", "city", "state", "postalCode", "cardName", "cardNumber", "expiryDate", "cvc"];
      fields.forEach(id => document.getElementById(id + "Error").textContent = "");
  
      let hasError = false;
  
      // ===============================
      // 4. VALIDATION
      // ===============================
      if (!address) {
        document.getElementById("addressError").textContent = "Address is required";
        hasError = true;
      }
      if (!city) {
        document.getElementById("cityError").textContent = "City is required";
        hasError = true;
      }
      if (!state) {
        document.getElementById("stateError").textContent = "Select your state";
        hasError = true;
      }
      if (!postalCode) {
        document.getElementById("postalCodeError").textContent = "Postal Code is required";
        hasError = true;
      }
      if (!cardName) {
        document.getElementById("cardNameError").textContent = "Cardholder name is required";
        hasError = true;
      }
      if (!cardNumber) {
        document.getElementById("cardNumberError").textContent = "Card number is required";
        hasError = true;
      } else if (cardNumber !== "0000000000000000") {
        document.getElementById("cardNumberError").textContent = "Use demo card: 0000 0000 0000 0000";
        hasError = true;
      }
  
      // Expiry MM/YY format and future date
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!expiryDate) {
        document.getElementById("expiryDateError").textContent = "Expiry date is required";
        hasError = true;
      } else if (!expiryRegex.test(expiryDate)) {
        document.getElementById("expiryDateError").textContent = "Invalid format. Use MM/YY";
        hasError = true;
      } else {
        const [month, year] = expiryDate.split("/").map(Number);
        const now = new Date();
        const expiry = new Date(`20${year}`, month);
        if (expiry <= now) {
          document.getElementById("expiryDateError").textContent = "Card has expired";
          hasError = true;
        }
      }
  
      // CVC validation
      if (!cvc) {
        document.getElementById("cvcError").textContent = "CVC is required";
        hasError = true;
      } else if (!/^\d{3}$/.test(cvc)) {
        document.getElementById("cvcError").textContent = "Enter a valid 3-digit CVC";
        hasError = true;
      }
  
      // ===============================
      // 5. STORE ORDER & REDIRECT
      // ===============================
      if (!hasError) {
        const lastOrder = {
          billing: { address, city, state, postalCode },
          cardHolder: cardName,
          plan: localStorage.getItem("selectedPlan"),
          slot: JSON.parse(localStorage.getItem("selectedSlot")),
          orderTime: new Date().toISOString()
        };
  
        localStorage.setItem("lastOrder", JSON.stringify(lastOrder));
        localStorage.removeItem("selectedPlan");
        localStorage.removeItem("selectedSlot");
  
        window.location.href = "thank-you.html";
      }
    });
  
    // ===============================
    // 6. CARD NUMBER FORMATTING
    // ===============================
    const cardNumberInput = document.getElementById("cardNumber");
    cardNumberInput.addEventListener("input", function () {
      let value = this.value.replace(/\D/g, "").slice(0, 16); // Max 16 digits
      let formatted = "";
      for (let i = 0; i < value.length; i += 4) {
        formatted += value.substr(i, 4) + " ";
      }
      this.value = formatted.trim();
    });
  
    // ===============================
    // 7. EXPIRY DATE FORMAT (MM/YY)
    // ===============================
    const expiryInput = document.getElementById("expiryDate");
    expiryInput.addEventListener("input", function () {
      let value = this.value.replace(/\D/g, "");
      if (value.length >= 3) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
      }
      this.value = value.substring(0, 5); // Max 5 chars
    });
  
    // ===============================
    // 8. CVC LIMIT TO 3 DIGITS
    // ===============================
    const cvcInput = document.getElementById("cvc");
    cvcInput.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 3);
    });
  
    // ===============================
    // 9. POPULATE STATES LIST
    // ===============================
    const states = ["California", "Texas", "New York", "Florida", "Illinois"];
    const stateSelect = document.getElementById("state");
    states.forEach(state => {
      const option = document.createElement("option");
      option.value = state;
      option.textContent = state;
      stateSelect.appendChild(option);
    });
  });
  