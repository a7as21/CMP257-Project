document.addEventListener("DOMContentLoaded", function () {
    // Load navbar dynamically
    fetch("src/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
        });

    // Load sidebar dynamically
    fetch("src/sidebar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("sidebar-container").innerHTML = data;

            // Wait for the sidebar to load before adding event listener
            document.getElementById("sidebarToggle").addEventListener("click", function () {
                document.getElementById("sidebar").classList.toggle("collapsed");
            });
        });
});
