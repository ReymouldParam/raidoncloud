
(function () {
    function getFileName(path) {
        if (!path) return "index.html";
        const clean = path.split("?")[0].split("#")[0];
        const last = clean.split("/").filter(Boolean).pop();
        if (!last || last === ".") return "index.html";
        return last;
    }

    document.addEventListener("DOMContentLoaded", function () {
        const navLinks = document.querySelectorAll(".desktop-nav a");
        const currentPage = getFileName(window.location.pathname);

        navLinks.forEach(function (link) {
            link.classList.remove("active");
            const linkPage = getFileName(link.getAttribute("href"));

            if (linkPage === currentPage) {
                link.classList.add("active");
            }
        });
    });
})();

// EMAIL INTEGRATION

// pop cards
document.addEventListener("DOMContentLoaded", function () {
    const popupMessage = document.getElementById("popup-message");
    const popupOverlay = document.getElementById("popup-overlay");
    const popupHeading = document.getElementById("popup-heading");
    const popupPara = document.getElementById("popup-para");
    const closeBtn = document.getElementById("close-btn");

    // Simulate a condition (replace with actual logic or URL parameters)
    const urlParams = new URLSearchParams(window.location.search);
    const mailStatus = urlParams.get("emailSuccess"); // e.g., mailStatus=true or mailStatus=false

    if (popupMessage && popupHeading && popupOverlay) {
        if (mailStatus === "true") {
            // Mail sent successfully
            popupHeading.innerText = "EMAIL SENT SUCCESSFULLY";
            popupPara.innerText = "Thank you for reaching out! We will get back to you shortly.";
            popupMessage.style.display = "block";
            popupOverlay.style.display = "block";
        } else if (mailStatus === "false") {
            // Mail sending failed
            popupHeading.innerText = "EMAIL NOT SENT";
            popupPara.innerText = "Oops! Something went wrong. Please try again later.";
            popupMessage.style.display = "block";
            popupOverlay.style.display = "block";
        }
    }

    // Close the popup when the close button is clicked
    closeBtn.addEventListener("click", function () {
        popupMessage.style.display = "none";
        popupOverlay.style.display = "none";
    });

    // Close the popup when the overlay is clicked
    popupOverlay.addEventListener("click", function () {
        popupMessage.style.display = "none";
        popupOverlay.style.display = "none";
    });

    // Optionally, clear URL parameters after displaying the popup
    const baseUrl = window.location.href.split("?")[0];
    history.replaceState(null, null, baseUrl);
});

// Header Toggle Navbar
document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuLinks = mobileMenu
        ? mobileMenu.querySelectorAll('.mobile-menu-link, .mobile-contact-btn')
        : [];

    if (!mobileToggle || !mobileMenu) return;

    const openMenu = () => {
        mobileToggle.classList.add('active');
        mobileMenu.classList.add('active');
        // Set max-height to the panel's real content height — this is what
        // eliminates the empty space, since CSS is no longer guessing a number.
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
        mobileToggle.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenu.style.maxHeight = '0px';
        mobileToggle.setAttribute('aria-expanded', 'false');
    };

    const toggleMenu = (e) => {
        e.stopPropagation();
        mobileMenu.classList.contains('active') ? closeMenu() : openMenu();
    };

    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.addEventListener('click', toggleMenu);

    menuLinks.forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('click', (e) => {
        if (
            mobileMenu.classList.contains('active') &&
            !mobileMenu.contains(e.target) &&
            !mobileToggle.contains(e.target)
        ) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
        // Keep the height in sync if content reflows (e.g. font loading) while open
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
        }
    });
});
