document.addEventListener('DOMContentLoaded', function () {

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
});