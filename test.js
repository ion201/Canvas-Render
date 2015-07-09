define(['engine/Canvas-Render'], function(CR) {
    CR.addObject('white',
                [[-1, 2, 0],
                [1, 2, 0],
                [-1, 2.5, 1],
                [1, 2.5, 1]]);
    CR.go(30);
});
