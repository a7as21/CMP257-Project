document.addEventListener('DOMContentLoaded', () => {
    const darkModeRadio = document.getElementById("Dark");
    const lightModeRadio = document.getElementById("Light");
    const themeLink = document.getElementById("theme");

    function changeTheme(theme) {
        localStorage.setItem('theme', theme);
        themeLink.setAttribute('href', `src/css/themes/${theme}.css`);
    }

    // Load saved theme on page load
    let savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the saved theme
    changeTheme(savedTheme);

    // Set the correct radio button as checked
    if (savedTheme === 'dark') {
        darkModeRadio.checked = true;
    } else {
        lightModeRadio.checked = true;
    }

    // Event listeners for radio buttons
    darkModeRadio.addEventListener("change", () => {
        if (darkModeRadio.checked) {
            changeTheme("dark");
        }
    });

    lightModeRadio.addEventListener("change", () => {
        if (lightModeRadio.checked) {
            changeTheme("light");
        }
    });
});
