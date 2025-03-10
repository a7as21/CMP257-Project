document.addEventListener("DOMContentLoaded", function () {
    fetch("../reusable files/head.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("head-container").outerHTML = data;
        });
});
