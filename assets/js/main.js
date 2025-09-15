document.addEventListener("DOMContentLoaded", function () {
  let companySwiper;
  let reviewsSwiper;

  function initSwipers() {
    if (window.innerWidth >= 992) {
      // Company swiper
      if (!companySwiper) {
        companySwiper = new Swiper(".rates-company-swiper", {
          slidesPerView: "auto",
          spaceBetween: 16,
          loop: false,
          navigation: {
            nextEl: ".new-company-slider-next",
            prevEl: ".new-company-slider-prev",
          },
        });
      }
      // Reviews swiper
      if (!reviewsSwiper) {
        reviewsSwiper = new Swiper(".reviews-swiper", {
          slidesPerView: "auto",
          spaceBetween: 16,
          loop: false,
          navigation: {
            nextEl: ".reviews-slider-next",
            prevEl: ".reviews-slider-prev",
          },
        });
      }
    } else {
      // Уничтожаем company swiper
      if (companySwiper) {
        companySwiper.destroy(true, true);
        companySwiper = null;
      }
      // Уничтожаем reviews swiper
      if (reviewsSwiper) {
        reviewsSwiper.destroy(true, true);
        reviewsSwiper = null;
      }
    }
  }

  // Первый запуск
  initSwipers();
  // Пересоздание при изменении размера окна
  window.addEventListener("resize", initSwipers);
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



document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("search-input");
    const resultBox = document.getElementById("search-result");
    const closer = document.querySelector(".main-search-box-closer");

    input.addEventListener("input", function() {
        if (this.value.trim() !== "") {
            resultBox.style.display = "flex";
            closer.style.display = "inline"; // показываем спан
        } else {
            resultBox.style.display = "none";
            closer.style.display = "none";
        }
    });

    closer.addEventListener("click", function() {
        resultBox.style.display = "none";
        closer.style.display = "none";
        input.value = "";
    });
});



window.addEventListener("scroll", function () {
  const header = document.querySelector("header");

  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});



document.addEventListener("DOMContentLoaded", function () {
  const filterBoxes = document.querySelectorAll(".filter-box-item");

  function setActive(box, state) {
    box.classList.toggle("active", state);
    const header = box.querySelector(".filter-box-select-header");
    if (header) header.classList.toggle("active", state);
  }

  filterBoxes.forEach(box => {
    const tapper = box.querySelector(".filter-box-item-tapper");
    const headerText = box.querySelector(".filter-box-select-header span");
    const dropdown = box.querySelector(".filter-box-dropdown");

    // --- Для блоков с <li> ---
    const listItems = box.querySelectorAll(".filter-box-dropdown-list li");
    const search = box.querySelector(".filter-box-dropdown-search");

    if (listItems.length > 0 && headerText) {
      headerText.textContent = listItems[0].textContent;
      listItems[0].classList.add("selected");
    }

    listItems.forEach(item => {
      item.addEventListener("click", function () {
        if (this.classList.contains("not-found")) return; // игнорируем "ничего не найдено"

        headerText.textContent = this.textContent;
        listItems.forEach(i => i.classList.remove("selected"));
        this.classList.add("selected");
        setActive(box, false);
      });
    });

    if (search) {
      search.addEventListener("keyup", function () {
        const val = this.value.toLowerCase();
        let found = 0;

        listItems.forEach(item => {
          if (!item.classList.contains("not-found")) {
            if (item.textContent.toLowerCase().includes(val)) {
              item.style.display = "block";
              found++;
            } else {
              item.style.display = "none";
            }
          }
        });

        // Добавляем "ничего не найдено" если нужно
        let notFound = box.querySelector(".not-found");
        if (!notFound) {
          const ul = box.querySelector(".filter-box-dropdown-list ul");
          notFound = document.createElement("li");
          notFound.textContent = "Ничего не найдено";
          notFound.classList.add("not-found");
          notFound.style.display = "none";
          ul.appendChild(notFound);
        }
        notFound.style.display = found === 0 ? "block" : "none";
      });
    }

    // --- Для блока с радио-кнопками (date) ---
    const radioLabels = box.querySelectorAll(".filter-box-date-item label");
    if (radioLabels.length > 0 && headerText) {
      headerText.textContent = radioLabels[0].querySelector("span").textContent;
      radioLabels[0].classList.add("selected");
      radioLabels[0].querySelector("input").checked = true;
    }

    radioLabels.forEach(label => {
      label.addEventListener("click", function () {
        radioLabels.forEach(l => l.classList.remove("selected"));
        this.classList.add("selected");
        const input = this.querySelector("input");
        if (input) input.checked = true;
        const text = this.querySelector("span").textContent;
        headerText.textContent = text;
        setActive(box, false);
      });
    });

    // --- Открытие/закрытие ---
    const opener = tapper || box.querySelector(".filter-box-select-header");
    if (opener) {
      opener.addEventListener("click", function (e) {
        e.stopPropagation();
        filterBoxes.forEach(otherBox => {
          if (otherBox !== box) setActive(otherBox, false);
        });
        setActive(box, !box.classList.contains("active"));
      });
    }
  });

  // Клик вне фильтров → закрыть все
  document.addEventListener("click", function (e) {
    filterBoxes.forEach(box => {
      if (!box.contains(e.target)) setActive(box, false);
    });
  });
});



document.addEventListener("DOMContentLoaded", function() {
  const btn = document.querySelector(".footer-box-btn");

  if (btn) {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});



document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".submenu-toggle").forEach(toggle => {
    toggle.addEventListener("click", () => {
      const parent = toggle.closest(".has-submenu");
      parent.classList.toggle("open");
      toggle.textContent = parent.classList.contains("open") ? "−" : "+";
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".mob-burger");
  const menu = document.querySelector(".mob-menu");
  const filter = document.querySelector(".page-filter");
  const closer = document.querySelector(".mob-menu-closer");

  function openMenu() {
    menu.classList.add("active");
    filter.classList.add("active");
  }

  function closeMenu() {
    menu.classList.remove("active");
    filter.classList.remove("active");
  }

  if (burger) {
    burger.addEventListener("click", openMenu);
  }
  if (closer) {
    closer.addEventListener("click", closeMenu);
  }
  if (filter) {
    filter.addEventListener("click", closeMenu);
  }
});

document.querySelectorAll('input[name="filter"]').forEach(radio => {
  radio.addEventListener('change', () => {
    document.querySelectorAll('input[name="filter"]').forEach(r => r.removeAttribute('checked'));
    radio.setAttribute('checked', 'checked');
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const select = document.querySelector(".card-page-reviews-select");
  const value = select.querySelector(".card-page-reviews-select-value");
  const dropdown = select.querySelector(".card-page-reviews-select-dropdown");
  const options = dropdown.querySelectorAll(".card-page-reviews-select-choose");

  // Открыть/закрыть дропдаун
  select.addEventListener("click", (e) => {
    if (!e.target.classList.contains("card-page-reviews-select-choose")) {
      dropdown.classList.toggle("active");
    }
  });

  // Выбор элемента
  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      value.textContent = option.textContent; // подставляем выбранное значение
      dropdown.classList.remove("active");   // закрываем дропдаун
      e.stopPropagation();
    });
  });

  // Клик вне селекта закрывает дропдаун
  document.addEventListener("click", (e) => {
    if (!select.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
});
