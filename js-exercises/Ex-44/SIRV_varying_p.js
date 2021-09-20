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
function p(t) {
    if (t > 6 && t < 12) 
        return 0.1;
    return 0;
}

function D(sys, t) {
    let S = sys[0];
    let I = sys[1];
    let R = sys[2];
    let V = sys[3];

    return [-b * S * I - p(t) * S, b * S * I - v * I, v * I, p(t) * S];
}

soln = ForwardEuler(D, [1500, 1, 0, 0], 0.5, 0, 60);
console.log(soln);
function setup() {
    createCanvas(800, 800);
    pointsS = [];
    pointsI = [];
    pointsR = [];
    pointsV = [];

    for (i = 0; i < soln[1].length; i++) {
        pointsS[i] = new GPoint(soln[1][i], soln[0][i][0]);
        pointsI[i] = new GPoint(soln[1][i], soln[0][i][1]);
        pointsR[i] = new GPoint(soln[1][i], soln[0][i][2]);
        pointsV[i] = new GPoint(soln[1][i], soln[0][i][3]);
    }

    plotS = new GPlot(this);
    plotS.setPos(0, 0);
    plotS.setOuterDim(width / 2, height / 2);

    plotS.setPoints(pointsS);

    plotS.setTitleText("Susceptibles");
    plotS.getXAxis().setAxisLabelText("t");
    plotS.getYAxis().setAxisLabelText("S(t)");

    plotS.defaultDraw();

    plotI = new GPlot(this);
    plotI.setPos(400, 0);
    plotI.setOuterDim(width / 2, height / 2);

    plotI.setPoints(pointsI);

    plotI.setTitleText("Infected");
    plotI.getXAxis().setAxisLabelText("t");
    plotI.getYAxis().setAxisLabelText("I(t)");

    plotI.defaultDraw();

    plotR = new GPlot(this);
    plotR.setPos(0, 400);
    plotR.setOuterDim(width / 2, height / 2);

    plotR.setPoints(pointsR);

    plotR.setTitleText("Recovered");
    plotR.getXAxis().setAxisLabelText("t");
    plotR.getYAxis().setAxisLabelText("R(t)");

    plotR.defaultDraw();

    plotV = new GPlot(this);
    plotV.setPos(400, 400);
    plotV.setOuterDim(width / 2, height / 2);

    plotV.setPoints(pointsV);

    plotV.setTitleText("Vaccinated");
    plotV.getXAxis().setAxisLabelText("t");
    plotV.getYAxis().setAxisLabelText("V(t)");

    plotV.defaultDraw();
    }

function draw() {
//  background(220);
}