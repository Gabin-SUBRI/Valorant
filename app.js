const sections = document.querySelectorAll("section");
let currentSection = 0;

window.addEventListener("wheel", (event) => {
  if (event.deltaY > 0) {
    // Défilement vers le bas
    currentSection = Math.min(currentSection + 1, sections.length - 1);
  } else {
    // Défilement vers le haut
    currentSection = Math.max(currentSection - 1, 0);
  }

  const targetSection = sections[currentSection];

  // Vérification de la section #jett
  if (targetSection.id === "jett") {
    targetSection.scrollIntoView({
      behavior: "smooth",
    });
  } else {
    targetSection.scrollIntoView({
      behavior: "smooth",
    });
  }
});
