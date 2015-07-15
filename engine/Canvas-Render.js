require.config({
    baseUrl: 'engine'
});

define(['core', 'utils', 'vector3d'], function(core, utils, vector3d){

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
    viewport.pos = vector3d(0, 0, 0);
    viewport.rot_horz = 0;  // Rotation around relative x-axis
    viewport.rot_vert = 0;  // Rotation around relative z-axis
    viewport.fov = Math.PI / 2;  // 90 deg

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
