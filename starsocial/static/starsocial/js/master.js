var canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d'),
  requestAnimationFrame = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

var WIDTH = document.documentElement.clientWidth,
  HEIGHT = document.documentElement.clientHeight;

var r = 1,
  growingSpeed = .6,
  drawingSpeed = .3,
  start_d = Math.PI,
  trigger_point = 75;

var circles = [];
circles[0] = new Circle(growingSpeed);

var smaller_side = Math.min(WIDTH / 2, HEIGHT / 2);

var grd = ctx.createRadialGradient(WIDTH / 2, HEIGHT / 2, 0, WIDTH / 2, HEIGHT / 2, smaller_side);
grd.addColorStop(0, "#000000");
grd.addColorStop(0.05, "#FF2D8B");
grd.addColorStop(.33, "#FC9A23");
grd.addColorStop(.66, "#2DD1AE");
grd.addColorStop(1, "#000000");

canvas.setAttribute("width", WIDTH);
canvas.setAttribute("height", HEIGHT);

function Circle(gs) {
  this.iteration = 0;
  this.r = r;
  this.max_d = 1;
  this.growingSpeed = gs;
}

Circle.prototype.draw = function() {
  this.iteration++;
  if (this.iteration == trigger_point) {
    circles[circles.length] = new Circle(this.growingSpeed - .05);
  }
  ctx.beginPath();
  ctx.moveTo(WIDTH / 2 - this.r, HEIGHT / 2);
  for (var d = start_d; d <= start_d + this.max_d; d = d + 2) {
    ctx.lineTo(Math.cos(d) * this.r + WIDTH / 2, Math.sin(d) * this.r + HEIGHT / 2);
  }
  ctx.strokeStyle = grd;
  ctx.stroke();
}

function animate() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  for (var i = circles.length - 1; i >= 0; i--) {
    circles[i].draw();
    if (circles[i].iteration < 1420) {
      circles[i].max_d += drawingSpeed;
    }
    circles[i].r += circles[i].growingSpeed;
  }
  requestAnimationFrame(animate);
}
animate();

/*window.addEventListener('resize', function(){
			WIDTH = document.documentElement.clientWidth,
		    HEIGHT = document.documentElement.clientHeight;

			canvas.setAttribute("width", WIDTH);
			canvas.setAttribute("height", HEIGHT);
		});*/
