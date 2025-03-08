document.addEventListener("DOMContentLoaded", function () {

    fetch("src/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
        });

    fetch("src/sidebar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("sidebar-container").innerHTML = data;

            document.getElementById("sidebarToggle").addEventListener("click", function () {
                document.getElementById("sidebar").classList.toggle("collapsed");
            });
        });
});
