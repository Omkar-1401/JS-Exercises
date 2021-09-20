function ForwardEuler(f, h0, dt, t0, T) {
    let n = Math.floor((T - t0) / dt);
    let h = new Array(n + 1);
    let t = new Array(n + 1);    
    h[0] = h0;
    t[0] = t0;

    for (let i = 1; i < n + 1; i++) {
        t[i] = t[i - 1] + dt;
        if (h[i - 1] >= 0)
            h[i] = h[i - 1] + dt * f(h[i - 1], t[i - 1]);
        else
            h[i] = 0;
    }
    return [h, t];  
}

function D(h, t) {
    return -Math.sqrt(2 * 9.81 * h) / Math.pow(20, 2);
}

let soln = ForwardEuler(D, 1, 10, 0, 200);

console.log(soln[0]);


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
    plot.getYAxis().setAxisLabelText("h");

    plot.defaultDraw();

    }

function draw() {
//  background(220);
}