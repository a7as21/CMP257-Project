document.addEventListener("DOMContentLoaded", () => {
    let themeLink = document.getElementById("theme");
    let themeToggler = document.getElementById("theme-toggler");

    function initializeTheme() {
        console.log("Initializing theme...");

        // Ensure theme link exists
        if (!themeLink) {
            console.warn("Theme link not found in <head>, creating it now...");
            themeLink = document.createElement("link");
            themeLink.id = "theme";
            themeLink.rel = "stylesheet";
            themeLink.href = "src/css/themes/light.css"; // Default to light mode
            document.head.appendChild(themeLink);
        }

        function changeTheme(theme) {
            console.log(`Switching to ${theme} mode`);
            localStorage.setItem("theme", theme);
            themeLink.href = `src/css/themes/${theme}.css`;
        }

        // Load saved theme
        const savedTheme = localStorage.getItem("theme") || "light";
        changeTheme(savedTheme);

        if (themeToggler) {
            themeToggler.addEventListener("click", () => {
                const newTheme = localStorage.getItem("theme") === "light" ? "dark" : "light";
                changeTheme(newTheme);
            });
        } else {
            console.error("Theme toggler button not found!");
        }
    }

    // Retry until both elements exist
    const checkElementsInterval = setInterval(() => {
        themeLink = document.getElementById("theme");
        themeToggler = document.getElementById("theme-toggler");

        if (themeLink && themeToggler) {
            console.log("Both theme link and toggler found! Initializing...");
            clearInterval(checkElementsInterval);
            initializeTheme();
        }
    }, 100);
});
