const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

const mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('mouseout', (e) => {
  mouse.x = undefined;
  mouse.y = undefined;
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;

    const colors = [
      'rgba(255, 255, 255, 0.7)',
      'rgba(180, 180, 180, 0.7)',
      'rgba(120, 120, 120, 0.7)',
      'rgba(60, 60, 60, 0.7',
      'rgba(0, 0, 0, 0.7',
      'rgba(255, 0, 0, 0.9)',
    ];

    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.draw = () => {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.strokeStyle = this.color;
      ctx.stroke();
      ctx.fillStyle = this.color;
      ctx.fill();
    };

    this.update = () => {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }

      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;

      const maxRadius = 100;

      if (
        mouse.x - this.x < maxRadius &&
        mouse.x - this.x > -maxRadius &&
        mouse.y - this.y < maxRadius &&
        mouse.y - this.y > -maxRadius
      ) {
        if (this.radius < maxRadius) {
          this.radius += 2;
        }
      } else if (this.radius > this.minRadius) {
        this.radius -= 1;
      }

      this.draw();
    };
  }
}

let circleArr = [];

for (let i = 0; i < 700; i++) {
  let radius = Math.random() * 5 + 1;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;
  let dx = (Math.random() - 0.5) * 2;
  let dy = (Math.random() - 0.5) * 2;
  circleArr.push(new Circle(x, y, dx, dy, radius));
}

const animation = () => {
  requestAnimationFrame(animation);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArr.length; i++) {
    circleArr[i].update();
  }
};

animation();
