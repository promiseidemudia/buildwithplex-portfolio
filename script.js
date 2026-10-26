// =========================================================
// PROMISE IDEMUDIA — PORTFOLIO
// Main JavaScript
// =========================================================


// =========================================================
// 1. TYPEWRITER EFFECT
// =========================================================

const typingText = document.querySelector(".typing-text");

const roles = [
  "Software Developer",
  "Full-Stack Developer",
  "Web Developer"
];

let roleIndex = 0;
let characterIndex = 0;
let isDeleting = false;

const typingSpeed = 110;
const deletingSpeed = 60;
const pauseAfterTyping = 1400;
const pauseAfterDeleting = 500;

function typeWriter() {
  if (!typingText) return;

  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    characterIndex++;

    typingText.textContent = currentRole.substring(
      0,
      characterIndex
    );

    if (characterIndex === currentRole.length) {
      isDeleting = true;

      setTimeout(typeWriter, pauseAfterTyping);
      return;
    }

    setTimeout(typeWriter, typingSpeed);
  } else {
    characterIndex--;

    typingText.textContent = currentRole.substring(
      0,
      characterIndex
    );

    if (characterIndex === 0) {
      isDeleting = false;

      roleIndex++;

      if (roleIndex >= roles.length) {
        roleIndex = 0;
      }

      setTimeout(typeWriter, pauseAfterDeleting);
      return;
    }

    setTimeout(typeWriter, deletingSpeed);
  }
}


// Start typewriter
if (typingText) {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    typingText.textContent = roles[0];
  } else {
    setTimeout(typeWriter, 500);
  }
}


// =========================================================
// 2. SCROLL REVEAL
// =========================================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;

        element.classList.add("in");

        // Animate skill bar
        if (element.classList.contains("skill-item")) {
          const skillFill =
            element.querySelector(".skill-fill");

          if (skillFill) {
            const width = skillFill.dataset.width;

            if (width) {
              skillFill.style.setProperty(
                "--skill-width",
                `${width}%`
              );

              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  skillFill.classList.add("in");
                });
              });
            }
          }
        }

        observer.unobserve(element);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -6% 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  // Fallback for older browsers
  revealElements.forEach((element) => {
    element.classList.add("in");

    if (element.classList.contains("skill-item")) {
      const skillFill =
        element.querySelector(".skill-fill");

      if (skillFill) {
        const width = skillFill.dataset.width;

        if (width) {
          skillFill.style.setProperty(
            "--skill-width",
            `${width}%`
          );

          skillFill.classList.add("in");
        }
      }
    }
  });
}


// =========================================================
// 3. NAVIGATION
// =========================================================

const navLinks = document.querySelectorAll(".nav-link");

const sections = [
  document.querySelector("#home"),
  document.querySelector("#about"),
  document.querySelector("#skills"),
  document.querySelector("#projects"),
  document.querySelector("#contact")
].filter(Boolean);


// =========================================================
// 4. SMOOTH SCROLLING
// =========================================================

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || !targetId.startsWith("#")) {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    const navOffset = 90;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      navOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });

    history.replaceState(null, "", targetId);
  });
});


// =========================================================
// 5. ACTIVE NAVIGATION
// =========================================================

function setActiveNav(sectionId) {
  navLinks.forEach((link) => {
    const isActive =
      link.getAttribute("href") === `#${sectionId}`;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}


if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-45% 0px -50% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}


// =========================================================
// 6. VIEW MY WORK BUTTON
// =========================================================

const workButton =
  document.querySelector('a[href="#projects"]');

if (workButton) {
  workButton.addEventListener("click", (event) => {
    const projectsSection =
      document.querySelector("#projects");

    if (!projectsSection) return;

    event.preventDefault();

    const navOffset = 90;

    const targetPosition =
      projectsSection.getBoundingClientRect().top +
      window.scrollY -
      navOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });

    history.replaceState(
      null,
      "",
      "#projects"
    );
  });
}


// =========================================================
// 7. INITIAL NAVIGATION STATE
// =========================================================

function updateInitialNavigation() {
  const hash = window.location.hash;

  if (hash) {
    const matchingSection =
      document.querySelector(hash);

    if (matchingSection) {
      setActiveNav(matchingSection.id);
      return;
    }
  }

  setActiveNav("home");
}

updateInitialNavigation();


// =========================================================
// 8. HEADER SCROLL STATE
// =========================================================

const siteHeader =
  document.querySelector(".site-header");

function updateHeader() {
  if (!siteHeader) return;

  if (window.scrollY > 30) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
}

updateHeader();

window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);


// =========================================================
// 9. PLACEHOLDER LINKS
// =========================================================

const placeholderLinks =
  document.querySelectorAll('a[href="#"]');

placeholderLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
  });
});


// =========================================================
// 10. DEVELOPER CONSOLE MESSAGE
// =========================================================

console.log(
  "%cPromise Idemudia — Portfolio",
  "font-size: 18px; font-weight: 700;"
);

console.log(
  "Built with HTML, CSS and JavaScript."
);