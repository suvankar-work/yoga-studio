// hero swiper

document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".heroImageSwiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        525: {
          slidesPerView: 2,
          autoplay: true,
        },
        768: {
          slidesPerView: 3,
          autoplay: true,
        },
        1024: {
          slidesPerView: 4,
          autoplay: false, // Stop autoplay on desktop
        }
      },
      pagination: false,
      navigation: false
    });
  });
  
  //  ======================
  
  
  //  explore video
  
  document.addEventListener("DOMContentLoaded", function () {
    fetch("assets/data/yoga-videos.json")
      .then((res) => res.json())
      .then((videos) => {
        const wrapper = document.getElementById("yogaSwiperWrapper");
  
        videos.forEach((video) => {
          const slide = document.createElement("div");
          slide.classList.add("swiper-slide");
  
          slide.innerHTML = `
            <div class="explore_box">
              <div class="explore_img">
                <img src="${video.thumbnail}" alt="${video.name}">
              </div>
              <div class="explore_text">
                <p class="yoga_type text-white">${video.type}</p>
                <h3 class="yoga_name text-white">${video.name}</h3>
                <p class="yoga_duration text-white">
                  <i class="fas fa-clock"></i><span class="yoga_time">${video.duration}</span>
                </p>
              </div>
              <div class="explore_btn">
                <a href="yoga-details.html?id=${video.id}" class="round_btn">
                  <img src="assets/images/Arrow.svg" alt="View">
                </a>
              </div>
            </div>
          `;
  
          wrapper.appendChild(slide);
        });
  
        new Swiper(".exploreSwiper", {
          slidesPerView: 1,
          spaceBetween: 20,
          loop: true,
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          },
          breakpoints: {
            768: {
              slidesPerView: 2
            },
            992: {
              slidesPerView: 3
            },
            1200: {
              slidesPerView: 4
            }
          }
        });
      });
  });
  
  //  ======================
  
  
  // trainner swiper
  
  document.addEventListener("DOMContentLoaded", function () {
    fetch("assets/data/trainers.json")
      .then((res) => res.json())
      .then((trainers) => {
        const wrapper = document.getElementById("trainerSwiperWrapper");
  
        trainers.forEach((trainer) => {
          const slide = document.createElement("div");
          slide.classList.add("swiper-slide");
  
          slide.innerHTML = `
            <div class="trainer_box">
              <div class="trainer_img">
                <img src="${trainer.image}" alt="${trainer.name}">
              </div>
              <div class="trainer_details text-center">
                <h3 class="trainer_name">${trainer.name}</h3>
                <span class="trainer_type">${trainer.type}</span>
              </div>
            </div>
          `;
  
          wrapper.appendChild(slide);
        });
  
        new Swiper(".trainerSwiper", {
          slidesPerView: 1,
          spaceBetween: 20,
          loop: true,
          autoplay: {
            delay: 6000,
            disableOnInteraction: false
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          },
          breakpoints: {
            768: {
              slidesPerView: 2
            },
            992: {
              slidesPerView: 3
            },
            1200: {
              slidesPerView: 4
            }
          }
        });
      })
      .catch((error) => {
        console.error("Failed to load trainers:", error);
      });
  });
  
  //  ======================
  
  
  // testimonial swiper
  
  document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".reviewSwiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",  
        type: "progressbar",
      },
      breakpoints: {
        768: {
          slidesPerView: 2
        },
        992: {
          slidesPerView: 2
        },
        1200: {
          slidesPerView: 3
        }
      }
    });
  });
  
  //  ======================