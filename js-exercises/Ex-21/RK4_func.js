function RungeKutta4(f, u0, h, t0, tf) {
    let n = Math.floor((tf - t0) / h);
    let u = new Array(n);
    let t = new Array(n);  
    u[0] = u0;
    t[0] = t0;

    for (let i = 1; i < n + 1; i++) {
        let k1 = h * f(t[i - 1], u[i - 1]);
        let k2 = h * f(t[i - 1] + h / 2, u[i - 1] + k1 / 2);
        let k3 = h * f(t[i - 1] + h / 2, u[i - 1] + k2 / 2);
        let k4 = h * f(t[i - 1] + h / 2, u[i - 1] + k3);

        t[i] = t[i - 1] + h;
        u[i] = u[i - 1] + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
    }
    return [u, t];
}

function D(t, u) {
    return u * 6;
}

soln = RungeKutta4(D, 1, 0.01, 0, 1);

let exact = [];
for (let i = 0; i < soln[1].length; i++) {
    exact[i] = Math.exp(soln[1][i] * 6);
}
console.log(soln[0]);
console.log(exact);
