function ForwardEuler(D, s0, dx, x0, xf) {
    let n = Math.floor((xf - x0) / dx);
    let s = new Array(n + 1);
    let x = new Array(n + 1);    
    s[0] = s0
    x[0] = x0

    for (let i = 1; i < n + 1; i++) {
        x[i] = x[i - 1] + dx;
        s[i] = s[i - 1] + dx * D(s[i - 1], x[i - 1]);
    }
    return s[s.length - 1];
}

function F(s, x) {
    return Math.sqrt(1 + Math.pow(1 / 2, 2));
}

function G(s, x) {
    return Math.sqrt(1 + Math.pow(2 * x, 2));
}

console.log(ForwardEuler(F, 0, 0.1, 0, 2));
console.log(ForwardEuler(G, 0, 0.01, 0, 2));
