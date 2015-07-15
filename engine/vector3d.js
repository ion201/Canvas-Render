define([], function(){
    var v3d = {};

    v3d.convertParams = function(a, b, c){
        // Convert parameters to a list of three values for the vector
        // 3 normal values?
        if (a.constructor === Number && b.constructor === Number && c.constructor === Number){
            return [a, b, c];
        }
        // Another vector?
        if ((a.x && a.y && a.z) !== undefined){
            return [a.x, a.y, a.z];
        }
        // A list of 3 values?
        if (a.constructor === Array){
            return a;
        }
        throw new Error('Invalid parameter format');
    }

    v3d.create = function(x, y, z){
        var vec = {};

        var v = v3d.convertParams(x, y, z);
        vec.x = v[0];
        vec.y = v[1];
        vec.z = v[2];

        vec.roundDecimal = function(){
            // Round off values like x = 6e-17 which come from imprecise javascript trig
            var precision = 4;
            vec.x = +vec.x.toFixed(precision);
            vec.y = +vec.y.toFixed(precision);
            vec.z = +vec.z.toFixed(precision);
        }

        vec.mag = function(){
            return Math.sqrt(vec.x*vec.x + vec.y*vec.y + vec.z*vec.z);
        }

        vec.add = function(a, b, c){
            var v = v3d.convertParams(a, b, c);
            vec.x += v[0];
            vec.y += v[1];
            vec.z += v[2];
        }

        vec.subtract = function(a, b, c){
            var v = v3d.convertParams(a, b, c);
            vec.x -= v[0];
            vec.y -= v[1];
            vec.z -= v[2];
        }

        vec.scalarMult = function(val){
            vec.x *= val;
            vec.y *= val;
            vec.z *= val;
            vec.roundDecimal();
        }

        vec.dot = function(a, b, c){
            var v = v3d.convertParams(a, b, c);
            return vec.x*v[0] + vec.y*v[1] + vec.z*v[2];
        }

        vec.projectOn = function(a, b, c){
            // Project vec onto the passed vector
            var other = v3d.create(a, b, c);
            other.scalarMult(vec.dot(other) / (other.mag()*other.mag()));
            return other;
        }

        vec.rotate3d = function(z_rot_1, x_rot, z_rot_2){
            /* Unit: radians
            Rotate around the z-axis, then the x-axis, then the z-axis again
            Sorry y-axis -- nobody likes you


            x rotation:
            (a, b, c)
                ==> (a, b*cosθ + c*sinθ, -b*sinθ + c*cosθ)
            z rotation:
                ==> (a*cosθ + b*sinθ, -a*sinθ + b*cosθ, c)
            */
            if ((z_rot_1 && x_rot && z_rot_2) === undefined){
                throw new Error('Invalid parameter format');
            }

            // Rotation 1: z axis
            if (z_rot_1 !== 0){
                a = vec.x; b = vec.y; c = vec.z;
                vec.x = a * Math.cos(z_rot_1) + b * Math.sin(z_rot_1);
                vec.y = -a * Math.sin(z_rot_1) + b * Math.cos(z_rot_1);
                vec.roundDecimal();
            }

            if (x_rot !== 0){
                // Rotation 2: x axis
                a = vec.x; b = vec.y; c = vec.z;
                vec.y = b * Math.cos(x_rot) + c * Math.sin(x_rot);
                vec.z = -b * Math.sin(x_rot) + c * Math.cos(x_rot);
                vec.roundDecimal();
            }

            if (z_rot_2 !== 0){
                // Rotation 3: z axis (again)
                a = vec.x; b = vec.y; c = vec.z;
                vec.x = a * Math.cos(z_rot_2) + b * Math.sin(z_rot_2);
                vec.y = -a * Math.sin(z_rot_2) + b * Math.cos(z_rot_2);
                vec.roundDecimal();
            }
        }

        return vec;
    }

    return v3d;
})
