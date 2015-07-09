require.config({
    baseUrl: 'engine'
});

define(['core', 'utils'], function(core, utils){

    CR = {};

    var canvas = document.getElementById('Canvas-Render');
    var context = canvas.getContext('2d')

    var scene = [];

    var bgColor = 'black';
    CR.setBgColor = function(newColor){
        bgColor = newColor;
    }

    CR.addObject = function(color, vertices){
        var newObj = {'color': color, 'vertices': vertices};
        scene.push(newObj);
    }

    CR.loadMap = function(filename){
        // TODO
    }

    var viewport = {};
    viewport.x = 0;
    viewport.y = 0;
    viewport.z = 0;
    viewport.yaw = 0;
    viewport.pitch = 0;
    viewport.fov = 90;

    CR.setFov = function(fov){
        // 60 < fov < 120;
        viewport.fov = utils.clamp(fov, 60, 120);
    }

    var inframe = false;
    CR.coreloop = function(){
        if (CR.inframe) return;
        var inframe = true;

        context.fillStyle = bgColor;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        core.renderScene(canvas, scene, viewport);

        var inframe = false;
    }

    CR.go = function(fps){
        setInterval(CR.coreloop, 1000 / fps);
    }
    return CR
});
