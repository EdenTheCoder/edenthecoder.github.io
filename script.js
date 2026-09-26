// Mobile menu toggle
const mobileBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const projectTrack = document.getElementById("project-track");
const prevProjectBtn = document.querySelector(".carousel-btn.prev");
const nextProjectBtn = document.querySelector(".carousel-btn.next");
const projectDots = document.getElementById("project-dots");

if (projectTrack && prevProjectBtn && nextProjectBtn && projectDots) {
  const cards = Array.from(projectTrack.children);
  let currentIndex = 0;

  const getVisibleCards = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const updateCarousel = () => {
    if (!cards.length) {
      prevProjectBtn.disabled = true;
      nextProjectBtn.disabled = true;
      projectTrack.style.transform = "translateX(0)";
      projectDots.replaceChildren();
      return;
    }

    const cardWidth = cards[0].getBoundingClientRect().width + 24;
    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, cards.length - visibleCards);
    currentIndex = Math.min(currentIndex, maxIndex);
    projectTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    prevProjectBtn.disabled = currentIndex === 0;
    nextProjectBtn.disabled = currentIndex === maxIndex;
    projectDots.replaceChildren();

    for (let index = 0; index <= maxIndex; index += 1) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", `Show project group ${index + 1}`);
      dot.classList.toggle("active", index === currentIndex);
      dot.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
      });
      projectDots.appendChild(dot);
    }
  };

  prevProjectBtn.addEventListener("click", () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateCarousel();
  });

  nextProjectBtn.addEventListener("click", () => {
    const maxIndex = Math.max(0, cards.length - getVisibleCards());
    currentIndex = Math.min(maxIndex, currentIndex + 1);
    updateCarousel();
  });

  window.addEventListener("resize", updateCarousel);
  updateCarousel();
}

if (mobileBtn && mobileMenu) {
  mobileBtn.setAttribute("aria-expanded", "false");

  mobileBtn.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.toggle("hidden");
    mobileBtn.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileBtn.setAttribute("aria-expanded", "false");
    });
  });
}

const skillsTags = document.querySelector(".skills-tags");

if (skillsTags) {
  const skillTags = Array.from(skillsTags.querySelectorAll(".skill-tag"));
  const arrayPrefix = document.createElement("span");
  arrayPrefix.className = "skill-array-token skill-array-prefix";
  arrayPrefix.textContent = "Skill[] skills = ";

  const openingBracket = document.createElement("span");
  openingBracket.className = "skill-array-token skill-array-opening";
  openingBracket.textContent = "[";
  skillsTags.prepend(openingBracket);
  skillsTags.prepend(arrayPrefix);

  skillTags.forEach((skillTag, index) => {
    if (index === skillTags.length - 1) return;

    const comma = document.createElement("span");
    comma.className = "skill-array-token skill-array-comma";
    comma.textContent = ",";
    skillTag.after(comma);
  });

  const closingBracket = document.createElement("span");
  closingBracket.className = "skill-array-token skill-array-closing";
  closingBracket.textContent = "]";
  skillsTags.append(closingBracket);

  const positionArrayTokens = () => {
    const firstTag = skillTags[0];
    const lastTag = skillTags[skillTags.length - 1];
    const tokenGap = 8;
    const centerToken = (token, left, top) => {
      token.style.left = `${left}px`;
      token.style.top = `${top}px`;
      token.style.transform = "translateY(-50%)";
    };

    const firstCenter = firstTag.offsetTop + firstTag.offsetHeight / 2;
    const firstTagStart = firstTag.offsetLeft;
    const codeLineTop = firstTag.offsetTop - 28;
    const openingLeft = arrayPrefix.offsetWidth + tokenGap;
    centerToken(arrayPrefix, 0, codeLineTop);
    centerToken(openingBracket, openingLeft, codeLineTop);

    skillTags.forEach((skillTag, index) => {
      const comma = skillsTags.children[index * 2 + 3];
      if (!comma) return;
      centerToken(
        comma,
        skillTag.offsetLeft + skillTag.offsetWidth + tokenGap / 2,
        skillTag.offsetTop + skillTag.offsetHeight / 2,
      );
    });

    centerToken(
      closingBracket,
      lastTag.offsetLeft + lastTag.offsetWidth + tokenGap,
      lastTag.offsetTop + lastTag.offsetHeight / 2,
    );
  };

  positionArrayTokens();
  window.addEventListener("resize", positionArrayTokens);
}

const projectArray = document.querySelector(".project-array-hover");

if (projectArray && projectTrack) {
  const projectCards = Array.from(
    projectTrack.querySelectorAll(".project-card"),
  );
  const projectPrefix = document.createElement("span");
  projectPrefix.className = "project-array-token project-array-prefix";
  projectPrefix.textContent = "Project[] work = ";

  const projectOpening = document.createElement("span");
  projectOpening.className = "project-array-token";
  projectOpening.textContent = "[";
  projectTrack.prepend(projectOpening);
  projectTrack.prepend(projectPrefix);
  const projectClosing = document.createElement("span");
  projectClosing.className = "project-array-token";
  projectClosing.textContent = "]";
  projectTrack.append(projectClosing);

  projectCards.forEach((card, index) => {
    //if (index === projectCards.length - 1) return;

    const comma = document.createElement("span");
    comma.className = "project-array-token";
    comma.textContent = ",";
    card.after(comma);
  });

  const positionProjectTokens = () => {
    const firstCard = projectCards[0];
    const lastCard = projectCards[projectCards.length - 1];
    if (!firstCard || !lastCard) return;

    const centerToken = (token, left, top) => {
      token.style.left = `${left}px`;
      token.style.top = `${top}px`;
      token.style.transform = "translateY(-50%)";
    };

    const codeLineTop = firstCard.offsetTop - 28;
    const codeLineBot = lastCard.offsetTop + lastCard.offsetHeight + 28;
    centerToken(projectPrefix, 0, codeLineTop);
    centerToken(projectOpening, projectPrefix.offsetWidth + 8, codeLineTop);
    centerToken(projectClosing, 0, codeLineBot);

    projectCards.forEach((card, index) => {
      const comma = card.nextElementSibling;
      if (!comma?.classList.contains("project-array-token")) return;
      centerToken(
        comma,
        card.offsetLeft + card.offsetWidth + 8,
        card.offsetTop + card.offsetHeight / 2,
      );
    });
  };

  positionProjectTokens();
  window.addEventListener("resize", positionProjectTokens);
}

// Scroll Reveal Animation via Intersection Observer
const revealElements = document.querySelectorAll(".reveal");

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const revealOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, revealOptions);

revealElements.forEach((el) => {
  revealOnScroll.observe(el);
});
