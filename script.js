const carousel = document.getElementById("menuCarousel");
const cards = [...carousel.children];
const suits = ["♠", "♥", "♦", "♣"];
const infoPanel = document.getElementById("infoPanel");
const panelTitle = document.getElementById("panelTitle");
const panelText = document.getElementById("panelText");
const closePanel = document.getElementById("closePanel");

let selected = 0;
const total = cards.length;
const step = 360 / total;
let animating = false;

// --- Suit colors ---
function getRandomSuit() {
  const suit = suits[Math.floor(Math.random() * suits.length)];
  let color;
  switch (suit) {
    case "♠": color = "#1e90ff"; break;
    case "♥": color = "#ff2e63"; break;
    case "♦": color = "#ff9f1c"; break;
    case "♣": color = "#2ecc71"; break;
    default: color = "#000"; break;
  }
  return { suit, color };
}

// --- Add random symbols to cards ---
cards.forEach(card => {
  const { suit, color } = getRandomSuit();
  const symTL = document.createElement("div");
  symTL.className = "symbol top-left";
  symTL.style.color = color;
  symTL.textContent = suit;

  const symBR = document.createElement("div");
  symBR.className = "symbol bottom-right";
  symBR.style.color = color;
  symBR.textContent = suit;

  card.append(symTL, symBR);
});

// --- Position cards in circle ---
function positionCards() {
  for (let i = 0; i < total; i++) {
    const rot = i * step;
    cards[i].style.transform = `translate(-50%, -50%) rotateY(${rot}deg) translateZ(300px)`;
    cards[i].style.opacity = 1;
  }
}

// --- Rotate carousel ---
function updateCarousel() {
  carousel.style.transform = `rotateY(${-selected * step}deg)`;
  cards.forEach((c, i) => c.classList.toggle("active", i === selected));
}

// --- Show info panel by enlarging card ---
cards.forEach((card, idx) => {
  card.addEventListener("click", () => {
    if (animating) return;
    animating = true;
    selected = idx;
    updateCarousel();

    // Fade out other cards
    cards.forEach((c, i) => {
      if (i !== idx) c.style.opacity = 0.3;
    });

    // Show panel
    infoPanel.classList.add("active");
    panelTitle.textContent = card.textContent;
    panelText.textContent = `This is the ${card.textContent} card. Add detailed info here.`;

    animating = false;
  });
});

// --- Close panel ---
closePanel.addEventListener("click", () => {
  if (animating) return;
  animating = true;

  infoPanel.classList.remove("active");
  // Restore all cards opacity
  cards.forEach(card => card.style.opacity = 1);

  animating = false;
});

/* ---------- falling symbols generation (JS-enhanced) ---------- */
(function populateSymbols(){
  const container = document.querySelector('.falling-symbols');
  container.innerHTML = ''; // clear fallback
  const symbols = ['♠','♥','♦','♣'];
  const colors = ['#1e90ff','#ff2e63','#ff9f1c','#2ecc71']; // different colors

  for(let i=0;i<24;i++){
    const s = document.createElement('div');
    s.className = 'symbol';

    const left = Math.random() * 100;
    const size = 14 + Math.random()*28;
    s.style.left = left + '%';
    s.style.fontSize = size + 'px';
    s.style.top = (-5 - Math.random()*12) + '%';
    s.textContent = symbols[Math.floor(Math.random()*symbols.length)];

    // Assign a random color
    s.style.color = colors[Math.floor(Math.random()*colors.length)];

    s.style.animationDuration = (8 + Math.random()*8) + 's';
    s.style.animationDelay = (-Math.random()*8) + 's';

    // small horizontal translation via inline transform
    const drift = (Math.random()*140 - 70); // -70..70 px drift
    s.style.transform = `translateX(${drift}px)`;

    container.appendChild(s);
  }
})();

// --- Initialize ---
positionCards();
updateCarousel();

// Carousel controls
document.getElementById("next").onclick = () => {
  if (animating) return;
  selected = (selected + 1) % total;
  updateCarousel();
};
document.getElementById("prev").onclick = () => {
  if (animating) return;
  selected = (selected - 1 + total) % total;
  updateCarousel();
};
