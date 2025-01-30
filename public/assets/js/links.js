document.addEventListener('DOMContentLoaded', function () {
  
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
  
});

