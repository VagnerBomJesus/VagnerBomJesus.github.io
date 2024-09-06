(function () {
  "use strict";

  // Elements to inject
  const SVGsToInject = document.querySelectorAll("img.svg-inline");
  // Do the injection
  SVGInjector(SVGsToInject);

  new Swiper(".developent-slider", {
    direction: "horizontal",
    centeredSlides: true,
    spaceBetween: 40,
    loop: true,
    slidesPerView: "auto",
    simulateTouch: false,
    observer: true,
    observeParents: true,
    speed: 5000,
    freeMode: true,
    autoplay: {
      enabled: true,
      delay: 1,
      disableOnInteraction: false,
    },
  });

  new Swiper(".barnd-slider", {
    slidesPerView: 1.5,
    loop: true,
    simulateTouch: false,
    speed: 2000,
    autoplay: {
      enabled: true,
      delay: 500,
    },
    breakpoints: {
      480: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
      },
    },
  });

  // ########################## Accordion ##########################
  const accordion = document.querySelectorAll("[data-accordion]");
  accordion.forEach((header) => {
    header.addEventListener("click", () => {
      const accordionItem = header.parentElement;
      accordionItem.classList.toggle("active");
      accordion.forEach((head) => {
        header !== head && head.parentElement.classList.remove("active");
      });
    });
  });

  // ########################## Modal ##############################
  const openModalButtons = document.querySelectorAll("[data-modal-open]");
  const closeModalButtons = document.querySelectorAll("[data-modal-close]");

  openModalButtons.forEach((modal) => {
    modal.addEventListener("click", function () {});
  });

  function openModal(modal) {
    if (modal === null) {
      return null;
    }
    const overlay = modal.querySelector("[data-modal-overlay]");
    modal.style.display = "block";
    overlay.style.display = "block";
  }

  function closeModal(modal) {
    if (modal === null) {
      return null;
    }
    const overlay = modal.querySelector("[data-modal-overlay]");
    modal.style.display = "none";
    overlay.style.display = "none";
  }

  openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.nextElementSibling;
      openModal(modal);
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest("[data-modal]");
      closeModal(modal);
    });
  });

  function getCurrentTime() {
    const dateTime = document.querySelector("[data-time]");
    const version = document.querySelector("[data-version]");

    const date = new Date();
    const formattedTime = date.toLocaleString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    });
    dateTime.innerHTML = formattedTime;
    version.innerHTML = date.getFullYear();
  }
  setInterval(getCurrentTime, 1000);
})();
