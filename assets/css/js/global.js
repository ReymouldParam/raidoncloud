
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
