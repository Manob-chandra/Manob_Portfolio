const contentArea = document.getElementById("content-area");

fetch("assets/experience_academic_bio/experience_academic_bio.html")
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.text();
  })
  .then((data) => {
    contentArea.innerHTML = data;
    preparePortfolioStructure();
    initializePortfolioInteractions();
  })
  .catch((error) => {
    contentArea.innerHTML =
      "<p style='padding:24px;'>Portfolio content could not be loaded.</p>";
    console.error("Portfolio load error:", error);
  });

function preparePortfolioStructure() {
  /*
    Existing HTML file manually edit না করেই
    Research এবং Publications section-এর working ID তৈরি।
  */
  const researchSection = document.querySelector(".research-page-section");
  const publicationsSection = document.querySelector(".publications-section");

  if (researchSection) researchSection.id = "research";
  if (publicationsSection) publicationsSection.id = "publications";

  /*
    Existing dead menu links remove করে
    শুধু working professional navigation রাখা হচ্ছে।
  */
  const nav = document.querySelector(".nav-links");

  if (nav) {
    nav.innerHTML = `
      <a href="#about" class="active">About</a>
      <a href="#research">Research</a>
      <a href="#publications">Publications</a>
      <a href="sakura-exchange.html">Sakura Exchange</a>
    `;
  }

  /*
    Existing Download CV button-এর real CV file এখন নেই।
    তাই আপাতত এটাকে Sakura-এর strong CTA বানানো হচ্ছে।
  */
  const topButton = document.querySelector(".cv-btn");

  if (topButton) {
    topButton.href = "sakura-exchange.html";
    topButton.textContent = "Explore Sakura Journey";
  }

  /*
    Research Interests-এর ঠিক পরে
    Sakura Science Featured Section automatically তৈরি।
  */
  const researchInterests = document.querySelector(".research-section");

  if (
    researchInterests &&
    !document.querySelector(".sakura-feature-section")
  ) {
    const sakuraSection = document.createElement("section");

    sakuraSection.className = "sakura-feature-section";
    sakuraSection.setAttribute(
      "aria-labelledby",
      "sakura-feature-title"
    );

    sakuraSection.innerHTML = `
      <h2 class="section-heading">
        <i class="fa-solid fa-seedling academic-heading-icon"></i>
        Featured International Experience
      </h2>

      <div class="sakura-feature-card" data-tilt-card>

        <div class="sakura-feature-image">
          <img
            src="assets/images/sakura_PUST_team.jpg"
            alt="PUST team at the Sakura Science Exchange Program, University of Yamanashi"
          />
        </div>

        <div class="sakura-feature-content">

          <span class="sakura-kicker">
            <i class="fa-solid fa-plane-departure"></i>
            Japan • Sakura Science
          </span>

          <h3
            class="sakura-feature-title"
            id="sakura-feature-title"
          >
            Sakura Science Exchange Program —
            University of Yamanashi
          </h3>

          <p class="sakura-feature-text">
            My seven-day academic journey in Japan connected
            artificial intelligence, smart agriculture, research
            laboratories, idea generation, technical presentation,
            and cultural learning in one intensive international
            experience.
          </p>

          <div class="sakura-feature-tags">
            <span>AI & Smart Agriculture</span>
            <span>Research Labs</span>
            <span>Ideathon</span>
            <span>Japan</span>
          </div>

          <a
            class="sakura-feature-action magnetic-link"
            href="sakura-exchange.html"
          >
            Explore My 7-Day Journey
            <i class="fa-solid fa-arrow-right"></i>
          </a>

          <p class="sakura-mini-learning">
            <strong>What it changed for me:</strong>
            I began to think more deeply about how AI moves
            from an isolated model into a real system shaped
            by sensing, communication, automation, people,
            and practical constraints.
          </p>

        </div>
      </div>
    `;

    researchInterests.insertAdjacentElement(
      "afterend",
      sakuraSection
    );
  }

  /*
    Existing Research section-এর Sakura card-এর নিচেও
    dedicated journey link automatically যোগ হবে।
  */
  document
    .querySelectorAll(".research-card")
    .forEach((card) => {
      const title = card.querySelector(".research-card-title");

      if (
        !title ||
        !title.textContent.includes(
          "Sakura Science Exchange Program"
        )
      ) {
        return;
      }

      if (card.querySelector(".sakura-research-link")) return;

      const link = document.createElement("a");

      link.className = "sakura-research-link";
      link.href = "sakura-exchange.html";
      link.textContent =
        "View the complete Sakura journey →";

      card.appendChild(link);
    });
}

function initializePortfolioInteractions() {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  /*
    Smooth scrolling
  */
  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");

        if (!href || href === "#") return;

        const target = document.querySelector(href);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      });
    });

  /*
    Scroll reveal
  */
  const revealItems = document.querySelectorAll(
    ".bio-section, " +
      ".research-section, " +
      ".sakura-feature-section, " +
      ".experience-section, " +
      ".academic-section, " +
      ".research-page-section, " +
      ".publications-section"
  );

  if (
    !reduceMotion &&
    "IntersectionObserver" in window
  ) {
    revealItems.forEach((item) =>
      item.classList.add("js-reveal")
    );

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -45px 0px",
      }
    );

    revealItems.forEach((item) =>
      revealObserver.observe(item)
    );
  } else {
    revealItems.forEach((item) =>
      item.classList.add("is-visible")
    );
  }

  /*
    Active navigation
  */
  const navLinks = [
    ...document.querySelectorAll(
      ".nav-links a[href^='#']"
    ),
  ];

  const sections = navLinks
    .map((link) =>
      document.querySelector(
        link.getAttribute("href")
      )
    )
    .filter(Boolean);

  if (
    sections.length &&
    "IntersectionObserver" in window
  ) {
    const sectionObserver =
      new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter(
              (entry) => entry.isIntersecting
            )
            .sort(
              (a, b) =>
                b.intersectionRatio -
                a.intersectionRatio
            )[0];

          if (!visible) return;

          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") ===
                `#${visible.target.id}`
            );
          });
        },
        {
          threshold: [0.2, 0.4, 0.6],
          rootMargin:
            "-90px 0px -50% 0px",
        }
      );

    sections.forEach((section) =>
      sectionObserver.observe(section)
    );
  }

  /*
    Cursor tilt effect
    Desktop mouse-এ কাজ করবে।
    Mobile-এ automatically off থাকবে।
  */
  if (finePointer && !reduceMotion) {
    const tiltCards =
      document.querySelectorAll(
        "[data-tilt-card], " +
          ".research-card, " +
          ".publication-card, " +
          ".academic-card, " +
          ".experience-card"
      );

    tiltCards.forEach((card) => {
      card.classList.add("interactive-tilt");

      card.addEventListener(
        "mousemove",
        (event) => {
          const rect =
            card.getBoundingClientRect();

          const x =
            (event.clientX - rect.left) /
            rect.width;

          const y =
            (event.clientY - rect.top) /
            rect.height;

          const rotateY =
            (x - 0.5) * 4;

          const rotateX =
            (0.5 - y) * 4;

          card.style.transform =
            `perspective(900px) ` +
            `rotateX(${rotateX}deg) ` +
            `rotateY(${rotateY}deg) ` +
            `translateY(-2px)`;
        }
      );

      card.addEventListener(
        "mouseleave",
        () => {
          card.style.transform = "";
        }
      );
    });

    /*
      Sakura card cursor-following spotlight
    */
    const sakuraCard =
      document.querySelector(
        ".sakura-feature-card"
      );

    if (sakuraCard) {
      sakuraCard.addEventListener(
        "mousemove",
        (event) => {
          const rect =
            sakuraCard.getBoundingClientRect();

          sakuraCard.style.setProperty(
            "--mx",
            `${
              event.clientX - rect.left
            }px`
          );

          sakuraCard.style.setProperty(
            "--my",
            `${
              event.clientY - rect.top
            }px`
          );
        }
      );
    }

    /*
      Main Sakura button magnetic response
    */
    document
      .querySelectorAll(".magnetic-link")
      .forEach((button) => {
        button.addEventListener(
          "mousemove",
          (event) => {
            const rect =
              button.getBoundingClientRect();

            const x =
              event.clientX -
              rect.left -
              rect.width / 2;

            const y =
              event.clientY -
              rect.top -
              rect.height / 2;

            button.style.transform =
              `translate(` +
              `${x * 0.045}px, ` +
              `${y * 0.08}px` +
              `) translateY(-2px)`;
          }
        );

        button.addEventListener(
          "mouseleave",
          () => {
            button.style.transform = "";
          }
        );
      });
  }

  /*
    Back to top button
  */
  const backToTop =
    document.createElement("button");

  backToTop.type = "button";
  backToTop.className =
    "site-back-to-top";

  backToTop.setAttribute(
    "aria-label",
    "Back to top"
  );

  backToTop.innerHTML =
    '<i class="fa-solid fa-arrow-up"></i>';

  document.body.appendChild(backToTop);

  const updateBackToTop = () => {
    backToTop.classList.toggle(
      "show",
      window.scrollY > 650
    );
  };

  window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
  );

  updateBackToTop();

  backToTop.addEventListener(
    "click",
    () => {
      window.scrollTo({
        top: 0,
        behavior:
          reduceMotion ? "auto" : "smooth",
      });
    }
  );
}
