document.addEventListener("DOMContentLoaded", function () {
    const companySwiper = new Swiper(".rates-company-swiper", {
      slidesPerView: "auto",
      spaceBetween: 16,
      loop: false, 
      navigation: {
        nextEl: ".new-company-slider-next",
        prevEl: ".new-company-slider-prev",
      },
    });
    const reviewsSwiper = new Swiper(".reviews-swiper", {
      slidesPerView: "auto",
      spaceBetween: 16,
      loop: false, 
      navigation: {
        nextEl: ".reviews-slider-next",
        prevEl: ".reviews-slider-prev",
      },
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const maxLength = 238; // ограничение по символам
    document.querySelectorAll(".review-slide-main-text").forEach(block => {
        let fullText = block.textContent.trim();
        if (fullText.length > maxLength) {
            let shortText = fullText.substring(0, maxLength).trim() + "... ";
            block.innerHTML = shortText + '<a href="#" class="review-read-more">ещё</a>';
        }
    });
});