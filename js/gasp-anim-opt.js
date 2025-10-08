gsap.registerPlugin(ScrollTrigger);

// Кэшируем часто используемые селекторы
const DOM = {
    header: document.querySelector('header .header'),
    introHello: document.querySelector('.intro_hello'),
    introInfo: document.querySelector('.intro_info'),
    imgCup: document.querySelector('.img_cup'),
    aboutItems: gsap.utils.toArray('.about_advantages-item'),
    glassBlocks: document.querySelectorAll('.glass'),
    commentBlock: document.querySelector('.comment_review')
};

// Общие настройки анимаций
const ANIMATION = {
    duration: {
        short: 0.8,
        medium: 1,
        long: 1.2
    },
    ease: "power3.out",
    stagger: 0.15
};

// Инициализация всех анимаций
function initAnimations() {
    initHeaderAnimation();
    initIntroAnimations();
    initCupAnimation();
    initScrollAnimations();
    initGlassEffects();
    initTypingEffect();
}

// Анимация хедера
function initHeaderAnimation() {
    if (!DOM.header) return;
    
    gsap.from(DOM.header, {
        opacity: 0,
        y: -40,
        duration: ANIMATION.duration.medium,
        ease: ANIMATION.ease
    });
}

// Анимации интро секции
function initIntroAnimations() {
    if (DOM.introHello) {
        gsap.from(DOM.introHello, {
            opacity: 0,
            y: 60,
            duration: ANIMATION.duration.long,
            delay: 0.3,
            ease: ANIMATION.ease
        });
    }

    if (DOM.introInfo) {
        gsap.from(DOM.introInfo, {
            opacity: 0,
            y: 60,
            duration: ANIMATION.duration.medium,
            delay: 0.6,
            ease: ANIMATION.ease
        });
    }
}

// Плавающая анимация кубка
function initCupAnimation() {
    if (!DOM.imgCup) return;
    
    gsap.to(DOM.imgCup, {
        y: -20,
        rotation: 2,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });
}

// Анимации при скролле
function initScrollAnimations() {
    // Анимация преимуществ
    DOM.aboutItems.forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse",
                markers: false // Отключено для продакшена
            },
            opacity: 0,
            y: 40,
            duration: ANIMATION.duration.short,
            delay: i * 0.05,
            ease: ANIMATION.ease
        });
    });

    // Анимации секций
    sectionFadeUp(".about", ".about_info, .about_prize");
    sectionFadeUp(".why", ".why_info, .why_advantages-item");
    sectionFadeUp(".participants", ".participants_info, .participants_search");
    sectionFadeUp(".nominations", ".nominations-item");
    sectionFadeUp(".venue", ".venue-col");
    sectionFadeUp("footer");
}

// Универсальная функция для анимации секций
function sectionFadeUp(sectionSelector, innerSelector = null) {
    const sections = gsap.utils.toArray(sectionSelector);

    sections.forEach((section) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none reverse",
                markers: false
            }
        });

        tl.from(section, {
            opacity: 0,
            y: 80,
            duration: ANIMATION.duration.medium,
            ease: ANIMATION.ease
        });

        if (innerSelector) {
            const items = section.querySelectorAll(innerSelector);
            tl.from(items, {
                opacity: 0,
                y: 40,
                stagger: ANIMATION.stagger,
                duration: ANIMATION.duration.short,
                ease: ANIMATION.ease
            }, "-=0.5"); // Перекрытие с предыдущей анимацией
        }
    });
}

// Эффекты для glass блоков
function initGlassEffects() {
    if (!DOM.glassBlocks.length) return;

    DOM.glassBlocks.forEach((block) => {
        const mouseMoveHandler = (e) => handleGlassHover(block, e);
        const mouseLeaveHandler = () => handleGlassLeave(block);

        block.addEventListener("mousemove", mouseMoveHandler, { passive: true });
        block.addEventListener("mouseleave", mouseLeaveHandler, { passive: true });

        // Сохраняем ссылки для возможного удаления
        block._mouseMoveHandler = mouseMoveHandler;
        block._mouseLeaveHandler = mouseLeaveHandler;
    });
}

function handleGlassHover(block, e) {
    const rect = block.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -0.5;
    const rotateY = ((x - centerX) / centerX) * 0.5;

    gsap.to(block, {
        rotationX: rotateX,
        rotationY: rotateY,
        scale: 1.015,
        transformPerspective: 800,
        transformOrigin: "center",
        ease: "power2.out",
        duration: 0.4
    });
}

function handleGlassLeave(block) {
    gsap.to(block, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        transformPerspective: 800,
        ease: "power2.out",
        duration: 0.8
    });
}

// Эффект печатающегося текста
function initTypingEffect() {
    if (!DOM.commentBlock) return;

    const fullHTML = DOM.commentBlock.innerHTML.trim();
    DOM.commentBlock.innerHTML = "";

    const cursor = document.createElement("span");
    cursor.classList.add("cursor");
    cursor.textContent = "|";
    DOM.commentBlock.appendChild(cursor);

    const typingSpeed = 20;
    let i = 0;

    function typeWriter() {
        if (i < fullHTML.length) {
            DOM.commentBlock.innerHTML = 
                fullHTML.slice(0, i) + '<span class="cursor">|</span>';
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            DOM.commentBlock.innerHTML = fullHTML;
            DOM.commentBlock.appendChild(cursor);
        }
    }

    // Используем Intersection Observer для лучшей производительности
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(DOM.commentBlock);
}

// Очистка событий (для SPA)
function cleanupAnimations() {
    DOM.glassBlocks.forEach(block => {
        if (block._mouseMoveHandler) {
            block.removeEventListener("mousemove", block._mouseMoveHandler);
        }
        if (block._mouseLeaveHandler) {
            block.removeEventListener("mouseleave", block._mouseLeaveHandler);
        }
    });

    // Очищаем все ScrollTrigger
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}

// Запуск при полной загрузке DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    initAnimations();
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initAnimations,
        cleanupAnimations,
        sectionFadeUp
    };
}