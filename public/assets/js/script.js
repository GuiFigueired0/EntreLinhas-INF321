document.addEventListener('DOMContentLoaded', function () {
  const sidebarBtn = document.getElementById('sidebarBtn');
  if (document.body.classList.contains('sb-toggle') && sidebarBtn) {
    sidebarBtn.classList.remove('d-none');
    sidebarBtn.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.classList.toggle('sb-expanded');
    });
  }
  const buttonLinks = document.querySelectorAll('button a');

  buttonLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      // Prevent the default action (navigation)
      event.preventDefault();

      // Extract the href value (URL to redirect to)
      const targetUrl = this.getAttribute('href');

      // Use JavaScript to navigate to the target URL
      window.location.href = targetUrl;
    });
  });
  const gridViewSelect = document.getElementById('gridViewSelect');
  const listViewSelect = document.getElementById('listViewSelect');

  if (gridViewSelect && listViewSelect) {
    gridViewSelect.addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('listView').classList.add('d-none');
      document.getElementById('gridView').classList.remove('d-none');
    });

    listViewSelect.addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('gridView').classList.add('d-none');
      document.getElementById('listView').classList.remove('d-none');
    });
  }
  function paginationLogic(section){
    const paginationLinks = section.querySelectorAll('.page-link');
    const pageContents = section.querySelectorAll('.page-content');

    paginationLinks.forEach(link => {
        link.addEventListener('click', function (e) {
        e.preventDefault();

        // Get the page number from the clicked link
        const pageNum = this.getAttribute('data-page');

        // Hide all pages
        pageContents.forEach(page => page.classList.add('d-none'));

        // Show the selected page
        section.querySelector(`.page-${pageNum}`).classList.remove('d-none');

        // Set the active page in the pagination
        paginationLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
        });
    });
  }
  paginationLogic(document.getElementById('listView'));
  paginationLogic(document.getElementById('gridView'));


  const modalBtns = document.querySelectorAll('.modalBtn');
  const modalDivs = document.querySelectorAll('.modalDiv');
  modalBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent the default anchor behavior
        const modalId = this.getAttribute('href').substring(1); // Get the ID from the href attribute
        const modalDiv = document.getElementById(modalId);
        if (modalDiv) {
            modalDiv.style.display = 'block'; // Display the target modal
        }
    });
  });
  modalDivs.forEach(modalDiv => {
    modalDiv.addEventListener('click', function (e) {
        if (e.target === modalDiv) {
            modalDiv.style.display = 'none'; // Hide the modal if the background is clicked
        }
    });
    const form = modalDiv.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent the default form submission
            modalDiv.style.display = 'none'; // Hide the modal
            // Optionally, you can add your form submission logic here
            // For example, using AJAX to submit the form data
        });
    }
  });
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
  const navLinks = document.querySelectorAll('#profile-nav .nav-link');
  const tabDivs = document.querySelectorAll('.tab');

  navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
          e.preventDefault(); // Prevent the default anchor behavior

          // Remove 'active' class from all links
          navLinks.forEach(link => link.classList.remove('active'));

          // Add 'active' class to the clicked link
          this.classList.add('active');

          // Hide all tab contents
          tabDivs.forEach(tab => tab.classList.add('d-none'));

          // Get the target classes from the data attribute
          const targetSelector = this.getAttribute('target-selector');

          // Display the elements that match the target selector
          const elements = document.querySelectorAll(targetSelector);
          elements.forEach(element => element.classList.remove('d-none'));

            // Check if the clicked link has the 'tab-info' class
            if (this.classList.contains('sb-expanded')) {
            // Add 'tab-info' class to the body element
                document.body.classList.add('sb-expanded');
            } else {
                // Remove 'tab-info' class from the body element
                document.body.classList.remove('sb-expanded');
            }
      });
  });

  const stars = document.querySelectorAll('#starContainer .bx');
  const ratingInput = document.getElementById('ratingInput');
  const ratingForm = document.getElementById('ratingForm');
  const displayStars = document.querySelectorAll('.rating-display .bx');
  const bigStars = document.querySelectorAll(".rating-display.big .bx");

    bigStars.forEach(star => {
        star.classList.add('bx-md');
    });
    stars.forEach(star => {
        star.addEventListener('mouseover', function () {
            const value = this.getAttribute('data-value');
            highlightStars(value);
        });

        star.addEventListener('mouseout', function () {
            const value = ratingInput.value;
            highlightStars(value);
        });

        star.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            ratingInput.value = value;
            highlightStars(value);
            ratingForm.submit();
        });
    });

    function highlightStars(value) {
        stars.forEach(star => {
            if (star.getAttribute('data-value') <= value) {
                star.classList.remove('bx-star');
                star.classList.add('bxs-star');
            } else {
                star.classList.remove('bxs-star');
                star.classList.add('bx-star');
            }
        });
    }

    function fillStars(rating) {
        displayStars.forEach(star => {
            const starValue = parseFloat(star.getAttribute('data-value'));
            if (starValue <= rating) {
                star.classList.remove('bx-star');
                star.classList.add('bxs-star');
            } else if (starValue - 0.5 <= rating) {
                star.classList.remove('bx-star');
                star.classList.add('bxs-star-half');
            } else {
                star.classList.remove('bxs-star', 'bxs-star-half');
                star.classList.add('bx-star');
            }
        });
    }
    
    fillStars(3.7);
});

