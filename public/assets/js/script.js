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

