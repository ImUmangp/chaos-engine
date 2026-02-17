const socket = io();
const overlay = document.getElementById("overlay");
const overlayText = document.getElementById("overlayText");

function startFireParticles() {
  const canvas = document.getElementById("fireCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height,
      size: Math.random() * 8 + 2,
      speed: Math.random() * 3 + 2
    };
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.push(createParticle());

    particles.forEach((p, index) => {
      p.y -= p.speed;
      p.size *= 0.96;

      ctx.fillStyle = "orange";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      if (p.size < 1) particles.splice(index, 1);
    });

    requestAnimationFrame(update);
  }

  update();
}

function cinematicFire() {
  overlay.style.opacity = 1;
  overlayText.innerText = "THEY CHOSE FIRE.";

  setTimeout(() => {
   overlay.classList.add("flash");
document.body.classList.add("impact");

createDebrisExplosion();


    setTimeout(() => {
      overlay.style.opacity = 0;
      overlay.classList.remove("flash");
      document.body.classList.remove("impact");

      document.body.className = "fire";
      startFireParticles();

    }, 400);

  }, 1500);
}

socket.on("modeChange", (mode) => {
  if (mode === "fire") {
    cinematicFire();
  }
  if (mode === "love") {
    cinematicLove();
  }
});
function createDebrisExplosion() {
  const container = document.getElementById("debrisContainer");

  for (let i = 0; i < 60; i++) {
    const piece = document.createElement("div");
    piece.classList.add("debris");

    piece.style.left = window.innerWidth / 2 + "px";
    piece.style.top = window.innerHeight / 2 + "px";

    const x = (Math.random() - 0.5) * 800 + "px";
    const y = (Math.random() - 0.5) * 800 + "px";

    piece.style.setProperty("--x", x);
    piece.style.setProperty("--y", y);

    container.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 1200);
  }
}
function createHearts() {
  for (let i = 0; i < 40; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");

    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.bottom = "0px";
    heart.style.opacity = Math.random();

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 4000);
  }
}
function cinematicLove() {
  overlay.style.opacity = 1;
  overlayText.innerText = "THEY CHOSE LOVE.";

  setTimeout(() => {
    overlay.classList.add("flash");

    setTimeout(() => {
      overlay.style.opacity = 0;
      overlay.classList.remove("flash");

      document.body.className = "love";
      createHearts();
      startLoveParticles();

      document.body.style.transition = "transform 3s ease";
      document.body.style.transform = "scale(1.02)";

    }, 400);

  }, 1500);
}

function startLoveParticles() {
  const canvas = document.getElementById("loveCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

 function createHearts() {
  for (let i = 0; i < 80; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");

    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.bottom = "-20px";
    heart.style.animationDuration = (4 + Math.random() * 4) + "s";
    heart.style.opacity = Math.random();

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 8000);
  }
}


  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.push(createParticle());

    particles.forEach((p, index) => {
      p.y -= p.speed;
      p.size *= 0.99;

      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      if (p.size < 0.5) particles.splice(index, 1);
    });

    requestAnimationFrame(update);
  }

  update();
}
