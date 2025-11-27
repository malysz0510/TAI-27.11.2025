document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.car-toggle-detail');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const carElement = this.closest('.car');
            const detailElement = carElement.querySelector('.car-detail');

            if (carElement.classList.contains('car-show-detail')) {
                carElement.classList.remove('car-show-detail');
                detailElement.style.display = 'none';
                this.textContent = 'Pokaż detale';
            } else {
                carElement.classList.add('car-show-detail');
                detailElement.style.display = 'block';
                this.textContent = 'Schowaj detale';
            }
        });
    });
});