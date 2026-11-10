
const roles = [
    "AI/ML solutions.",
    "Flutter applications.",
    "data-driven insights.",
    "intelligent systems."
];

const typingElement = document.getElementById("typing");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.getElementById("navigation");

// Typing animation
if (typingElement) {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function typeRole() {
        const currentRole = roles[roleIndex];

        typingElement.textContent = currentRole.substring(0, charIndex);

        let delay = deleting ? 45 : 85;

        if (!deleting && charIndex < currentRole.length) {
            charIndex++;
        } else if (deleting && charIndex > 0) {
            charIndex--;
        } else if (!deleting) {
            deleting = true;
            delay = 1300;
        } else {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 350;
        }

        setTimeout(typeRole, delay);
    }

    if (prefersReducedMotion) {
        typingElement.textContent = roles[0];
    } else {
        typeRole();
    }
}

// Mobile navigation
if (menuToggle && navigation) {
    function closeMenu() {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
            : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    });

    // Close menu after selecting a link
    navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Close menu when pressing Escape
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    // Close menu when returning to desktop layout
    window.addEventListener("resize", () => {
        if (window.innerWidth > 995) {
            closeMenu();
        }
    });
}

// Highlight the current section in navigation
if ("IntersectionObserver" in window && navigation) {
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = navigation.querySelectorAll('a[href^="#"]');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    const isActive =
                        link.getAttribute("href") === `#${entry.target.id}`;

                    link.classList.toggle("active", isActive);

                    if (isActive) {
                        link.setAttribute("aria-current", "location");
                    } else {
                        link.removeAttribute("aria-current");
                    }
                });
            }
        });
    }, {
        rootMargin: "-30% 0px -55% 0px"
    });

    sections.forEach(section => observer.observe(section));
}

// Automatically update the footer year
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
