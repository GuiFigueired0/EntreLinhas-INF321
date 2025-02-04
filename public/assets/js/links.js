document.addEventListener('DOMContentLoaded', function () {
  
  const buttonLinks = document.querySelectorAll('button a');

  buttonLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetUrl = this.getAttribute('href');

      window.location.assign(targetUrl);
    });
  });
  
});

