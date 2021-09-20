function ForwardEuler(f, x0, dy, y0, yf) {
    let n = Math.floor((yf - y0) / dy);
    let x = new Array(n);
    let y = new Array(n);    
    x[0] = x0;
    y[0] = y0;

    for (let i = 1; i < n + 1; i++) {
        y[i] = y[i - 1] + dy;
        x[i] = x[i - 1] + dy * f(x[i - 1], y[i - 1]);
    }
    return [x, y];
}

function f1(x) {
    return 2;
}

function f2(x) {
    return 1 / (2 * Math.sqrt(x));
}

function D1(x, y) {
    return 1 / f1(x);
}

function D2(x, y) {
    return 1 / f2(x);
}

let sol = [ForwardEuler(D1, 1 / 2, 1, 1, 100), ForwardEuler(D2, 1, 1, 1, 100)];

console.log(sol[0]);

function setup() {
    createCanvas(400, 400);
    points = [];

    for (i = 0; i < sol[1][1].length; i++) {
        points[i] = new GPoint(sol[1][1][i], sol[1][0][i]);
    }

    plot = new GPlot(this);
    plot.setPos(0, 0);
    plot.setOuterDim(width, height);

    plot.setPoints(points);

    plot.setTitleText("Numerical solution for y = x^2");
    plot.getXAxis().setAxisLabelText("x");
    plot.getYAxis().setAxisLabelText("y");

    plot.defaultDraw();


    }

function draw() {
//  background(220);
}