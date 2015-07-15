define([], function(){
    var utils = {};

    // Returns a value clamped between a and b.
    utils.clamp = function(val, a, b){
        // a should be larger than b
        if (a > b) b = [a, a = b][0]

        if (val < a)
            return a;
        if (val > b)
            return b;
        return val;
    }

    utils.mag = function(a, b, c){
        if (c === undefined){
            return Math.sqrt(a*a + b*b);
        }
        return Math.sqrt(a*a + b*b + c*c);
    }

    return utils;
});
