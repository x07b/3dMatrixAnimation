const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let w, h;
let particles = [];

function init() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  for(let i = 0; i < w; i+=10) {
    for(let j = 0; j < h; j+=10) {
      const p = new Particle(i, j);
      particles.push(p);
    }
  }
  loop();
}

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, w, h);
  for(let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
  requestAnimationFrame(loop);
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = Math.random() * 2 - 1;
    this.dy = Math.random() * 2 - 1;
    this.ddx = 0;
    this.ddy = 0;
  }

  update() {
    this.ddx = (Math.random() - 0.5) * 0.5;
    this.ddy = (Math.random() - 0.5) * 0.5;
    this.dx += this.ddx;
    this.dy += this.ddy;
    const maxSpeed = 2;
    const speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    if(speed > maxSpeed) {
      this.dx *= maxSpeed / speed;
      this.dy *= maxSpeed / speed;
    }
    this.x += this.dx;
    this.y += this.dy;
    if(this.x < 0) {
      this.x = w;
    } else if(this.x > w) {
      this.x = 0;
    }
    if(this.y < 0) {
      this.y = h;
    } else if(this.y > h) {
      this.y = 0;
    }
  }

  draw() {
    const size = 2;
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, size, size);
  }
}

init();
