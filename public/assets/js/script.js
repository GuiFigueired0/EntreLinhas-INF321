document.addEventListener('DOMContentLoaded', function () {
  const resizeBtn = document.querySelector('[data-resize-btn]');
  resizeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      document.body.classList.toggle('sb-expanded');
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
  const navLinks = document.querySelectorAll('.nav-link');
  const tabDivs = document.querySelectorAll('.tab');

  navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
          e.preventDefault(); // Prevent the default anchor behavior

          // Remove 'active' class from all links
          navLinks.forEach(link => link.classList.remove('active'));

          // Add 'active' class to the clicked link
          this.classList.add('active');

          // Hide all tab contents
          tabDivs.forEach(tab => tab.style.display = 'none');

          // Get the target classes from the data attribute
          const targetSelector = this.getAttribute('target-selector');

          // Display the elements that match the target selector
          const elements = document.querySelectorAll(targetSelector);
          elements.forEach(element => element.style.display = 'block');
      });
  });

  const stars = document.querySelectorAll('#starContainer .bx');
  const ratingInput = document.getElementById('ratingInput');
  const ratingForm = document.getElementById('ratingForm');
  const displayStars = document.querySelectorAll('#displayRatingContainer .bx');

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

