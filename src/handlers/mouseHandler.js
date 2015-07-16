var mouseUp, mouseDown, mouseMove;

function getMovementX(event) {
    return event.movementX || event.mozMovementX;
}

function getMouseMove(ev) {
    ev.preventDefault();
    return mouseMove;
}

function probe(x) {
    return x % 2 === 0;
}

function counterMapper(x) {
    if (x > 0) {
        return 1;
    } else if (x < 0) {
        return -1;
    }

    return x;
}

export function getHandler(container) {
    mouseDown = Rx.Observable.fromEvent(container, 'mousedown');
    mouseUp = Rx.Observable.fromEvent(container, 'mouseup');

    mouseMove = Rx.Observable.fromEvent(container, 'mousemove')
        .map(getMovementX)
        .takeUntil(mouseUp);

    return mouseDown
        .flatMap(getMouseMove)
        .filter(probe)
        .map(counterMapper);
}
