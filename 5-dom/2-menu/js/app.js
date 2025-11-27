document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const clickedListItem = this.closest('.nav-el');
            
            const currentlyActive = document.querySelector('.nav-el-active');
            
            if (currentlyActive && currentlyActive !== clickedListItem) {
                currentlyActive.classList.remove('nav-el-active');
            }

            if (clickedListItem) {
                clickedListItem.classList.add('nav-el-active');
            }
        });
    });
});