var images = document.getElementsByTagName('img');
var container;

export function generate360view(containerId) {
    container = document.getElementById(containerId);

    function getMovementX(event) {
        return event.movementX || event.mozMovementX;
    }
    function getMouseMove(ev) {
        ev.preventDefault();
        return mouseMove;
    }
    function every10steps(x) {
        return x % 2 == 0;
    }
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
    hideImages();
    var mouseDown = Rx.Observable.fromEvent(container, 'mousedown');
    var mouseUp   = Rx.Observable.fromEvent(container, 'mouseup');
    var mouseMove = Rx.Observable.fromEvent(container, 'mousemove')
                        .map(getMovementX)
                        .takeUntil(mouseUp);
    var mouseDrag = mouseDown
                        .flatMap(getMouseMove)
                        .filter(every10steps)
                        .map(function(x){
                            return x >= 0 ? 1 : -1;
                        });
    var current = 0;
    mouseDrag.subscribe(function(i) {
        images[current].style.display = 'none';
        incrementCurrentImage(i);
        images[current].style.display = 'block';
    });
}
