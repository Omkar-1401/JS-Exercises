function ForwardEuler(f, T0, dt, t0, tf) {
    let n = Math.floor((tf - t0) / dt);
    let T = new Array(n);
    let t = new Array(n);  
    T[0] = T0;
    t[0] = t0;

    for (let i = 1; i < n + 1; i++) {
        t[i] = t[i - 1] + dt;
        T[i] = T[i - 1] + dt * f(T[i - 1], t[i - 1]);
    }
    return [T, t];
}

function D(T, t) {
    return -h * (T - Ts);
}

let Ts = 20;
let h = (180 - 200) / (50 * (20 - 200));

let soln = ForwardEuler(D, 200, 5, 0, 50);
console.log(soln[0][soln[0].length - 1]);
for (i = 1; i < soln[1].length; i++) {
    console.log(soln[1][i - 1], soln[0][i - 1], soln[1][i], soln[0][i]);
}

function setup() {
    createCanvas(400, 400);
    points = [];
    soln = ForwardEuler(D, 200, 5, 0, 50);

    for (i = 0; i < soln[1].length; i++) {
        points[i] = new GPoint(soln[1][i], soln[0][i]);
    }

    plot = new GPlot(this);
    plot.setPos(0, 0);
    plot.setOuterDim(width, height);

    plot.setPoints(points);

    plot.setTitleText("Numerical solution");
    plot.getXAxis().setAxisLabelText("t");
    plot.getYAxis().setAxisLabelText("T");

    plot.defaultDraw();


    }

function draw() {
//  background(220);
}

