/* Main Javascript File for Modern Minimalist Portfolio with 3D & Animations */

document.addEventListener("DOMContentLoaded", function () {
  // --- 1. Lenis Smooth Scroll Setup ---
  const lenis = new Lenis({
    duration: 1.2, // Increased for a smoother, heavier feel
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential Ease Out
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  // Sync Lenis with GSAP ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  // GSAP Ticker for smooth animation loop
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert to MS
  });

  // Disable GSAP's native lag smoothing to prevent jitters
  gsap.ticker.lagSmoothing(0);

  // --- 2. GSAP & ScrollTrigger Setup ---
  gsap.registerPlugin(ScrollTrigger);

  // Kinetic Typography for Hero
  gsap.from(".home-content h1", {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out",
    stagger: 0.1,
  });

  gsap.from(".home-content h3, .home-content p, .social-media, .btn", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    stagger: 0.2,
    ease: "power3.out",
  });

  // Scroll Animations for Sections (exclude hero/home section)
  const sections = document.querySelectorAll("section:not(.home)");
  sections.forEach((section) => {
    gsap.from(section.children, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  });

  // --- 3. Three.js 3D Starfield Background ---
  const canvas = document.querySelector("#bg-3d");
  if (canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000; // Efficient count
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5; // Spread
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: "#3b82f6", // Electric Blue matches theme
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    // Mesh
    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial,
    );
    scene.add(particlesMesh);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 2, 2);
    scene.add(pointLight);

    camera.position.z = 2;

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener("mousemove", (event) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
    });

    // Animation Loop
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Rotate entire system slowly
      particlesMesh.rotation.y = elapsedTime * 0.05;
      particlesMesh.rotation.x = mouseY * 0.1;
      particlesMesh.rotation.y += mouseX * 0.1;

      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };

    tick();

    // Resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  // --- 4. Vanilla JS Tilt Effect ---
  const tiltCards = document.querySelectorAll(
    ".project-card, .timeline-content, .skills-box, .service-card, .community-box, .edu-card, .cert-card",
  );
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      card.style.boxShadow = `0 10px 30px -10px rgba(59, 130, 246, 0.3)`; // Electric Blue Glow
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
      card.style.boxShadow = "none";
    });
  });

  // --- 9. Mobile Menu Logic ---
  let menuIcon = document.querySelector("#menu-icon");
  let navbar = document.querySelector(".navbar");

  menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
  };

  // Close menu when clicking a link
  let navLinks = document.querySelectorAll(".navbar a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuIcon.classList.remove("bx-x");
      navbar.classList.remove("active");
    });
  });

  // --- 10. Tilt Effect (Disable on Mobile) ---
  // Simple check: if window width > 768, apply tilt.
  if (window.innerWidth > 768) {
    // VanillaTilt is initialized via data-tilt attribute in HTML or external script
    // If needing manual init:
    // VanillaTilt.init(document.querySelectorAll(".your-card"), { ... });
  }

  // --- 11. Scroll Reveal ---
  ScrollReveal({
    reset: false,
    distance: "80px",
    duration: 2000,
    delay: 200,
  });

  ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
  ScrollReveal().reveal(
    ".home-img, .services-container, .portfolio-box, .contact form, .timeline-item",
    { origin: "bottom" },
  );
  ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
  ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

  // --- 12. Home Section 3D Parallax ---
  const homeSection = document.querySelector(".home");
  const heroLayer = document.querySelector(".hero-3d-layer");

  // --- 13. Read More Toggle (About Section) ---
  const readMoreBtn = document.querySelector(".btn-read-more");
  const moreContent = document.querySelector(".about-more-content");

  if (readMoreBtn && moreContent) {
    readMoreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      moreContent.classList.toggle("active");
      if (moreContent.classList.contains("active")) {
        readMoreBtn.textContent = "Read Less";
      } else {
        readMoreBtn.textContent = "Read More";
      }
    });
  }

  if (homeSection && heroLayer) {
    homeSection.addEventListener("mousemove", (e) => {
      const x = (window.innerWidth / 2 - e.pageX) / 20; // Rotation sensitivity
      const y = (window.innerHeight / 2 - e.pageY) / 20;

      // Rotate the entire layer
      heroLayer.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;

      // Parallax for Icons (Move them independently)
      document.querySelectorAll(".floating-icon").forEach((icon) => {
        const speed = icon.getAttribute("data-speed");
        const xMove = (window.innerWidth - e.pageX * speed) / 100;
        const yMove = (window.innerHeight - e.pageY * speed) / 100;

        // Keep the translateZ for depth
        let zVal = 100;
        if (icon.classList.contains("icon-react")) zVal = 100;
        if (icon.classList.contains("icon-js")) zVal = 80;
        if (icon.classList.contains("icon-node")) zVal = 120;
        if (icon.classList.contains("icon-code")) zVal = 90;

        icon.style.transform = `translateZ(${zVal}px) translateX(${xMove}px) translateY(${yMove}px)`;
      });
    });

    // Reset on mouse leave
    homeSection.addEventListener("mouseleave", () => {
      heroLayer.style.transform = `rotateY(0deg) rotateX(0deg)`;
      document.querySelectorAll(".floating-icon").forEach((icon) => {
        // Reset to animation state handled by CSS (roughly) or just clear transform override
        icon.style.transform = "";
      });
    });
  }

  // --- 13. About Section (Quantum Card Tilt) ---
  const aboutSection = document.querySelector(".quantum-glass-container");
  const quantumCard = document.querySelector(".quantum-card");

  if (aboutSection && quantumCard) {
    aboutSection.addEventListener("mousemove", (e) => {
      const rect = aboutSection.getBoundingClientRect();
      // Calculate mouse position relative to center of section
      const x = (e.clientX - rect.left - rect.width / 2) / 25; // Division controls sensitivity
      const y = (e.clientY - rect.top - rect.height / 2) / 25;

      // Apply smooth tilt
      quantumCard.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    });

    aboutSection.addEventListener("mouseleave", () => {
      quantumCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
  }

  // --- 6. Typed.js Animation ---
  if (document.querySelector(".multiple-text")) {
    const typed = new Typed(".multiple-text", {
      strings: ["Web Developer", "Tech Enthusiast", "Problem Solver"],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
    });
  }

  // --- 13. Dynamic Header on Scroll ---
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // --- 7. EmailJS Logic ---
  if (typeof emailjs !== "undefined") {
    emailjs.init("pxMeZnYhCPCs8V3ir");

    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const btn = contactForm.querySelector("button");
        const originalText = btn.innerText;
        btn.innerText = "Sending...";

        emailjs.sendForm("vivek_git5", "template_h3r3gob", this).then(
          () => {
            btn.innerText = "Sent!";
            contactForm.reset();
            setTimeout(() => (btn.innerText = originalText), 3000);
          },
          (err) => {
            btn.innerText = "Error!";
            console.error("EmailJS Error:", err);
            setTimeout(() => (btn.innerText = originalText), 3000);
          },
        );
      });
    }
  }
});
