import * as Handler from '../handlers/handler.js';

let current = 0, images;

function incrementCurrentImage(i) {
    current += i;
    if (current === images.length) {
        current = 0;
    } else if (current < 0) {
        current = images.length - 1;
    }
}

function hideImages() {
    for (var i = 1, max = images.length; i < max; i++) {
        images[i].style.display = 'none';
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
    images = document.querySelector("#" + containerId + " img");
    hideImages();

    handler.subscribe(toggleImages);
}
