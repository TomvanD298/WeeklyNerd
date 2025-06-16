const canvas = document.getElementById("neonShapesCanvas");
const ctx = canvas.getContext("2d");
let width, height;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class NeonShape {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;

    // Wider size range: from tiny to big
    this.size = Math.random() * 40 + 5;

    // Random stroke width: 1.5 to 4
    this.strokeWidth = Math.random() * 3.5 + 1.5;

    this.angle = Math.random() * 2 * Math.PI;
    this.speed = 0.05 + Math.random() * 0.05;
    this.shape = ["circle", "square", "triangle"][
      Math.floor(Math.random() * 3)
    ];

    const neonColors = [
      [255, 0, 0], // Red
      [255, 165, 0], // Orange
      [144, 238, 144], // Light Green
      [216, 191, 216], // Light Purple
    ];
    this.rgb = neonColors[Math.floor(Math.random() * neonColors.length)];
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    const radius = this.size / 2;

    // Bounce off horizontal walls
    if (this.x - radius < 0 || this.x + radius > width) {
      this.angle = Math.PI - this.angle;
      this.x = Math.max(radius, Math.min(width - radius, this.x));
    }

    // Bounce off vertical walls
    if (this.y - radius < 0 || this.y + radius > height) {
      this.angle = -this.angle;
      this.y = Math.max(radius, Math.min(height - radius, this.y));
    }
  }

  draw(ctx) {
    const color = `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, 1)`;
    ctx.strokeStyle = color;
    ctx.lineWidth = this.strokeWidth;
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;

    ctx.beginPath();

    switch (this.shape) {
      case "circle":
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        break;
      case "square":
        ctx.rect(
          this.x - this.size / 2,
          this.y - this.size / 2,
          this.size,
          this.size
        );
        break;
      case "triangle":
        const h = (this.size * Math.sqrt(3)) / 2;
        ctx.moveTo(this.x, this.y - h / 2);
        ctx.lineTo(this.x - this.size / 2, this.y + h / 2);
        ctx.lineTo(this.x + this.size / 2, this.y + h / 2);
        ctx.closePath();
        break;
    }

    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
  }
}

const neonShapes = [];

function spawnShapes(max = 20) {
  while (neonShapes.length < max) {
    neonShapes.push(new NeonShape());
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  spawnShapes(50); // Ensure up to 100 shapes
  neonShapes.forEach((shape) => {
    shape.update();
    shape.draw(ctx);
  });
  requestAnimationFrame(animate);
}

animate();
