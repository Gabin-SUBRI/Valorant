// Smooth scrolling et navigation
const sections = document.querySelectorAll("section");
const navDots = document.querySelectorAll(".nav-dot");
let currentSection = 0;

function scrollToSection(index) {
  currentSection = index;
  sections[index].scrollIntoView({ behavior: "smooth" });
  updateNavDots();
}

function scrollToNext() {
  if (currentSection < sections.length - 1) {
    scrollToSection(currentSection + 1);
  }
}

function updateNavDots() {
  navDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSection);
  });
}

// Scroll detection
let isScrolling = false;
window.addEventListener("wheel", (e) => {
  if (isScrolling) return;

  isScrolling = true;
  setTimeout(() => (isScrolling = false), 800);

  if (e.deltaY > 0 && currentSection < sections.length - 1) {
    scrollToSection(currentSection + 1);
  } else if (e.deltaY < 0 && currentSection > 0) {
    scrollToSection(currentSection - 1);
  }
});

// Intersection Observer pour les animations
const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Update current section
      const sectionIndex = Array.from(sections).indexOf(entry.target);
      if (sectionIndex !== -1) {
        currentSection = sectionIndex;
        updateNavDots();
      }
    }
  });
}, observerOptions);

// Observer les éléments fade-in
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Observer les sections
sections.forEach((section) => {
  observer.observe(section);
});

// Navigation clavier
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown" && currentSection < sections.length - 1) {
    scrollToSection(currentSection + 1);
  } else if (e.key === "ArrowUp" && currentSection > 0) {
    scrollToSection(currentSection - 1);
  }
});
