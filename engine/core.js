define(['vector3d', 'utils'], function(vector3d, utils){

    var core = {}

    core.renderScene = function(canvas, scene, vp){
        context = canvas.getContext('2d');
        context.beginPath();
        var w = canvas.width;
        var h = canvas.height;

        for (var i = 0; i < scene.length; i++){
            //context.moveTo(50, 50);
            //context.lineTo(51, 50);
            var obj = scene[i];
            context.strokeStyle = obj.color;
            for (var j = 0; j < obj.vertices.length; j++){
                var relPos = vector3d(obj.vertices[j]);
                relPos.subtract(vp.pos);

                // Project the relative position of the point onto the viewport's direct line of sight
                var los = vector3d(Math.sin(vp.rot_horz)*Math.cos(vp.rot_vert), Math.cos(vp.rot_horz)*Math.cos(vp.rot_vert), Math.sin(vp.rot_vert));
                var proj = relPos.projectOn(los)

                // Rotate projection vector to align along the y-axis
                // Rotated line-of-sight unit vector is (0, 1, 0)
                proj.rotate3d(-vp.rot_horz, -vp.rot_vert, 0);

            }
        }

        context.strokeStyle = 'red';
        context.stroke();
    }

    return core;
});
