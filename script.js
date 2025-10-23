const carousel = document.getElementById("menuCarousel");
const cards = [...carousel.children];
const suits = ["♠", "♥", "♦", "♣"];
let selected = 0;
const total = cards.length;
const step = 360 / total;
let animating = false;
const carouselContainer = document.querySelector(".carousel-container");

// Position cards in a circle
function positionCards() {
  for (let i = 0; i < total; i++) {
    const rot = i * step;
    cards[i].style.transform = `translate(-50%, -50%) rotateY(${rot}deg) translateZ(300px)`;
    cards[i].style.opacity = 1;
  }
}

// Rotate carousel
function updateCarousel() {
  carousel.style.transform = `rotateY(${-selected * step}deg)`;
}

// Add suit symbols
cards.forEach(card => {
  const { suit, color } = (() => {
    const suit = suits[Math.floor(Math.random()*suits.length)];
    let color = suit==="♠"?"#1e90ff":suit==="♥"?"#ff2e63":suit==="♦"?"#ff9f1c":"#2ecc71";
    return {suit,color};
  })();
  ["top-left","bottom-right"].forEach(pos => {
    const s = document.createElement("div");
    s.className = "symbol " + pos;
    s.style.color = color;
    s.textContent = suit;
    card.appendChild(s);
  });
});

// Flip & zoom
cards.forEach(card => {
  const wrapper = card.querySelector(".flip-wrapper");
  const inner = card.querySelector(".flip-card-inner");
  const backImg = card.querySelector(".panel-img");
  const backTitle = card.querySelector(".panel-title");
  const backText = card.querySelector(".panel-text");
  const closeBtn = card.querySelector(".close-btn");

  backImg.src = card.dataset.img;
  backTitle.textContent = card.dataset.title;
  backText.textContent = card.dataset.text;

  card.addEventListener("click", e => {
    if(animating || e.target===closeBtn) return;
    animating=true;
    selected = cards.indexOf(card);
    updateCarousel();
    cards.forEach(c => { if(c!==card)c.style.opacity=0.3; });

    // Center the card wrapper
    const cardRect = card.getBoundingClientRect();
    const containerRect = carouselContainer.getBoundingClientRect();
    const offsetX = containerRect.left + containerRect.width/2 - (cardRect.left + cardRect.width/2);
    const offsetY = containerRect.top + containerRect.height/2 - (cardRect.top + cardRect.height/2);

    wrapper.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.5)`;
    card.classList.add("flipped");
    animating=false;
  });

  closeBtn.addEventListener("click", e=>{
    e.stopPropagation();
    card.classList.remove("flipped");
    wrapper.style.transform = "";
    cards.forEach(c=>c.style.opacity=1);
  });
});

// Initialize
positionCards();
updateCarousel();

// Carousel controls
document.getElementById("next").onclick = () => { selected=(selected+1)%total; updateCarousel(); };
document.getElementById("prev").onclick = () => { selected=(selected-1+total)%total; updateCarousel(); };

// Falling symbols
(function populateSymbols(){
  const container=document.querySelector('.falling-symbols');
  container.innerHTML='';
  const symbols=['♠','♥','♦','♣'];
  const colors=['#1e90ff','#ff2e63','#ff9f1c','#2ecc71'];

  for(let i=0;i<24;i++){
    const s=document.createElement('div');
    s.className='symbol1';
    s.style.left=(Math.random()*100)+'%';
    s.style.fontSize=(14+Math.random()*28)+'px';
    s.style.top=(-5-Math.random()*12)+'%';
    s.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    s.style.color=colors[Math.floor(Math.random()*colors.length)];
    s.style.animationDuration=(8+Math.random()*8)+'s';
    s.style.animationDelay=(-Math.random()*8)+'s';
    s.style.transform=`translateX(${Math.random()*140-70}px)`;
    container.appendChild(s);
  }
})();
