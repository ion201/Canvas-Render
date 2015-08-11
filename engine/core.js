define(['vector3d', 'utils'], function(vector3d, utils){

    var core = {}

    core.renderScene = function(canvas, scene, vp){
        context = canvas.getContext('2d');
        var w = canvas.width;
        var h = canvas.height;

        for (var i = 0; i < scene.length; i++){
            var obj = scene[i];
            var points = [];

            obj.vertices.sort(function(a, b){
                return vp.pos.subtractNoMod(b).mag() - vp.pos.subtractNoMod(a).mag();
            });

            for (var j = 0; j < obj.vertices.length; j++){

                var relPos = vector3d.create(obj.vertices[j]);
                relPos.subtract(vp.pos);
                relPos.rotate3d(-vp.rot_horz, -vp.rot_vert, 0);

                var fracSpanX = relPos.x;
                var fracSpanZ = relPos.z;
                var sign = (relPos.y > 0 ? -1 : 1)
                var fullSpanX = sign * Math.tan(vp.fov / 2) * relPos.y;
                var fullSpanZ = sign * Math.tan(vp.fov / 3) * relPos.y;

                if (relPos.y <= 0){
                    fracSpanX = fullSpanX - fracSpanX;
                    fracSpanZ = fullSpanZ - fracSpanZ;
                }

                var canvasPosX = (fracSpanX / fullSpanX + 1) * (canvas.width / 2);
                var canvasPosY = (fracSpanZ / fullSpanZ + 1) * (canvas.height / 2);

                points.push({'x': canvasPosX, 'y': canvasPosY, 'behindView': relPos.y <= 0});
            }

            context.strokeStyle = 'red';
            context.fillStyle = obj.color;
            for (var i = 0; i < points.length; i++){
                for (var j = i+1; j < points.length; j++){
                    for (var k = j+1; k < points.length; k++){
                        if (points[i].behindView &&
                                points[j].behindView &&
                                points[k].behindView){
                            continue;
                        }
                        context.beginPath();
                        context.moveTo(points[i].x, points[i].y);
                        context.lineTo(points[j].x, points[j].y);
                        context.lineTo(points[k].x, points[k].y);
                        context.closePath();
                        context.fill();
                        context.stroke();
                    }
                }
            }
        }
    }

    return core;
});
