let startingPosition;
const tolerance = 7;

function getEventPageX(event) {
    return event.pageX || event.touches[0].pageX;
}

function setStartingPosition(event) {
    startingPosition = getEventPageX(event);
}

function clearPreviousPosition() {
    startingPosition = undefined;
}

function getActualPosition(o) {
    return o.actual;
}

function preventDefault(event) {
    event.preventDefault();
}

function calculatePositions(event) {
    let actual, pageX = getEventPageX(event);

    if (startingPosition) {
        actual = (pageX - startingPosition) * 100;
    } else {
        startingPosition = actual = pageX * 100;
    }

    return {
        pageX,
        actual
    };
}

function probe(o) {
    if (Math.abs(o.pageX - startingPosition) < tolerance) {
        return false;
    }
    return true;
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
    const start = Rx.Observable.merge(
        Rx.Observable.fromEvent(container, 'mousedown'),
        Rx.Observable.fromEvent(container, 'touchstart')
    )
        .do(preventDefault)
        .do(setStartingPosition);

    const end = Rx.Observable.merge(
        Rx.Observable.fromEvent(container, 'mouseup'),
        Rx.Observable.fromEvent(container, 'touchend')
    )
        .do(preventDefault)
        .do(clearPreviousPosition);

    const move = Rx.Observable.merge(
        Rx.Observable.fromEvent(container, 'mousemove'),
        Rx.Observable.fromEvent(container, 'touchmove')
    )
        .do(preventDefault)
        .map(calculatePositions)
        .filter(probe)
        .do(setStartingPosition)
        .map(getActualPosition)
        .takeUntil(end);

    return start
        .flatMap(move)
        .map(counterMapper);
}
