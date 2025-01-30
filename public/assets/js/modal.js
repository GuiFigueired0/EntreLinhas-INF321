document.addEventListener('DOMContentLoaded', function () {

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

});