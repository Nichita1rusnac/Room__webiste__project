const navBar = document.querySelector(".nav__bar");
const actionTab = document.querySelector(".call-to__action");
const contactBar = document.querySelector(".contact__us");

// Contact us bar
contactBar.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("contact__us--items")) {
    const item = e.target;

    const siblings = item
      .closest(".contact__us")
      .querySelectorAll(".contact__us--items");

    siblings.forEach(el => {
      if (el === item) {
        el.style.color = "#2b2b2b";
      }
    });
  }
});

contactBar.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("contact__us--items")) {
    const item = e.target;

    const siblings = item
      .closest(".contact__us")
      .querySelectorAll(".contact__us--items");

    siblings.forEach(el => {
      if (el === item) {
        el.style.color = getComputedStyle(document.body).getPropertyValue(
          "--contact"
        );
      }
    });
  }
});
// Nav fade animation
navBar.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("nav__items" || "action__item")) {
    const link = e.target;

    const siblings = link.closest(".nav__bar").querySelectorAll(".nav__items");

    const logo = link.closest(".nav__bar").querySelector(".logo");
    // const actionLink = link
    //   .closest(".nav__bar")
    //   .querySelectorAll(".action__item");

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 0.5;
      logo.style.opacity = 0.5;
      actionTab.style.opacity = 0.5;
    });
  }
});

navBar.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("nav__items" || "action__item")) {
    const link = e.target;

    const siblings = link.closest(".nav__bar").querySelectorAll(".nav__items");

    const logo = link.closest(".nav__bar").querySelector(".logo");
    // const actionLink = link
    //   .closest(".nav__bar")
    //   .querySelectorAll(".action__item");

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 1;
      logo.style.opacity = 1;
      actionTab.style.opacity = 1;
    });
  }
});

// Slider

const slides = document.querySelectorAll(".slide");

const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

const maxSlide = slides.length;
let curSlide = 0;

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `
    <button class="dots__dot" data-slide="${i}"></button>
    `
    );
  });
};

createDots();

const activeDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach(dot => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide='${slide}']`)
    .classList.add("dots__dot--active");
};

activeDot(curSlide);

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

goToSlide(curSlide);

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);

  activeDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activeDot(curSlide);
};

btnRight.addEventListener("click", nextSlide);

btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlide();
  else e.key === "ArrowLeft" && prevSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;

    goToSlide(slide);
    activeDot(slide);
  }
});

// Page Navigation

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__items")) {
    const id = e.target.getAttribute("href");

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Sticky nav

const navHeight = navBar.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) navBar.classList.add("sticky");
  else navBar.classList.remove("sticky");
};

const navObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

navObserver.observe(navBar);
