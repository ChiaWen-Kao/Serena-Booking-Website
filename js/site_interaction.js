// When the user scrolls the page, the myFunction function is executed.
window.onscroll = function() {onScrollWindow()};

// Select HTML element with the id attribute set to "myHeader." 
var header = document.getElementById("navbar");

// Calculates the offset position of the navbar
// Returns pixels from  top of the nearest positioned ancestor element
var sticky = header.offsetTop;

// Add sticky class to the header when reaching its scroll position
// Remove sticky class when leaving the scroll position
function onScrollWindow() {
    // If user has scrolled down past the header
    if (window.pageYOffset > sticky) {    // Represents pixels the document is currently scrolled vertically from the top
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}