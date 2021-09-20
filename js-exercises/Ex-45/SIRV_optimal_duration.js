function ForwardEuler(f, T0, dt, t0, tf, V) {
    let n = Math.floor((tf - t0) / dt);
    let T = new Array(n);
    let t = new Array(n);  
    T[0] = T0;
    t[0] = t0;
    let Vt = V;

    for (let i = 1; i < n + 1; i++) {
        t[i] = t[i - 1] + dt;
        T[i] = [];
        for (let j = 0; j < T0.length; j++) {
            T[i][j] = T[i - 1][j] + dt * f(T[i - 1], t[i - 1], Vt)[j];
        }
    }
    return [T, t];
}

let v = 0.1;
let b = 0.0005;
function p(t, Vt) {
    if (t > 6 && t < 6 + Vt) 
        return 0.1;
    return 0;
}


function D(sys, t, Vt) {
    let S = sys[0];
    let I = sys[1];
    let R = sys[2];
    let V = sys[3];

    return [-b * S * I - p(t, Vt) * S, b * S * I - v * I, v * I, p(t, Vt) * S];
}
let infected_max = [];
let v_list = [];
for (let vt = 0; vt < 32; vt++) {
    soln = ForwardEuler(D, [1500, 1, 0, 0], 0.5, 0, 60, vt);
    let infected = [];
    for (let a = 0; a < soln[0].length; a++) {
        infected[a] = soln[0][a][1];
    }

    v_list[vt] = vt;
    infected_max[vt] = Math.max.apply(null, infected);
}

function setup() {
    createCanvas(400, 400);
    points = [];

    for (i = 0; i < soln[1].length; i++) {
        points[i] = new GPoint(v_list[i], infected_max[i]);
    }

    plot = new GPlot(this);
    plot.setPos(0, 0);
    plot.setOuterDim(width, height);

    plot.setPoints(points);

    plot.setTitleText("Optimal vaccination plot");
    plot.getXAxis().setAxisLabelText("Vt");
    plot.getYAxis().setAxisLabelText("I(t)_max");

    plot.defaultDraw();
    }

function draw() {
//  background(220);
}

