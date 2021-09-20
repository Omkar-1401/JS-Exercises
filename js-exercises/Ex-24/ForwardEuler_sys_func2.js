function ForwardEuler(f, T0, dt, t0, tf) {
    let n = Math.floor((tf - t0) / dt);
    let T = new Array(n);
    let t = new Array(n);  
    T[0] = T0;
    t[0] = t0;

    for (let i = 1; i < n + 1; i++) {
        t[i] = t[i - 1] + dt;
        T[i] = [];
        for (let j = 0; j < 2; j++) {
            T[i][j] = T[i - 1][j] + dt * f(T[i - 1], t[i - 1])[j];
        }
    }
    return [T, t];
}

function D(sys, t) {
    let v = sys[0];
    let w = sys[1];

    return [3 + Math.pow(3 + 4 * t - w, 3), 4 + Math.pow(2 + 3 * t - v, 4)];
}


function test_ForwardEuler(f, T0, dt, t0, tf) {
    soln = ForwardEuler(f, T0, dt, t0, tf);
    let exact = [];
    for (let i = 0; i < soln[1].length; i++) {
        t_e = soln[1][i];
        exact[i] = [2 + 3 * t_e, 3 + 4 * t_e];
    }

    console.log(soln[0]);
    console.log(exact);
    
}

test_ForwardEuler(D, [2, 3], 0.1, 0, 10);