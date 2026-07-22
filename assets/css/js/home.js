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
            anticipatePin: 1,
            snap: {
                snapTo: 1 / (cards.length - 1),
                duration: { min: 0.2, max: 0.6 },
                ease: "power1.inOut"
            }
        }
    });

    cards.forEach((card, index) => {
        if (index === 0) return;
        // so only ONE faded card is ever visible behind the active one
        if (index >= 2) {
            tl.to(cards[index - 2], {
                opacity: 0,
                filter: "blur(0px)",
                duration: 1,
                ease: "none"
            }, index);
        }
        // the immediately-previous card recedes into a soft single layer
        tl.to(cards[index - 1], {
            scale: 0.85,
            y: -40,
            opacity: 0.12,
            filter: "blur(2px)",
            duration: 1,
            ease: "none"
        }, index);

        tl.to(card, {
            y: 0,
            duration: 1,
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
        para: "Transform data into intelligent insights with AI-powered analytics for smarter business decisions"
    },

    {
        lineOne: "Cloud Services",
        para: "Build scalable, secure, and high-performance cloud solutions that accelerate business growth"
    },

    {
        lineOne: "Cyber Security",
        para: "Protect your business with advanced cybersecurity solutions that safeguard data and digital assets"
    },

    {
        lineOne: "Enterprise Application",
        para: "Streamline operations with customized enterprise applications that improve productivity and efficiency"
    },

    {
        lineOne: "Development Services",
        para: "Develop innovative, scalable, and future-ready digital solutions tailored to your business needs"
    }

];

const heading = document.getElementById("heroHeading");
const lineOne = document.getElementById("lineOne");
const para = document.getElementById("heroPara");

let current = 0;

function animateText(index) {

    heading.classList.remove("is-active");
    heading.classList.add("is-leaving");

    para.classList.add("is-fading");

    setTimeout(() => {

        lineOne.textContent = categories[index].lineOne;

        para.textContent = categories[index].para;

        heading.classList.remove("is-leaving");

        void heading.offsetWidth;

        heading.classList.add("is-active");

        para.classList.remove("is-fading");

    }, 400);

}

animateText(0);

setInterval(() => {

    current++;

    if (current === categories.length) {

        current = 0;

    }

    animateText(current);

}, 6000);

/* ===========================
   Projects Animation
=========================== */
(function () {
    const cards = gsap.utils.toArray(".project-card");
    if (!cards.length) return;

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

        if (index >= 2) {
            tl.to(cards[index - 2], {
                opacity: 0,
                filter: "blur(0px)",
                duration: 1,          // was 0.3
                ease: "none"
            }, index);
        }

        tl.to(cards[index - 1], {
            scale: 0.9,
            y: -30,
            opacity: 0.12,
            filter: "blur(2px)",
            duration: 1,               // added
            ease: "none"
        }, index);

        tl.to(card, {
            yPercent: 0,
            duration: 1,               // added
            ease: "none"
        }, index);
    });
})();