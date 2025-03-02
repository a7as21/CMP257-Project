const dmb = document.getElementById('dmb');
dmb.addEventListener('click', toggleDarkMode);


function toggleDarkMode() {
    let currentTheme = localStorage.getItem('theme') || 'light';
    let newTheme = (currentTheme == 'dark') ? 'light' : 'dark';
    
    localStorage.setItem('theme', newTheme);
    
    changeTheme(newTheme);
}

function changeTheme(theme) {
    document.getElementById('theme').setAttribute('href', `css/themes/${theme}.css`);
}

document.addEventListener('DOMContentLoaded', () => {
    let savedTheme = localStorage.getItem('theme') || 'light';
    changeTheme(savedTheme);
});