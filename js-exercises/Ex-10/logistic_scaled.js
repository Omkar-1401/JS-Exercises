function ForwardEuler(f, v0, dT, T0, Tf) {
    let n = Math.floor((Tf - T0) / dT);
    let v = new Array(n);
    let T = new Array(n);    
    v[0] = v0;
    T[0] = T0;

    for (let i = 1; i < n + 1; i++) {
        T[i] = T[i - 1] + dT;
        v[i] = v[i - 1] + dT * f(v[i - 1], T[i - 1]);
    }
    return [v, T];
}

function D(v, T) {
    return v * (1 - v);
}

let v0 = 0.05;
let T = 200;

//1.5, 1.8, 2.1, 2.4, 2.7, 3
soln = [[ForwardEuler(D, v0, 1.5, 0, T), ForwardEuler(D, v0, 1.8, 0, T)], [ForwardEuler(D, v0, 2.1, 0, T), ForwardEuler(D, v0, 2.4, 0, T)], [ForwardEuler(D, v0, 2.7, 0, T), ForwardEuler(D, v0, 3, 0, T)]];
console.log(soln[1]);
//console.log('Numerical solution: ', soln[0]);

function setup() {
    createCanvas(1200, 800);
    // Create a new plot and set its position on the screen
    points = [];
    for (let k = 0; k < 3; k++) {
        points[k] = [];
        for (let j = 0; j < 2; j++) {
            points[k][j] = [];
            for (let i = 0; i < soln[k][j][1].length; i++){
                points[k][j][i] = new GPoint(soln[k][j][1][i], soln[k][j][0][i]);
            }
        }
    }
    console.log(points);

    for (let k = 0; k < 3; k++) {
        for (let j = 0; j < 2; j++) {
            plot = new GPlot(this);
            plot.setPos(k * 400, j * 400);
            plot.setOuterDim(width / 3, height / 2);

            plot.setPoints(points[k][j]);
            
            alpha = 1.5 + 0.3 * (j + 2 * k);
            plot.setTitleText("Logistic map: R = 1, alpha = " + alpha);
            plot.getXAxis().setAxisLabelText("t");
            plot.getYAxis().setAxisLabelText("u");

            plot.defaultDraw();

            
        }
    }
    
    }

function draw() {
//  background(220);
}




