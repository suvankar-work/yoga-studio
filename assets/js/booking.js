// ==============================
// Yoga Studio - Slot Booking & Trainer Selection
// ==============================

document.addEventListener("DOMContentLoaded", function () {

  // --------------------------------
  // 1. Populate Class Dropdowns
  // --------------------------------
  const classTypes = ["Meditation", "Aromatherapy", "Relaxation Yoga", "Sound Theraphy"];
  const classDays = ["Monday", "Wednesday", "Friday"];
  const classTimes = ["10:00 AM", "12:00 PM", "3:00 PM", "6:00 PM"];

  function populateDropdown(id, items) {
    const select = document.getElementById(id);
    if (!select) return;
    items.forEach(item => {
      const option = document.createElement("option");
      option.value = item.toLowerCase().replace(/\s/g, "_");
      option.textContent = item;
      select.appendChild(option);
    });
  }

  populateDropdown("classType", classTypes);
  populateDropdown("classDay", classDays);
  populateDropdown("classTime", classTimes);

  // --------------------------------
  // 2. Handle Slot Booking Form Submission
  // --------------------------------
  const bookingForm = document.getElementById("slotBookingForm");

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const type = document.getElementById("classType").value;
      const day = document.getElementById("classDay").value;
      const time = document.getElementById("classTime").value;

      const selectedTrainer = window.getSelectedTrainer ? window.getSelectedTrainer() : null;
      const selectedPlan = localStorage.getItem("selectedPlan");

      if (!type || !day || !time) {
        alert("Please select class type, day, and time.");
        return;
      }

      if (!selectedPlan) {
        alert("Please select a subscription plan first.");
        window.location.href = "pricing.html";
        return;
      }

      if (!selectedTrainer) {
        alert("Please select a trainer.");
        return;
      }

      const bookingData = {
        trainer: selectedTrainer.name,
        trainerType: selectedTrainer.type,
        classType: type,
        classDay: day,
        classTime: time,
        plan: selectedPlan
      };

      localStorage.setItem("selectedSlot", JSON.stringify(bookingData));

      alert("Slot booked successfully!");
      window.location.href = "cart.html";
    });
  }

  // --------------------------------
  // 3. Fetch & Render Trainer List from JSON
  // --------------------------------
  const trainerList = document.getElementById("trainerList");

  if (trainerList) {
    fetch("assets/data/trainers.json")
      .then(res => res.json())
      .then(trainers => {
        let selectedTrainer = trainers[0]; // default selection

        trainers.forEach((trainer, index) => {
          const li = document.createElement("li");
          li.classList.add("st_box");
          li.setAttribute("data-index", index);

          li.innerHTML = `
            <div class="st_img">
              <img src="${trainer.image}" alt="${trainer.name}">
            </div>
            <div class="st_details">
              <p class="std_trainer_name">${trainer.name} <span class="std_trainner_type">(${trainer.type})</span></p>
              <p class="std_experience">${trainer.experience}</p>
              <span class="std_rating">${renderStars(trainer.rating)}</span>
            </div>
          `;

          li.addEventListener("click", function () {
            document.querySelectorAll(".st_box").forEach(box => box.classList.remove("active"));
            li.classList.add("active");
            selectedTrainer = trainers[index];
          });

          trainerList.appendChild(li);
        });

        // Make selected trainer accessible globally
        window.getSelectedTrainer = () => selectedTrainer;
      });
  }

  // --------------------------------
  // 4. Render Selected Slot (for Cart or Confirmation Page)
  // --------------------------------
  const slot = JSON.parse(localStorage.getItem("selectedSlot"));
  if (slot) {
    const trainerName = document.getElementById("trainerName");
    const trainerType = document.getElementById("trainerType");
    const bookingTime = document.getElementById("bookingTime");
    const planType = document.getElementById("planType");

    if (trainerName) trainerName.textContent = slot.trainer;
    if (trainerType) trainerType.textContent = slot.trainerType;
    if (bookingTime) bookingTime.textContent = `${slot.classDay}, ${slot.classTime}`;
    if (planType) planType.textContent = slot.plan;
  }

  // --------------------------------
  // 5. Render Stars Helper Function
  // --------------------------------
  function renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;

    let stars = "";

    for (let i = 0; i < full; i++) {
      stars += `<i class="fa-solid fa-star star-icon filled"></i>`;
    }

    if (half) {
      stars += `<i class="fa-solid fa-star-half-stroke star-icon filled"></i>`;
    }

    for (let i = 0; i < empty; i++) {
      stars += `<i class="fa-solid fa-star star-icon empty"></i>`;
    }

    return stars;
  }

});
