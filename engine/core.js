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
            var firstVertice = true;
            for (var j = 0; j < obj.vertices.length; j++){

                // Magic
                var relPos = vector3d.create(obj.vertices[j]);
                relPos.subtract(vp.pos);
                relPos.rotate3d(-vp.rot_horz, -vp.rot_vert, 0);

                var los = vector3d.create(0, 1, 0);

                var fracSpanX = relPos.x;
                var fracSpanZ = relPos.z;
                var fullSpanX = -1 * Math.tan(vp.fov / 2) * relPos.y;
                var fullSpanZ = -1 * Math.tan(vp.fov / 3) * relPos.y;

                var canvasPosX = (fracSpanX / fullSpanX + 1) * (canvas.width / 2);
                var canvasPosY = (fracSpanZ / fullSpanZ + 1) * (canvas.height / 2);

                if (firstVertice){
                    context.moveTo(canvasPosX, canvasPosY);
                    firstVertice = false;
                }
                if (canvasPosX < 0 || canvasPosX > canvas.width || canvasPosY < 0 || canvasPosY > canvas.height){
                    context.moveTo(canvasPosX, canvasPosY+1);
                } else{
                    context.lineTo(canvasPosX, canvasPosY+1);
                }
            }
        }

        context.strokeStyle = 'red';
        context.stroke();
    }

    return core;
});
