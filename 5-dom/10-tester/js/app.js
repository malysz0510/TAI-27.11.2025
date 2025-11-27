const allElements = document.body.querySelectorAll('*');
let tooltip = document.createElement('div');
tooltip.style.cssText = 'position: fixed; bottom: 10px; right: 10px; padding: 5px; background-color: white; border: 1px solid black; z-index: 9999; pointer-events: none; transition: opacity 0.2s; opacity: 0;';
document.body.appendChild(tooltip);

function handleMouseOver(event) {
    event.stopPropagation();
    const color = this.dataset.myDebugColor;
    this.style.backgroundColor = `hsla(${color}, 100%, 60%, 0.2)`;
    const rect = this.getBoundingClientRect();
    tooltip.innerHTML = `W: ${Math.round(rect.width)}px<br>H: ${Math.round(rect.height)}px<br>Tag: ${this.tagName.toLowerCase()}`;
    tooltip.style.opacity = '1';
}

function handleMouseOut() {
    this.style.backgroundColor = '';
    tooltip.style.opacity = '0';
}

for (const el of allElements) {
    const randomColor = Math.floor(Math.random() * 361);
    el.dataset.myDebugColor = randomColor;
    el.style.outline = `1px solid hsl(${randomColor}, 100%, 60%)`;
    el.addEventListener('mouseover', handleMouseOver);
    el.addEventListener('mouseout', handleMouseOut);
}