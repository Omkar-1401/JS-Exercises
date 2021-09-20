function HeunMethod(f, u0, dt, t0, tf) {
    let n = Math.floor((tf - t0) / dt);
    let u = new Array(n);
    let t = new Array(n);  
    u[0] = u0;
    t[0] = t0;

    for (let i = 1; i < n + 1; i++) {
        t[i] = t[i - 1] + dt;
        u[i] = [];
        let u_star = [];
        for (let j = 0; j < 2; j++) {
            u_star[j] = u[i - 1][j] + dt * f(u[i - 1], t[i - 1])[j];
        } 
        for (let j = 0; j < 2; j++) {
            u[i][j] = u[i - 1][j] + dt * f(u[i - 1], t[i - 1])[j] / 2 + dt * f(u_star, t[i])[j] / 2;
        }
    }
    return [u, t];
}

function D(sys, t) {
    let v = sys[0];
    let w = sys[1];

    return [3 + Math.pow(3 + 4 * t - w, 3), 4 + Math.pow(2 + 3 * t - v, 4)];
}


soln = HeunMethod(D, [2, 3], 0.1, 0, 10);

let exact = [];
for (let i = 0; i < soln[1].length; i++) {
    t_e = soln[1][i];
    exact[i] = [2 + 3 * t_e, 3 + 4 * t_e];
}

console.log(soln[0]);
console.log(exact);