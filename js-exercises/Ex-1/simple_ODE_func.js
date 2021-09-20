function ForwardEuler(f, u0, dt, t0, T) {
    let n = Math.floor(T / dt);
    let u = new Array(n);
    let t = new Array(n);    
    u[0] = u0
    t[0] = t0

    for (let i = 1; i < n + 1; i++) {
        t[i] = t[i - 1] + dt;
        u[i] = u[i - 1] + dt * f(u[i - 1], t[i - 1]);
    }
    return [u, t]
}

function f(u, t) {
    return u / 10
}

console.log(ForwardEuler(f, 0.2, 5, 0, 20));

function setup() {
    createCanvas(800, 800);
    // Create a new plot and set its position on the screen
    points = [];
    ex_points = [];
    soln = ForwardEuler(f, 0.2, 5, 0, 20);

    for (i = 0; i < soln[1].length; i++) {
        points[i] = new GPoint(soln[1][i], soln[0][i]);
        ex_points[i] = new GPoint(soln[1][i], 0.2 * Math.exp(0.1 * soln[1][i]));
    }

    plot = new GPlot(this);
    plot.setPos(0, 0);
    plot.setOuterDim(width / 2, height / 2);

    plot.setPoints(points);

    plot.setTitleText("Numerical solution");
    plot.getXAxis().setAxisLabelText("t");
    plot.getYAxis().setAxisLabelText("u");

    plot.defaultDraw();


    ex_plot = new GPlot(this);
    ex_plot.setPos(400, 0);
    ex_plot.setOuterDim(width / 2, height / 2);

    ex_plot.setPoints(ex_points);

    ex_plot.setTitleText("Exact solution");
    ex_plot.getXAxis().setAxisLabelText("t");
    ex_plot.getYAxis().setAxisLabelText("u");

    ex_plot.defaultDraw();

    }

function draw() {
//  background(220);
}


