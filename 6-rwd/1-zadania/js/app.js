const header = document.querySelector('.header');
const minScreenWidth = 600;

function checkScrollPosition() {
    const scrollPosition = window.scrollY || window.pageYOffset;
    const screenWidth = window.innerWidth;

    if (screenWidth >= minScreenWidth) {
        if (scrollPosition > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    } else {
        header.classList.remove('sticky');
    }
}

window.addEventListener('scroll', checkScrollPosition);
window.addEventListener('resize', checkScrollPosition);

checkScrollPosition();