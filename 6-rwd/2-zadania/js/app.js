const element = document.querySelector('.element');
const minScreenWidth = 600;

function updateDivContent() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width > minScreenWidth) {
        element.textContent = `${width}x${height}`;
        element.style.backgroundColor = '';
        element.style.pointerEvents = '';
    } else {
        element.textContent = '';
        element.style.backgroundColor = 'blue';
        element.style.pointerEvents = 'none';
    }
}

function handleDivClick() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    console.log(`${width}x${height}`);
}

window.addEventListener('resize', updateDivContent);
element.addEventListener('click', handleDivClick);

updateDivContent();