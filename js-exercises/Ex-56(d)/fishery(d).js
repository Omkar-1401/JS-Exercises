function RungeKutta4(f, T0, dt, t0, tf, g) {
    let n = Math.floor((tf - t0) / dt);
    let T = new Array(n);
    let t = new Array(n);  
    T[0] = T0;
    t[0] = t0;

    for (let i = 1; i < n + 1; i++) {
        t[i] = t[i - 1] + dt;
        T[i] = [];
        let [k1, k2, k3, k4] = [[], [], [], []];

        for (let j1 = 0; j1 < T0.length; j1++) {
            k1[j1] = dt * f(t[i - 1], T[i - 1], g)[j1];
        }
        for (let j2 = 0; j2 < T0.length; j2++) {
            let T_1 = [T[i - 1][0] + k1[0] / 2, T[i - 1][1] + k1[1] / 2];
            k2[j2] = dt * f(t[i - 1] + dt / 2, T_1, g)[j2];
        }
        for (let j3 = 0; j3 < T0.length; j3++) {
            let T_2 = [T[i - 1][0] + k2[0] / 2, T[i - 1][1] + k2[1] / 2];
            k3[j3] = dt * f(t[i - 1] + dt / 2, T_2, g)[j3];        
        }
        for (let j4 = 0; j4 < T0.length; j4++) {
            let T_3 = [T[i - 1][0] + k3[0], T[i - 1][1] + k3[1]];
            k4[j4] = dt * f(t[i - 1] + dt / 2, T_3, g)[j4];        
        }
        for (let j = 0; j < T0.length; j++) {
            T[i][j] = T[i - 1][j] + (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]) / 6;
        }

    }
    return [T, t];
}

function D(t, sys, g) {
    let x = sys[0];
    let E = sys[1];

    return [x * (1 - x / 100) / 10 - q * x * E, g * (p * q * x * E - c * Math.pow(E, 2) / 2)];
}

let [x0, E0, p, c, q] = [500, 0.5, 10, 0.3, 0.1];

soln1 = RungeKutta4(D, [x0, E0], 0.001, 0, 1, 1 / 2);
console.log(soln1);
soln2 = RungeKutta4(D, [x0, E0], 0.001, 0, 1, 1E5);
console.log(soln2);

function setup() {
    createCanvas(800, 400);
    [points1, points2] = [[], []];

    for (i = 0; i < soln1[1].length; i++) {
        points1[i] = new GPoint(soln1[0][i][0], soln1[0][i][1]);
        points2[i] = new GPoint(soln2[0][i][0], soln2[0][i][1]);
    }

    plot1 = new GPlot(this);
    plot1.setPos(0, 0);
    plot1.setOuterDim(width / 2, height);

    plot1.setPoints(points1);

    plot1.setTitleText("Gamma = 0.5");
    plot1.getXAxis().setAxisLabelText("x(t)");
    plot1.getYAxis().setAxisLabelText("E(t)");

    plot1.defaultDraw();

    plot2 = new GPlot(this);
    plot2.setPos(400, 0);
    plot2.setOuterDim(width / 2, height);

    plot2.setPoints(points2);

    plot2.setTitleText("Gamma -> infinity ");
    plot2.getXAxis().setAxisLabelText("x(t)");
    plot2.getYAxis().setAxisLabelText("E(t)");

    plot2.defaultDraw();

    }

function draw() {
//  background(220);
}