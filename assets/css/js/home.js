// Register ScrollTrigger once
gsap.registerPlugin(ScrollTrigger);

/* ===========================
   Services Cards Animation
=========================== */
(function () {
    const cards = gsap.utils.toArray(".service-card");
    if (!cards.length) return;

    cards.forEach((card, i) => card.style.zIndex = i + 1);

    gsap.set(cards, {
        y: (index) => (index === 0 ? 0 : window.innerHeight)
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".services-section",
            start: "top top",
            end: () => `+=${cards.length * 100}%`,
            scrub: 1,
            pin: true,
            anticipatePin: 1
        }
    });

    cards.forEach((card, index) => {
        if (index === 0) return;

        // fully remove anything older than the immediately-previous card
        // so only ONE faded card is ever visible behind the active one
        if (index >= 2) {
            tl.to(cards[index - 2], {
                opacity: 0,
                filter: "blur(0px)",
                duration: 0.3,
                ease: "none"
            }, index);
        }

        // the immediately-previous card recedes into a soft single layer
        tl.to(cards[index - 1], {
            scale: 0.85,
            y: -40,
            opacity: 0.12,
            filter: "blur(2px)",
            ease: "none"
        }, index);

        tl.to(card, {
            y: 0,
            ease: "none"
        }, index);
    });
})();
/* ===========================
   Testimonials
=========================== */

const testimonialCards = gsap.utils.toArray(".testimonial-card");
const cardGap = 220;

testimonialCards.forEach((card, index) => {
    gsap.set(card, {
        y: (index - 1) * cardGap,
        scale: index === 1 ? 1 : 0.9,
        opacity: index === 1 ? 1 : 0.15
    });
});

let activeIndex = 1;

function updateCards() {
    testimonialCards.forEach(card => card.classList.remove("active-card"));

    testimonialCards.forEach((card, index) => {
        const relative = index - activeIndex;

        gsap.to(card, {
            y: relative * cardGap,
            scale: relative === 0 ? 1 : 0.9,
            opacity: relative === 0 ? 1 : 0.15,
            duration: 1,
            ease: "power3.inOut"
        });

        if (relative === 0) {
            card.classList.add("active-card");
        }
    });
}

updateCards();

setInterval(() => {
    activeIndex++;

    if (activeIndex >= testimonialCards.length) {
        gsap.set(testimonialCards[0], {
            y: cardGap * 2
        });

        activeIndex = 0;
    }

    updateCards();
}, 2500);

/* ===========================
   Contact Slider
=========================== */

$(".contact-image-slider").slick({
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    pauseOnHover: false
});

/* ===========================
   Hero Text Animation
=========================== */

const categories = [
    {
        lineOne: "AI, Data & Analytics",
        // lineTwo: "Transformation",
        para: "Transform data into intelligent insights with AI-powered analytics for smarter business decisions"
    },
    {
        lineOne: "Cloud Services",
        // lineTwo: "Infrastructure",
        para: "Build scalable, secure, and high-performance cloud solutions that accelerate business growth"
    },
    {
        lineOne: "Cyber Security",
        // lineTwo: "Security",
        para: "Protect your business with advanced cybersecurity solutions that safeguard data and digital assets"
    },
    {
        lineOne: "Enterprise Application",
        // lineTwo: "Security",
        para: "Streamline operations with customized enterprise applications that improve productivity and efficiency"
    },
    {
        lineOne: "Development Services",
        // lineTwo: "Security",
        para: "Develop innovative, scalable, and future-ready digital solutions tailored to your business needs"
    }
];

const SWITCH_TIMES_MS = [0, 5400, 11700];
const LOOP_DURATION_MS = 18000;
const HEADING_EXIT_DURATION = 400;
const PARA_FADE_OUT_DURATION = 350;

const heading = document.getElementById("heroHeading");
const lineOneEl = document.getElementById("lineOne");
const lineTwoEl = document.getElementById("lineTwo");
const paraEl = document.getElementById("heroPara");

let currentIndex = 0;

function applyCategory(index) {
    const next = categories[index];

    heading.classList.remove("is-active");
    heading.classList.add("is-leaving");

    paraEl.classList.add("is-fading");

    setTimeout(() => {
        lineOneEl.textContent = next.lineOne;
        lineTwoEl.textContent = next.lineTwo;

        heading.classList.remove("is-leaving");
        void heading.offsetWidth;
        heading.classList.add("is-active");
    }, HEADING_EXIT_DURATION);

    setTimeout(() => {
        paraEl.textContent = next.para;
        void paraEl.offsetWidth;
        paraEl.classList.remove("is-fading");
    }, PARA_FADE_OUT_DURATION);
}

function scheduleLoop() {
    SWITCH_TIMES_MS.slice(1).forEach((timeMs) => {
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % categories.length;
            applyCategory(currentIndex);
        }, timeMs);
    });

    setTimeout(() => {
        currentIndex = 0;
        applyCategory(currentIndex);
        scheduleLoop();
    }, LOOP_DURATION_MS);
}

scheduleLoop();

/* ===========================
   Projects Animation
=========================== */
/* ===========================
   Projects Animation
=========================== */
(function () {
    const cards = gsap.utils.toArray(".project-card");
    if (!cards.length) return;

    // explicit, dynamic z-index instead of hardcoded nth-child rules
    cards.forEach((card, i) => card.style.zIndex = i + 1);

    gsap.set(cards, {
        yPercent: (index) => (index === 0 ? 0 : 100)
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".projects-wrapper",
            start: "top top",
            end: "bottom bottom",
            scrub: 1
        }
    });

    cards.forEach((card, index) => {
        if (index === 0) return;

        // fully clear anything older than the immediately-previous card
        if (index >= 2) {
            tl.to(cards[index - 2], {
                opacity: 0,
                filter: "blur(0px)",
                duration: 0.3,
                ease: "none"
            }, index);
        }

        // the immediately-previous card recedes into one soft layer
        tl.to(cards[index - 1], {
            scale: 0.9,
            y: -30,
            opacity: 0.12,
            filter: "blur(2px)",
            ease: "none"
        }, index);

        tl.to(card, {
            yPercent: 0,
            ease: "none"
        }, index);
    });
})();