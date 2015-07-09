define([], function(){

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
                var p = obj.vertices[j];

                var d = Math.pow((p[0] - vp.x)*(p[0] - vp.x) + (p[1] - vp.y)*(p[1] - vp.y), 0.5);
                var angXY = Math.acos((p[0] - vp.x) / d * Math.cos(vp.yaw - vp.fov / 2) + (p[1] - vp.y) / d * Math.sin(vp.yaw - vp.fov / 2));
            }
        }

        context.strokeStyle = 'red';
        context.stroke();
    }

    return core;
});
