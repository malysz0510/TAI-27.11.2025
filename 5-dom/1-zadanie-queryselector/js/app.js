document.querySelectorAll('.first-attempt').forEach(el => {
    el.classList.add('active');
});

const borderElements = document.querySelectorAll('[data-border]');
for (const el of borderElements) {
    el.dataset.elActive = 'true';
}

document.querySelectorAll('.hack').forEach(el => {
    el.setAttribute('title', 'hacking');
});

document.querySelectorAll('.hijack').forEach(el => {
    el.removeAttribute('title');
});

document.querySelectorAll('.st1.st2').forEach(el => {
    el.style.color = 'red';
    el.style.fontSize = '15px';
});

document.querySelectorAll('.attrib').forEach(el => {
    el.dataset.hackActive = 'true';
    el.removeAttribute('data-hack-inactive');
});

document.querySelectorAll('.last-attempt span').forEach(el => {
    el.style.display = 'none';
});