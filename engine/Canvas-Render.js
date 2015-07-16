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
    viewport.pos = vector3d.create(0, 0, .5);
    viewport.rot_horz = 0;  // Rotation around relative x-axis
    viewport.rot_vert = Math.PI / 18;  // Rotation around relative z-axis
    viewport.fov = Math.PI / 2;  // 90 deg

    CR.setFov = function(fov){
        // 60 < fov < 120;
        viewport.fov = utils.clamp(fov, 60, 120);
    }

    CR.moveView2d = function(d, angle){
        // Angle in radians
        // 0 rad = pointing straight forward.
        // x, y, z portions are dependent on the angle of view
        viewport.pos.x += d * Math.sin(angle + viewport.rot_horz);
        viewport.pos.y += d * Math.cos(angle + viewport.rot_horz);
        //viewport.pos.z += d * Math.sin(viewport.rot_vert) * Math.cos(angle);
    }

    CR.moveViewRelAxis = function(d, axis){
        if (axis == 'x')
            CR.moveView2d(d, Math.PI / 2);
        if (axis == 'y')
            CR.moveView2d(d, 0);
        if (axis == 'z'){
            viewport.pos.z += d;
        }
    }

    CR.rotateView = function(d_horz, d_vert){
        viewport.rot_horz += d_horz;
        viewport.rot_vert += d_vert;
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

    CR.start = function(fps){
        setInterval(CR.coreloop, 1000 / fps);
    }
    return CR
});
