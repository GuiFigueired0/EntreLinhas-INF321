document.addEventListener('DOMContentLoaded', function () {
  const current_tab = document.body.dataset.current_tab;
  if(current_tab){
    document.getElementById(`tab-${current_tab}`).classList.add('active');
  }
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

});