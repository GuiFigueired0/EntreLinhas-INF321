document.addEventListener('DOMContentLoaded', function () {
  const collapsables = document.querySelectorAll('.collapsable');
  const collapseButtons = document.querySelectorAll(".collapse-button");
  collapsables.forEach(content => {
    const paragraph = content.querySelector("p"); // The paragraph inside the collapsable div
    const maxCharacters = 1500; // Maximum number of characters to display before collapsing

    // Check if the text exceeds the maximum number of characters
    if (paragraph.textContent.length <= maxCharacters) {
      // Hide the toggle button and remove the fade effect
      content.nextElementSibling.style.display = "none";
    } else {
      // Apply the hidden class and ensure the fade effect exists
      content.classList.add("hidden");
    }
  });
  
  collapseButtons.forEach(button => {
    button.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default anchor behavior
        const collapsable = this.parentElement.previousElementSibling;
        if (collapsable.classList.contains("expanded")) {
            collapsable.classList.remove("expanded");
            this.textContent = "Show more";
        } else {
            collapsable.classList.add("expanded");
            this.textContent = "Show less";
        }
    });
  });
});