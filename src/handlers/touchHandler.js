let startingPosition, touchStart, touchEnd, touchMove;

function setStartingPosition(event) {
    startingPosition = event.touches[0].pageX;
}

function clearPreviousPosition() {
    startingPosition = undefined;
}

function calculatePositions(event) {
    let actual;

    if (startingPosition) {
        actual = (event.touches[0].pageX - startingPosition) * 100;
    } else {
        startingPosition = actual = event.touches[0].pageX * 100;
    }

    return {
        pageX: event.touches[0].pageX,
        actual
    };
}

function probe(o) {
    if (Math.abs(o.pageX - startingPosition) < 5) {
        return false;
    }
    return true;
}

function setStartingPosition(o) {
    startingPosition = o.pageX;
}

function getActualPosition(o) {
    return o.actual;
}

function getTouchMove() {
    return touchMove;
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
    touchStart = Rx.Observable.fromEvent(container, 'touchstart')
        .do(setStartingPosition);

    touchEnd = Rx.Observable.fromEvent(container, 'touchend')
        .do(clearPreviousPosition);

    touchMove = Rx.Observable.fromEvent(container, 'touchmove')
        .map(calculatePositions)
        .filter(probe)
        .do(setStartingPosition)
        .map(getActualPosition)
        .takeUntil(touchEnd);

    return touchStart
        .flatMap(getTouchMove)
        .map(counterMapper);
}
