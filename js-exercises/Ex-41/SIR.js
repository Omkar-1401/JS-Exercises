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

let v = 0.1;
let b = 0.0005;
function D(sys, t) {
    let S = sys[0];
    let I = sys[1];
    let R = sys[2];

    return [-b * S * I, b * S * I - v * I, v * I];
}

soln = ForwardEuler(D, [1500, 1, 0], 0.5, 0, 60);
console.log(soln);
function setup() {
    createCanvas(1200, 400);
    pointsS = [];
    pointsI = [];
    pointsR = [];

    for (i = 0; i < soln[1].length; i++) {
        pointsS[i] = new GPoint(soln[1][i], soln[0][i][0]);
        pointsI[i] = new GPoint(soln[1][i], soln[0][i][1]);
        pointsR[i] = new GPoint(soln[1][i], soln[0][i][2]);
    }

    plotS = new GPlot(this);
    plotS.setPos(0, 0);
    plotS.setOuterDim(width / 3, height);

    plotS.setPoints(pointsS);

    plotS.setTitleText("Susceptibles");
    plotS.getXAxis().setAxisLabelText("t");
    plotS.getYAxis().setAxisLabelText("S(t)");

    plotS.defaultDraw();

    plotI = new GPlot(this);
    plotI.setPos(400, 0);
    plotI.setOuterDim(width / 3, height);

    plotI.setPoints(pointsI);

    plotI.setTitleText("Infected");
    plotI.getXAxis().setAxisLabelText("t");
    plotI.getYAxis().setAxisLabelText("I(t)");

    plotI.defaultDraw();

    plotR = new GPlot(this);
    plotR.setPos(800, 0);
    plotR.setOuterDim(width / 3, height);

    plotR.setPoints(pointsR);

    plotR.setTitleText("Recovered");
    plotR.getXAxis().setAxisLabelText("t");
    plotR.getYAxis().setAxisLabelText("R(t)");

    plotR.defaultDraw();
    }

function draw() {
//  background(220);
}