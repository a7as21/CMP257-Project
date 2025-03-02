const dmb = document.getElementById('dmb');
dmb.addEventListener('click', toggleDarkMode);


function toggleDarkMode() {
    let isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    let newTheme = isDark ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    changeTheme(newTheme);
}

function changeTheme(theme) {
    document.getElementById('theme').setAttribute('href', `css/themes/${theme}.css`);
}

document.addEventListener('DOMContentLoaded', () => {
    let savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    changeTheme(savedTheme);
});