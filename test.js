define(['engine/Canvas-Render'], function(CR) {
    // TODO: make a file format for these objects

    KEYS = {};
    KEYS.K_FORWARD = {'key': 'w', 'state': 0};
    KEYS.K_BACKWARD = {'key': 's', 'state': 0};
    KEYS.K_LEFT = {'key': 'a', 'state': 0};
    KEYS.K_RIGHT = {'key': 'd', 'state': 0};
    KEYS.K_UP = {'key': ' ', 'state': 0};
    KEYS.K_DOWN = {'key': 'shift', 'state': 0};
    KEYS.K_PAUSE = {'key': 'escape', 'state': 0, 'istoggle': true};

    var VELOCITY = .1;
    var SENSITIVITY = 1/350;

    var mouseLock = false;

    function onKeyRelease(event){
        for (var prop in KEYS){
            if (event.key.toLowerCase() === KEYS[prop].key && KEYS.hasOwnProperty(prop)){
                if (! KEYS[prop].istoggle)
                    KEYS[prop].state = 0;
            }
        }
    }

    function onKeyPress(event){
        for (var prop in KEYS){
            if (event.key.toLowerCase() === KEYS[prop].key && KEYS.hasOwnProperty(prop)){
                if (KEYS[prop].istoggle && KEYS[prop].state === 1){
                    KEYS[prop].state = 0;
                } else{
                    KEYS[prop].state = 1;
                }
            }
        }
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
        if (KEYS.K_PAUSE.state === 1){
            return;
        }

        prevX = -1;
        prevY = -1;
        document.addEventListener('mousemove', onMouseMove);
    }

    function onMouseUp(event){
        document.removeEventListener('mousemove', onMouseMove);
    }

    function inputLoop(){
        if (KEYS.K_PAUSE.state === 1)
            return;
        if (KEYS.K_FORWARD.state === 1)
            CR.moveView2d(VELOCITY, 0);
        if (KEYS.K_BACKWARD.state === 1)
            CR.moveView2d(-VELOCITY, 0);
        if (KEYS.K_LEFT.state === 1)
            CR.moveView2d(VELOCITY, Math.PI / 2);
        if (KEYS.K_RIGHT.state === 1)
            CR.moveView2d(-VELOCITY, Math.PI / 2);
        if (KEYS.K_UP.state === 1)
            CR.moveViewRelAxis(VELOCITY, 'z');
        if (KEYS.K_DOWN.state === 1)
            CR.moveViewRelAxis(-VELOCITY, 'z');
    }

    CR.addObject('white',
                [[-1, 2, -1],
                [1, 2, -1],
                [-1, 2.5, -1],
                [1, 2.5, -1],
                [-1, 2, 1],
                [1, 2, 1],
                [-1, 2.5, 1],
                [1, 2.5, 1]]);

    var FPS = 30;

    CR.setFov(Math.PI / 2);  //Radians

    CR.start(FPS);

    document.addEventListener('keydown', onKeyPress);
    document.addEventListener('keyup', onKeyRelease);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp );

    setInterval(inputLoop, 1000 / FPS);
});
