define([], function(){
    var utils = {};

    // Returns a value clamped between a and b.
    utils.clamp = function(val, a, b){
        // Swap a and b
        if (a > b) b = [a, a = b][0]

        if (val < a)
            return a;
        if (val > b)
            return b;
        return val;
    }

    return utils;
});
