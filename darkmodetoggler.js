const dmb = document.getElementById('dmb');
dmb.addEventListener('click', toggleDarkMode);


function toggleDarkMode() {
    let isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark ? 1 : 0);
}

document.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.getItem('darkMode') == 1) {
        document.body.classList.add('dark-mode');
    }
});