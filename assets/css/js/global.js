
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
