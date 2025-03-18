document.addEventListener('DOMContentLoaded', () => {
    const themeLink = document.getElementById("theme");

    function changeTheme(theme) {
        localStorage.setItem('theme', theme);
        themeLink.href = `../CMP257Project/src/css/themes/${theme}.css`;
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    changeTheme(savedTheme);

    const darkModeRadio = document.getElementById("Dark");
    const lightModeRadio = document.getElementById("Light");

    if (darkModeRadio && lightModeRadio) {
        (savedTheme === 'dark' ? darkModeRadio : lightModeRadio).checked = true;

        darkModeRadio.addEventListener("change", () => darkModeRadio.checked && changeTheme("dark"));
        lightModeRadio.addEventListener("change", () => lightModeRadio.checked && changeTheme("light"));
    }
});
