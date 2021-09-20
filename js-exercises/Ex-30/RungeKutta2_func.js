function RungeKutta2(f, u0, h, t0, tf) {
    let n = Math.floor((tf - t0) / h);
    let u = new Array(n);
    let t = new Array(n);  
    u[0] = u0;
    t[0] = t0;

    for (let i = 1; i < n + 1; i++) {
        let k1 = h * f(t[i - 1], u[i - 1]);
        let k2 = h * f(t[i - 1] + h / 2, u[i - 1] + k1 / 2);
        
        t[i] = t[i - 1] + h;
        u[i] = u[i - 1] + k2;
    }
    return [u, t];
}

function D(t, u) {
    return u * 6;
}

soln = RungeKutta2(D, 1, 0.01, 0, 1);

let exact = [];
for (let i = 0; i < soln[1].length; i++) {
    exact[i] = Math.exp(soln[1][i] * 6);
}

console.log(soln[0].length);
console.log(exact.length); 

let diff = [];
for (let k = 0; k < exact.length; k++) {
    diff[k] = exact[k] - soln[0][k];
}

function setup() {
    createCanvas(400, 400);
    points = [];

    for (i = 0; i < soln[1].length; i++) {
        points[i] = new GPoint(soln[1][i],diff[i]);
    }

    plot = new GPlot(this);
    plot.setPos(0, 0);
    plot.setOuterDim(width, height);

    plot.setPoints(points);

    plot.setTitleText("Accuracy of the Runge Kutta method");
    plot.getXAxis().setAxisLabelText("t");
    plot.getYAxis().setAxisLabelText("difference");

    plot.defaultDraw();


    }

function draw() {
//  background(220);
}
