// Smooth scrolling et navigation
const sections = document.querySelectorAll("section");
const navDots = document.querySelectorAll(".nav-dot");
const mobileNavBtns = document.querySelectorAll(".mobile-nav-btn");
let currentSection = 0;
let isAnimating = false;

function scrollToSection(index) {
  if (isAnimating) return;

  isAnimating = true;
  currentSection = index;
  sections[index].scrollIntoView({ behavior: "smooth" });
  updateNavDots();

  // Délai pour éviter les animations multiples
  setTimeout(() => {
    isAnimating = false;
  }, 800);
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

  mobileNavBtns.forEach((btn, index) => {
    btn.classList.toggle("active", index === currentSection);
  });
}

// Scroll detection amélioré
let isScrolling = false;
let scrollTimeout;

window.addEventListener("wheel", (e) => {
  if (isScrolling || isAnimating) return;

  // Annuler le timeout précédent
  clearTimeout(scrollTimeout);

  isScrolling = true;

  // Seuil de sensibilité pour éviter les scrolls accidentels
  const threshold = 50;

  if (Math.abs(e.deltaY) > threshold) {
    if (e.deltaY > 0 && currentSection < sections.length - 1) {
      scrollToSection(currentSection + 1);
    } else if (e.deltaY < 0 && currentSection > 0) {
      scrollToSection(currentSection - 1);
    }
  }

  // Reset du flag de scroll
  scrollTimeout = setTimeout(() => {
    isScrolling = false;
  }, 1000);
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

      // Démarrer les animations des personnages
      startAgentAnimations(entry.target);
    }
  });
}, observerOptions);

// Fonction pour démarrer les animations des agents
function startAgentAnimations(section) {
  if (section.classList.contains("agent-section")) {
    const portraitContainer = section.querySelector(
      ".agent-portrait-container"
    );
    const glow = section.querySelector(".agent-glow");

    if (portraitContainer && glow) {
      // Délai pour laisser le temps au fade-in de se terminer
      setTimeout(() => {
        portraitContainer.classList.add("animate");
        glow.classList.add("animate");
      }, 500);
    }
  }
}

// Observer pour les éléments fade-in
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

// Observer les éléments fade-in
document.querySelectorAll(".fade-in").forEach((el) => {
  fadeObserver.observe(el);
});

// Observer pour les cartes de capacités avec délai
const abilityObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll(".ability-card");
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("visible");
          }, index * 100); // Délai progressif pour chaque carte
        });
      }
    });
  },
  {
    threshold: 0.2,
  }
);

// Observer les grilles de capacités
document.querySelectorAll(".abilities-grid").forEach((grid) => {
  abilityObserver.observe(grid);
});

// Observer les sections
sections.forEach((section) => {
  observer.observe(section);
});

// Navigation clavier améliorée
document.addEventListener("keydown", (e) => {
  if (isAnimating) return;

  switch (e.key) {
    case "ArrowDown":
    case "PageDown":
    case "Space":
      e.preventDefault();
      if (currentSection < sections.length - 1) {
        scrollToSection(currentSection + 1);
      }
      break;
    case "ArrowUp":
    case "PageUp":
      e.preventDefault();
      if (currentSection > 0) {
        scrollToSection(currentSection - 1);
      }
      break;
    case "Home":
      e.preventDefault();
      scrollToSection(0);
      break;
    case "End":
      e.preventDefault();
      scrollToSection(sections.length - 1);
      break;
  }
});

// Gestion tactile pour mobile
let touchStartY = 0;
let touchEndY = 0;
let isTouchScrolling = false;

document.addEventListener("touchstart", (e) => {
  touchStartY = e.changedTouches[0].screenY;
  isTouchScrolling = false;
});

document.addEventListener("touchmove", (e) => {
  // Empêcher le scroll par défaut seulement si on fait un swipe
  if (Math.abs(e.changedTouches[0].screenY - touchStartY) > 50) {
    isTouchScrolling = true;
  }
});

document.addEventListener("touchend", (e) => {
  if (isTouchScrolling || isAnimating) return;

  touchEndY = e.changedTouches[0].screenY;
  const touchDiff = touchStartY - touchEndY;
  const minSwipeDistance = 50;

  if (Math.abs(touchDiff) > minSwipeDistance) {
    if (touchDiff > 0 && currentSection < sections.length - 1) {
      // Swipe vers le haut - section suivante
      scrollToSection(currentSection + 1);
    } else if (touchDiff < 0 && currentSection > 0) {
      // Swipe vers le bas - section précédente
      scrollToSection(currentSection - 1);
    }
  }
});

// Redimensionnement de fenêtre
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Réajuster la position si nécessaire
    sections[currentSection].scrollIntoView({ behavior: "auto" });
  }, 250);
});

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  // Détecter la section visible au chargement
  const viewportHeight = window.innerHeight;
  let visibleSection = 0;

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= viewportHeight / 2 && rect.bottom >= viewportHeight / 2) {
      visibleSection = index;
    }
  });

  currentSection = visibleSection;
  updateNavDots();

  // Ajouter les événements pour les boutons de navigation mobile
  mobileNavBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => scrollToSection(index));
  });

  // Amélioration de l'accessibilité - gestion du focus
  navDots.forEach((dot, index) => {
    dot.setAttribute("tabindex", "0");
    dot.setAttribute("role", "button");
    dot.setAttribute("aria-label", `Aller à la section ${index + 1}`);

    dot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        scrollToSection(index);
      }
    });
  });

  // Gestion du focus pour les boutons mobile
  mobileNavBtns.forEach((btn, index) => {
    btn.setAttribute("aria-label", `Naviguer vers ${btn.textContent}`);
  });
});

// Gestion de la visibilité de la page (performance)
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Pause des animations coûteuses quand la page n'est pas visible
    document.querySelectorAll(".animate").forEach((el) => {
      el.style.animationPlayState = "paused";
    });
  } else {
    // Reprendre les animations
    document.querySelectorAll(".animate").forEach((el) => {
      el.style.animationPlayState = "running";
    });
  }
});

// Détection de la préférence de mouvement réduit
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

function handleReducedMotion(e) {
  if (e.matches) {
    // Désactiver les animations pour l'accessibilité
    document.body.classList.add("reduced-motion");
  } else {
    document.body.classList.remove("reduced-motion");
  }
}

prefersReducedMotion.addListener(handleReducedMotion);
handleReducedMotion(prefersReducedMotion);

// Gestion des erreurs d'images
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", function () {
    console.warn(`Image non trouvée: ${this.src}`);
    // Optionnel: remplacer par une image par défaut
    // this.src = '/img/placeholder.png';
  });
});

// Performance: Lazy loading pour les images (si supporté)
if ("loading" in HTMLImageElement.prototype) {
  document.querySelectorAll("img").forEach((img) => {
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }
  });
}
