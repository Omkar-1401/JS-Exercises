function ForwardEuler(f, x0, dt, t0, tf, E) {
    let n = Math.floor((tf - t0) / dt);
    let x = new Array(n);
    let t = new Array(n);  
    x[0] = x0;
    t[0] = t0;

    for (let i = 1; i < n + 1; i++) {
        t[i] = t[i - 1] + dt;
        x[i] = x[i - 1] + dt * f(x[i - 1], t[i - 1], E);
    }
    return [x, t];
}
let x0 = 500;
let q = 0.1;

function D(x, t, E) {
    return x * (1 - x / 100) / 10 - q * x * E;
}

let soln = [];

for (let i = 0; i < 2; i++) {
    soln[i] = [];
    for (let j = 0; j < 2; j++) {
        soln[i][j] = ForwardEuler(D, x0, 0.1, 0, 10, 0.05 * Math.pow(10, 2 * i + j));
    }
}

function setup() {
    createCanvas(800, 800);
    points = [];

    for (let k = 0; k < 2; k++) {
        points[k] = [];
        for (let j = 0; j < 2; j++) {
            points[k][j] = [];
            for (let i = 0; i < soln[k][j][1].length; i++){
                points[k][j][i] = new GPoint(soln[k][j][1][i], soln[k][j][0][i]);
            }
        }
    }

    for (let k = 0; k < 2; k++) {
        for (let j = 0; j < 2; j++) {
            plot = new GPlot(this);
            plot.setPos(k * 400, j * 400);
            plot.setOuterDim(width / 2, height / 2);

            plot.setPoints(points[k][j]);
            
            E = 0.05 * Math.pow(10, 2 * k + j);
            plot.setTitleText("Population of fish: E = " + E);
            plot.getXAxis().setAxisLabelText("t");
            plot.getYAxis().setAxisLabelText("x(t)");

            plot.defaultDraw();
        }
    }

}

function draw() {
//  background(220);
}