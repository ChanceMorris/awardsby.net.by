gsap.registerPlugin(ScrollTrigger);

gsap.from("header .header", {
  opacity: 0,
  y: -40,
  duration: 1,
  ease: "power3.out"
});

gsap.from(".intro_hello", {
  opacity: 0,
  y: 60,
  duration: 1.2,
  delay: 0.3,
  ease: "power3.out"
});

gsap.from(".intro_info", {
  opacity: 0,
  y: 60,
  duration: 1,
  delay: 0.6,
  ease: "power3.out"
});

gsap.to(".img_cup", {
  y: -20,
  rotation: 2,
  duration: 3,
  ease: "sine.inOut",
  repeat: -1,
  yoyo: true
});

gsap.utils.toArray(".about_advantages-item").forEach((item, i) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: "top 85%",
      toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    delay: i * 0.05,
    ease: "power3.out"
  });
});

function sectionFadeUp(sectionSelector, innerSelector = null) {
  const sections = gsap.utils.toArray(sectionSelector);

  sections.forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      y: 80,
      duration: 1,
      ease: "power3.out"
    });

    if (innerSelector) {
      const items = section.querySelectorAll(innerSelector);
      gsap.from(items, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out"
      });
    }
  });
}


sectionFadeUp(".about", ".about_info, .about_prize");
sectionFadeUp(".why", ".why_info, .why_advtantages-item");
sectionFadeUp(".participants", ".participants_info, .participants_search");
sectionFadeUp(".nominations", ".nominations-item");
sectionFadeUp(".venue", ".venue-col");
sectionFadeUp("footer");

const glassBlocks = document.querySelectorAll(".glass");

glassBlocks.forEach((block) => {
  block.addEventListener("mousemove", (e) => {
    const rect = block.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -.5;
    const rotateY = ((x - centerX) / centerX) * .5;

    gsap.to(block, {
      rotationX: rotateX,
      rotationY: rotateY,
      scale: 1.015,
      transformPerspective: 800,
      transformOrigin: "center",
      ease: "power2.out",
      duration: 0.4
    });
  });

  block.addEventListener("mouseleave", () => {
    gsap.to(block, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      transformPerspective: 800,
      ease: "power2.out",
      duration: 0.8
    });
  });
});

const commentBlock = document.querySelector(".comment_review");

if (commentBlock) {
  const fullHTML = commentBlock.innerHTML.trim(); // сохраняем оригинальный HTML
  commentBlock.innerHTML = ""; // очищаем блок перед анимацией

  const cursor = document.createElement("span");
  cursor.classList.add("cursor");
  cursor.textContent = "|";
  commentBlock.appendChild(cursor);

  const typingSpeed = 20; // скорость печати (мс на символ)
  let i = 0;

  function typeWriter() {
    if (i < fullHTML.length) {
      // добавляем по одному символу HTML
      commentBlock.innerHTML =
        fullHTML.slice(0, i) + '<span class="cursor">|</span>';
      i++;
      setTimeout(typeWriter, typingSpeed);
    } else {
      // оставляем курсор в конце и запускаем мигание
      commentBlock.innerHTML = fullHTML;
      commentBlock.appendChild(cursor);
    }
  }

  // Запуск при появлении блока на экране (если GSAP ScrollTrigger подключен)
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: commentBlock,
      start: "top 85%",
      once: true,
      onEnter: () => typeWriter()
    });
  } else {
    // fallback — если ScrollTrigger нет, запускаем сразу
    typeWriter();
  }
}