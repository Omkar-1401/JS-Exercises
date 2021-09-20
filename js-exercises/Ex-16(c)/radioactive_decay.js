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

function D(u, t) {
    return -a * u;
}

let a = Math.log(2) / 5600;
let u0 = 1;
let T = 20000;
soln = ForwardEuler(D, u0, 500, 0, T);

console.log('Numerical solution: ', soln[0][soln[0].length - 1]);
console.log('Exact value: ', Math.exp(-a * u0 * T));


function setup() {
    createCanvas(400, 400);
    // Create a new plot and set its position on the screen
    points = [];

    for (i = 0; i < soln[1].length; i++) {
        points[i] = new GPoint(soln[1][i], soln[0][i]);
    }

    plot = new GPlot(this);
    plot.setPos(0, 0);
    plot.setOuterDim(width, height);

    plot.setPoints(points);

    plot.setTitleText("Numerical solution");
    plot.getXAxis().setAxisLabelText("t");
    plot.getYAxis().setAxisLabelText("u");

    plot.defaultDraw();

    }

function draw() {
//  background(220);
}




