document.addEventListener('DOMContentLoaded', function () {

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