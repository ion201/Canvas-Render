define(['engine/Canvas-Render'], function(CR) {
    // TODO: make a file format for these objects

    var K_FORWARD = 'w';
    var K_BACKWARD = 's';
    var K_LEFT = 'a';
    var K_RIGHT = 'd';
    var K_UP = ' ';
    var K_DOWN = 'Shift';
    var K_ESCAPE = 'Escape';

    var VELOCITY = .1;
    var SENSITIVITY = 1/500;

    var mouseLock = false;

    function onKeyPress(event){
        if (event.key == K_FORWARD)
            CR.moveView2d(VELOCITY, 0);
        if (event.key == K_BACKWARD)
            CR.moveView2d(-VELOCITY, 0);
        if (event.key == K_LEFT)
            CR.moveView2d(VELOCITY, Math.PI / 2);
        if (event.key == K_RIGHT)
            CR.moveView2d(-VELOCITY, Math.PI / 2);
        if (event.key == K_UP)
            CR.moveViewRelAxis(VELOCITY, 'z');
        if (event.key == K_DOWN)
            CR.moveViewRelAxis(-VELOCITY, 'z');

    }

    var prevX = -1;
    var prevY = -1;
    function onMouseMove(event){
        var dx = prevX - event.clientX;
        var dy = event.clientY - prevY;
        if (prevX !== -1 && prevY !== -1)
            CR.rotateView(dx*SENSITIVITY, dy*SENSITIVITY);
        prevX = event.clientX;
        prevY = event.clientY;
    }

    function onMouseDown(event){
        prevX = -1;
        prevY = -1;
        document.addEventListener('mousemove', onMouseMove);
    }

    function onMouseUp(event){
        document.removeEventListener('mousemove', onMouseMove);
    }


    CR.addObject('white',
                [[-1, 2, -1],
                [1, 2, -1],
                [-1, 2.5, -1],
                [-1, 2, -1],
                [1, 2.5, -1],
                [1, 2, -1],
                [1, 2, 1],
                [-1, 2, 1],
                [-1, 2, -1],
                [-1, 2.5, 1],
                [-1, 2, 1],
                [1, 2.5, 1],
                [1, 2.5, -1],
                [-1, 2.5, -1],
                [-1, 2.5, 1],
                [1, 2.5, 1],
                [1, 2, 1],
                [1, 2.5, -1],
                [-1, 2.5, 1]]);
    CR.start(30);

    document.addEventListener('keydown', onKeyPress);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp );
});
