const canvas = document.getElementById('leaves-canvas');
const ctx = canvas.getContext('2d');

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

// Оновлення розмірів canvas при зміні вікна
window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

const LEAF_COUNT = 35; // Кількість листочків
const leaves = [];

class Leaf {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * -height; // Починають згори за межами екрана
    
    this.size = Math.random() * 8 + 8; // Розмір листочка
    this.speedY = Math.random() * 1.2 + 0.8; // Швидкість падіння
    this.speedX = Math.random() * 0.8 - 0.4; // Зсув вітром
    
    // Коливання вліво-вправо
    this.oscillationSpeed = Math.random() * 0.02 + 0.01;
    this.oscillationStep = Math.random() * Math.PI * 2;

    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    this.opacity = Math.random() * 0.4 + 0.6;

    // Осіння палітра кольорів
    const colors = ['#d9534f', '#f0ad4e', '#e67e22', '#d35400', '#c0392b', '#b9770e'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.y += this.speedY;
    
    // Траєкторія руху за синусоїдою
    this.oscillationStep += this.oscillationSpeed;
    this.x += Math.sin(this.oscillationStep) * 1.2 + this.speedX;
    
    this.rotation += this.rotationSpeed;

    // Якщо листочок впав униз — повертаємо його нагору
    if (this.y > height + 20) {
      this.reset();
      this.y = -20;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;

    // Малюємо форму листочка за допомогою кривих
    ctx.beginPath();
    ctx.moveTo(0, -this.size);
    ctx.quadraticCurveTo(this.size, 0, 0, this.size);
    ctx.quadraticCurveTo(-this.size, 0, 0, -this.size);
    ctx.fill();

    ctx.restore();
  }
}

// Ініціалізація листочків
for (let i = 0; i < LEAF_COUNT; i++) {
  leaves.push(new Leaf());
}

// Головний цикл анімації
function animate() {
  ctx.clearRect(0, 0, width, height);

  leaves.forEach((leaf) => {
    leaf.update();
    leaf.draw();
  });

  requestAnimationFrame(animate);
}

animate();