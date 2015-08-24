import * as Handler from '../handlers/handler.js';

let current = 0;
const images = document.getElementsByTagName('img');

function incrementCurrentImage(i) {
    current += i;
    if (current === images.length) {
        current = 0;
    } else if (current < 0) {
        current = images.length - 1;
    }
}

function hideImages() {
    for (var i = 0, max = images.length; i < max; i++) {
        if (i !== 0) {
            images[i].style.display = 'none';
        }
    }
}

function toggleImages(i) {
    images[current].style.display = 'none';
    incrementCurrentImage(i);
    images[current].style.display = 'block';
}

export function generate360view(containerId) {
    const container = document.getElementById(containerId);
    const handler = Handler.getHandler(container);

    hideImages();

    handler.subscribe(toggleImages);
}
