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

// === Анимация печати текста для всех блоков .comment_review ===
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

document.querySelectorAll(".comment_review").forEach((commentBlock) => {
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
      commentBlock.innerHTML =
        fullHTML.slice(0, i) + '<span class="cursor">|</span>';
      i++;
      setTimeout(typeWriter, typingSpeed);
    } else {
      commentBlock.innerHTML = fullHTML;
      commentBlock.appendChild(cursor);
    }
  }

  // === Запуск при появлении на экране (ScrollTrigger, если доступен) ===
  if (window.gsap && window.ScrollTrigger) {
    ScrollTrigger.create({
      trigger: commentBlock,
      start: "top 85%",
      once: true,
      onEnter: () => typeWriter()
    });
  } else {
    // fallback — если GSAP ScrollTrigger не подключен
    typeWriter();
  }
});





// document.addEventListener("DOMContentLoaded", () => {
//   const numFigures = 5; // сколько фигур
//   const figurePaths = Array.from({ length: numFigures }, (_, i) => `img/artboard_${i + 1}.png`);

//   const figures = [];

//   // Создаём и добавляем фигуры в DOM
//   figurePaths.forEach((src) => {
//     const fig = document.createElement("img");
//     fig.src = src;
//     fig.classList.add("floating-figure");
//     document.body.appendChild(fig);
//     figures.push(fig);
//   });

//   // Расставляем и анимируем
//   figures.forEach((fig) => {
//     const size = gsap.utils.random(60, 180); // случайный размер
//     const left = gsap.utils.random(0, window.innerWidth - size);
//     const top = gsap.utils.random(0, window.innerHeight * 1.5); // немного ниже экрана
//     const rot = gsap.utils.random(-20, 20);

//     Object.assign(fig.style, {
//       position: "fixed",
//       left: `${left}px`,
//       top: `${top}px`,
//       width: `${size}px`,
//       height: "auto",
//       opacity: 0.4,
//       transform: `rotate(${rot}deg)`,
//       pointerEvents: "none",
//       zIndex: 0,
//     });

//     // Плавное “плавание”
//     gsap.to(fig, {
//       duration: gsap.utils.random(8, 16),
//       x: `+=${gsap.utils.random(-80, 80)}`,
//       y: `+=${gsap.utils.random(-60, 60)}`,
//       rotation: `+=${gsap.utils.random(-25, 25)}`,
//       ease: "sine.inOut",
//       repeat: -1,
//       yoyo: true,
//     });

//     // Появление (fade-in)
//     gsap.fromTo(fig, { opacity: 0 }, { opacity: 0.4, duration: 2, ease: "power1.out" });
//   });

//   // Перерасставляем при ресайзе
//   window.addEventListener("resize", () => {
//     figures.forEach((fig) => {
//       const size = parseFloat(fig.style.width);
//       const left = gsap.utils.random(0, window.innerWidth - size);
//       const top = gsap.utils.random(0, window.innerHeight * 1.5);
//       gsap.to(fig, { left, top, duration: 1.5, ease: "power2.out" });
//     });
//   });
// });
