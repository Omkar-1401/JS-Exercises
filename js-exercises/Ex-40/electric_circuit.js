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

let omega = Math.sqrt(3.5);
function D(sys, t) {
    let q = sys[0];
    let i = sys[1];

    return [i, 2 * Math.sin(Math.sqrt(omega) * t) - 0.2 * i - q / 0.25];
}

soln = ForwardEuler(D, [1, 1], 2 * Math.PI / (60 * omega), 0, 10 * 2 * Math.PI / omega);
console.log(soln);
function setup() {
    createCanvas(800, 400);
    pointsq = [];
    pointsi = [];

    for (i = 0; i < soln[1].length; i++) {
        pointsq[i] = new GPoint(soln[1][i], soln[0][i][0]);
        pointsi[i] = new GPoint(soln[1][i], soln[0][i][1]);
    }

    plotq = new GPlot(this);
    plotq.setPos(0, 0);
    plotq.setOuterDim(width / 2, height);

    plotq.setPoints(pointsq);

    plotq.setTitleText("Charge");
    plotq.getXAxis().setAxisLabelText("t");
    plotq.getYAxis().setAxisLabelText("q(t)");

    plotq.defaultDraw();

    ploti = new GPlot(this);
    ploti.setPos(400, 0);
    ploti.setOuterDim(width / 2, height);

    ploti.setPoints(pointsi);

    ploti.setTitleText("Current");
    ploti.getXAxis().setAxisLabelText("t");
    ploti.getYAxis().setAxisLabelText("i(t)");

    ploti.defaultDraw();

    }

function draw() {
//  background(220);
}