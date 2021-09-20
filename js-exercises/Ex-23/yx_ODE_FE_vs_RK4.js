function RungeKutta4(f, u0, h, t0, tf) {
    let n = Math.floor((tf - t0) / h);
    let u = new Array(n);
    let t = new Array(n);  
    u[0] = u0;
    t[0] = t0;

    for (let i = 1; i < n + 1; i++) {
        let k1 = h * f(u[i - 1], t[i - 1]);
        let k2 = h * f(u[i - 1] + k1 / 2, t[i - 1] + h / 2);
        let k3 = h * f(u[i - 1] + k2 / 2, t[i - 1] + h / 2);
        let k4 = h * f(u[i - 1] + k3, t[i - 1] + h / 2);

        t[i] = t[i - 1] + h;
        u[i] = u[i - 1] + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
    }
    return [u, t];
}

function ForwardEuler(f, u0, dt, t0, tf) {
    let n = Math.floor((tf - t0) / dt);
    let u = new Array(n);
    let t = new Array(n);  
    u[0] = u0;
    t[0] = t0;

    for (let i = 1; i < n + 1; i++) {
        t[i] = t[i - 1] + dt;
        u[i] = u[i - 1] + dt * f(u[i - 1], t[i - 1]);
    }
    return [u, t];
}

function D(y, x) {
    return 1 / (2 * (y - 1));
}

let e = 0.001;

let soln1 = RungeKutta4(D, 1 + Math.sqrt(e), 0.01, 0, 4);
let soln2 = ForwardEuler(D, 1 + Math.sqrt(e), 0.01, 0, 4);

let exact = [];
for (let i = 0; i < soln1[1].length; i++) {
    x_e = soln1[1][i];
    exact[i] = 1 + Math.sqrt(x_e + e);
}

console.log(soln1[0]);
console.log(soln2[0]);
console.log(exact);


function setup() {
    createCanvas(1200, 400);
    points1 = [];
    points2 = [];
    ex_points = [];

    for (i = 0; i < soln1[1].length; i++) {
        points1[i] = new GPoint(soln1[1][i], soln1[0][i]);
        points2[i] = new GPoint(soln2[1][i], soln2[0][i]);
        ex_points[i] = new GPoint(soln1[1][i], exact[i]);
        
    }

    plot1 = new GPlot(this);
    plot1.setPos(0, 0);
    plot1.setOuterDim(width / 3, height);

    plot1.setPoints(points1);

    plot1.setTitleText("4th order Runge Kutta Method");
    plot1.getXAxis().setAxisLabelText("x");
    plot1.getYAxis().setAxisLabelText("y");

    plot1.defaultDraw();

    plot2 = new GPlot(this);
    plot2.setPos(400, 0);
    plot2.setOuterDim(width / 3, height);

    plot2.setPoints(points2);

    plot2.setTitleText("Forward Euler Method");
    plot2.getXAxis().setAxisLabelText("x");
    plot2.getYAxis().setAxisLabelText("y");

    plot2.defaultDraw();

    ex_plot = new GPlot(this);
    ex_plot.setPos(800, 0);
    ex_plot.setOuterDim(width / 3, height);

    ex_plot.setPoints(ex_points);

    ex_plot.setTitleText("Exact solution");
    ex_plot.getXAxis().setAxisLabelText("x");
    ex_plot.getYAxis().setAxisLabelText("y");

    ex_plot.defaultDraw();

    }

function draw() {
//  background(220);
}
