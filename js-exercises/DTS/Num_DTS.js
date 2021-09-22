function deriv(f, a, b, h, k) {
    let y1 = f(a, b);

    let y2x = (f(a + h, b) - f(a - h, b)) / (2 * h);
    let y2y = (f(a, b + k) - f(a, b - k)) / (2 * k);
    let y2 = y2x + y1 * y2y;

    let y3xx = (f(a + h, b) - 2 * f(a, b) + f(a - h, b)) / Math.pow(h, 2);
    let y3xy = (f(a + h, b + k) -  f(a + h, b - k) - f(a - h, b + k) + f(a - h, b - k)) / (4 * h * k);
    let y3yy = (f(a, b + k) - 2 * f(a, b) + f(a, b - k)) / Math.pow(k, 2);
    let y3 = y3xx + 2 * y1 * y3xy + Math.pow(y1, 2) * y3yy + y2 * y2y;

    return b + y1 * h + y2 * Math.pow(h, 2) / 2 + y3 * Math.pow(h, 3) / (3 * 2);
}

function DTS(f, x0, xf, y0, h, k) {
    let n = Math.floor((xf - x0) / h);
    let y = new Array(n);
    let x = new Array(n);  
    y[0] = y0;
    x[0] = x0;

    for (let i = 1; i < n + 1; i++) {
        x[i] = x[i - 1] + h;
        y[i] = deriv(f, x[i - 1], y[i - 1], h, k);
    }
    return [x, y];
}

//Test function
function g(x, y) {
    return (2 / 3) * x / Math.pow(y, 2);
}

soln = DTS(g, 0, 10, 1, 0.1, 0.05);
//These conditions give solution y^3 = x^2 + 1

console.log(soln);
console.log('DTS value at x = 10  : ' + soln[1][soln[1].length - 1]+ '\nExact value at x = 10: ' + Math.pow(101, 1 / 3));