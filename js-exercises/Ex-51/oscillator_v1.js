function RungeKutta4(f, T0, dt, t0, tf) {
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
            k1[j1] = dt * f(t[i - 1], T[i - 1])[j1];
        }
        for (let j2 = 0; j2 < T0.length; j2++) {
            let T_1 = [T[i - 1][0] + k1[0] / 2, T[i - 1][1] + k1[1] / 2];
            k2[j2] = dt * f(t[i - 1] + dt / 2, T_1)[j2];
        }
        for (let j3 = 0; j3 < T0.length; j3++) {
            let T_2 = [T[i - 1][0] + k2[0] / 2, T[i - 1][1] + k2[1] / 2];
            k3[j3] = dt * f(t[i - 1] + dt / 2, T_2)[j3];        
        }
        for (let j4 = 0; j4 < T0.length; j4++) {
            let T_3 = [T[i - 1][0] + k3[0], T[i - 1][1] + k3[1]];
            k4[j4] = dt * f(t[i - 1] + dt / 2, T_3)[j4];        
        }
        for (let j = 0; j < T0.length; j++) {
            T[i][j] = T[i - 1][j] + (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]) / 6;
        }

    }
    return [T, t];
}

let m = 1;

function f(v) {
    return 0;
}

function F(t) {
    return 0;
}

function s(u) {
    return u;
}
function rhs(t, u) {
    let xu = u[0];
    let vu = u[1];

    return [vu, (F(t) - f(vu) - s(xu)) / m];
}

soln = RungeKutta4(rhs, [1, 0], Math.PI / 20, 0, 10 * Math.PI);
console.log(soln[0]);

let exact = []
for (let i = 0; i < soln[1].length; i++) {
    t_e = soln[1][i];
    exact[i] = [Math.cos(t_e), -Math.sin(t_e)];
}

console.log(exact);


function setup() {
    createCanvas(1600, 800);
    [pointsxu, pointsvu, pointsexu, pointsexv, pointsnumphase, pointsexphase, pointsK, pointsU] = [[], [], [], [], [], [], [], []];

    for (i = 0; i < soln[1].length; i++) {
        pointsxu[i] = new GPoint(soln[1][i], soln[0][i][0]);
        pointsvu[i] = new GPoint(soln[1][i], soln[0][i][1]);
        pointsexu[i] = new GPoint(soln[1][i], exact[i][0]);
        pointsexv[i] = new GPoint(soln[1][i], exact[i][1]);
        pointsnumphase[i] = new GPoint(soln[0][i][0], soln[0][i][1]);
        pointsexphase[i] = new GPoint(exact[i][0], exact[i][1]);
        pointsU[i] = new GPoint(soln[1][i], Math.pow(soln[0][i][0], 2) / 2);        
        pointsK[i] = new GPoint(soln[1][i], Math.pow(soln[0][i][1], 2) / 2);
    }

    plotxu = new GPlot(this);
    plotxu.setPos(0, 0);
    plotxu.setOuterDim(width / 4, height / 2);

    plotxu.setPoints(pointsxu);

    plotxu.setTitleText("Position (numerical)");
    plotxu.getXAxis().setAxisLabelText("t");
    plotxu.getYAxis().setAxisLabelText("u(t)");

    plotxu.defaultDraw();

    plotvu = new GPlot(this);
    plotvu.setPos(0, 400);
    plotvu.setOuterDim(width / 4, height / 2);

    plotvu.setPoints(pointsvu);

    plotvu.setTitleText("Velocity (numerical)");
    plotvu.getXAxis().setAxisLabelText("t");
    plotvu.getYAxis().setAxisLabelText("u'(t)");

    plotvu.defaultDraw();

    plotexu = new GPlot(this);
    plotexu.setPos(400, 0);
    plotexu.setOuterDim(width / 4, height / 2);

    plotexu.setPoints(pointsexu);

    plotexu.setTitleText("Position (exact)");
    plotexu.getXAxis().setAxisLabelText("t");
    plotexu.getYAxis().setAxisLabelText("u(t)");

    plotexu.defaultDraw();

    plotexv = new GPlot(this);
    plotexv.setPos(400, 400);
    plotexv.setOuterDim(width / 4, height / 2);

    plotexv.setPoints(pointsexv);

    plotexv.setTitleText("Velocity (exact)");
    plotexv.getXAxis().setAxisLabelText("t");
    plotexv.getYAxis().setAxisLabelText("u'(t)");

    plotexv.defaultDraw();

    plotnumphase = new GPlot(this);
    plotnumphase.setPos(800, 0);
    plotnumphase.setOuterDim(width / 4, height / 2);

    plotnumphase.setPoints(pointsnumphase);

    plotnumphase.setTitleText("Position vs Velocity (numerical)");
    plotnumphase.getXAxis().setAxisLabelText("u(t)");
    plotnumphase.getYAxis().setAxisLabelText("u'(t)");

    plotnumphase.defaultDraw();

    plotexphase = new GPlot(this);
    plotexphase.setPos(800, 400);
    plotexphase.setOuterDim(width / 4, height / 2);

    plotexphase.setPoints(pointsexphase);

    plotexphase.setTitleText("Position vs Velocity (exact)");
    plotexphase.getXAxis().setAxisLabelText("u(t)");
    plotexphase.getYAxis().setAxisLabelText("u'(t)");

    plotexphase.defaultDraw();

    plotU = new GPlot(this);
    plotU.setPos(1200, 0);
    plotU.setOuterDim(width / 4, height / 2);

    plotU.setPoints(pointsU);

    plotU.setTitleText("PE (numerical)");
    plotU.getXAxis().setAxisLabelText("t");
    plotU.getYAxis().setAxisLabelText("U(t)");

    plotU.defaultDraw();

    plotK = new GPlot(this);
    plotK.setPos(1200, 400);
    plotK.setOuterDim(width / 4, height / 2);

    plotK.setPoints(pointsK);

    plotK.setTitleText("KE (numerical)");
    plotK.getXAxis().setAxisLabelText("t");
    plotK.getYAxis().setAxisLabelText("K(t)");

    plotK.defaultDraw();

    }

function draw() {
//  background(220);
}