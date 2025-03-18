document.addEventListener("DOMContentLoaded", function () {
    fetch("src/reusable files/head.html")
        .then(response => response.text())
        .then(data => {
            let tempDiv = document.createElement("div");
            tempDiv.innerHTML = data;

            // Find Bootstrap CSS <link>
            let bootstrapCSS = document.querySelector('link[href*="bootstrap"][rel="stylesheet"]');

            // If Bootstrap CSS is found, insert after it
            if (bootstrapCSS) {
                while (tempDiv.firstChild) {
                    bootstrapCSS.after(tempDiv.firstChild);
                }
            } else {
                // If Bootstrap CSS is not found, append to <head> as a fallback
                while (tempDiv.firstChild) {
                    document.head.appendChild(tempDiv.firstChild);
                }
            }
        });
});
