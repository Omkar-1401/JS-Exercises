function plotNum (f, u0, dt, T, method = 'forward') {
    let n = Math.floor(T/dt);
    let u = new Array(n + 1);
    let t = new Array(n + 1);

    u[0] = u0;
    t[0] = 0;
    for (let i = 1; i < n + 1; i++) {
        t[i] = t[i - 1] + dt;

        if (method == 'forward')
            u[i] = u[i - 1] + dt * f(u[i], t[i]);
        else if (method == 'midpoint')
            u[i] = u[i - 1] + dt * f(u[i] + dt * f(u[i], t[i]) / 2, t[i] + dt /2);

    return u, t

         
    }    
}
function setup() {
    createCanvas(400, 400);
            // Create a new plot and set its position on the screen
            points = [];
          seed = 100 * random();
  
          for (i = 0; i < 100; i++) {
              points[i] = new GPoint(i, 10 * noise(0.1 * i + seed));
              console.log(points[i]);
          }
          plot = new GPlot(this);
          plot.setPos(0, 0);
          plot.setOuterDim(width, height);
  
          // Add the points
          plot.setPoints(points);
  
          // Set the plot title and the axis labels
          plot.setTitleText("A very simple example");
          plot.getXAxis().setAxisLabelText("x axis");
          plot.getYAxis().setAxisLabelText("y axis");
  
          // Draw it!
          plot.defaultDraw();
  }
  
  function draw() {
  //  background(220);
  }