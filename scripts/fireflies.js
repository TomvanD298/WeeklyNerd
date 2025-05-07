const canvas = document.getElementById('fireflyCanvas');
const ctx = canvas.getContext('2d');
let width, height;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Firefly {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 0.8 + 0.3; // smaller size
    this.baseRadius = this.radius;
    this.angle = Math.random() * 2 * Math.PI;
    this.speed = 0.1 + Math.random() * 0.2;
    this.alpha = 0;
    this.alphaDirection = Math.random() < 0.5 ? 1 : -1;
    this.alphaSpeed = 0.005 + Math.random() * 0.01;
    this.delay = Math.random() * 200;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;

    if (this.delay > 0) {
      this.delay--;
    } else {
      this.alpha += this.alphaDirection * this.alphaSpeed;
      if (this.alpha > 1) {
        this.alpha = 1;
        this.alphaDirection = -1;
      } else if (this.alpha < 0) {
        this.alpha = 0;
        this.alphaDirection = 1;
        this.delay = Math.random() * 200;
      }
    }
  }

  draw(ctx) {
    const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 6);
    glow.addColorStop(0, `rgba(0, 255, 255, ${this.alpha})`);
    glow.addColorStop(1, `rgba(0, 255, 255, 0)`);
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 6, 0, Math.PI * 2);
    ctx.fill();
  }
}

const fireflies = Array.from({ length: 100 }, () => new Firefly());

function animate() {
  ctx.clearRect(0, 0, width, height);
  fireflies.forEach(firefly => {
    firefly.update();
    firefly.draw(ctx);
  });
  requestAnimationFrame(animate);
}

animate();