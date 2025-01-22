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
});

