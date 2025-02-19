const toggler = document.getElementById('darkmodetoggler');
const body = document.body

body.classList.add('light-mode');

function DarkModeToggle() {
    if(body.classList.contains('light-mode')) {
        body.classList.replace('light-mode','dark-mode');
        toggler.textContent = 'Switch to Light Mode';
    }

    else{
        body.classList.replace('dark-mode', 'light-mode');
        toggler.textContent = 'Switch to Dark Mode';
    }
}