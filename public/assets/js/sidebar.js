document.addEventListener('DOMContentLoaded', function () {
  const sidebarBtn = document.getElementById('sidebarBtn');
  if (document.body.classList.contains('sb-toggle') && sidebarBtn) {
    sidebarBtn.classList.remove('d-none');
    sidebarBtn.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.classList.toggle('sb-expanded');
    });
  }
});