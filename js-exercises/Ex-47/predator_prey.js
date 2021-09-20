function ForwardEuler(f, T0, dt, t0, tf) {
    let n = Math.floor((tf - t0) / dt);
    let T = new Array(n);
    let t = new Array(n);  
    T[0] = T0;
    t[0] = t0;

    for (let i = 1; i < n + 1; i++) {
        t[i] = t[i - 1] + dt;
        T[i] = [];
        for (let j = 0; j < T0.length; j++) {
            T[i][j] = T[i - 1][j] + dt * f(T[i - 1], t[i - 1])[j];
        }
    }
    return [T, t];
}

let r = 1;
let m = 1;
let a = 0.3;
let b = 0.2;

function D(sys, t) {
    let x = sys[0];
    let y = sys[1];

    return [r * x - a * x *y, -m * y + b * x * y];
}

soln = ForwardEuler(D, [1, 1], 0.1, 0, 20);

function setup() {
    createCanvas(800, 400);
    pointsx = [];
    pointsy = [];

    for (i = 0; i < soln[1].length; i++) {
        pointsx[i] = new GPoint(soln[1][i], soln[0][i][0]);
        pointsy[i] = new GPoint(soln[1][i], soln[0][i][1]);
    }

    plotx = new GPlot(this);
    plotx.setPos(0, 0);
    plotx.setOuterDim(width / 2, height);

    plotx.setPoints(pointsx);

    plotx.setTitleText("Prey population dynamics");
    plotx.getXAxis().setAxisLabelText("t");
    plotx.getYAxis().setAxisLabelText("x(t)");

    plotx.defaultDraw();

    ploty = new GPlot(this);
    ploty.setPos(400, 0);
    ploty.setOuterDim(width / 2, height);

    ploty.setPoints(pointsy);

    ploty.setTitleText("Predator population dynamics");
    ploty.getXAxis().setAxisLabelText("t");
    ploty.getYAxis().setAxisLabelText("y(t)");

    ploty.defaultDraw();
}
function draw() {
//  background(220);
}