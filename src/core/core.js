import * as MouseHandler from '../handlers/mouseHandler.js';
import * as TouchHandler from '../handlers/touchHandler.js';

var container,
    current = 0,
    images = document.getElementsByTagName('img');

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

        images[i].style.position = 'absolute';
    }
}

function toggleImages(i) {
    images[current].style.display = 'none';
    incrementCurrentImage(i);
    images[current].style.display = 'block';
}

export function generate360view(containerId) {
    var mouseHandler, touchHandler;

    container = document.getElementById(containerId);
    hideImages();

    mouseHandler = MouseHandler.getHandler(container);
    touchHandler = TouchHandler.getHandler(container);

    mouseHandler.subscribe(toggleImages);
    touchHandler.subscribe(toggleImages);
}
