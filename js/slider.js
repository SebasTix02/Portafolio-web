const sliderContainer = document.querySelector('.port-slider__container');
const cards = document.querySelectorAll('.port-card');
let currentIndex = 0;
const totalCards = cards.length -1;
const cardWidth = cards[0].offsetWidth + 20; // Ancho del card + margen

// Función para cambiar al siguiente card
function moveToNextCard() {
  if (currentIndex < totalCards - 1) {
    currentIndex++;
  } else {
    currentIndex = 0; // Volver al primer card
  }
  updateSliderPosition();
}

// Función para cambiar al card anterior
function moveToPrevCard() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = totalCards - 1; // Ir al último card
  }
  updateSliderPosition();
}

// Función para actualizar la posición del slider
function updateSliderPosition() {
  sliderContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

// Opcional: Si deseas permitir la navegación manual con flechas
const prevButton = document.createElement('button');
prevButton.classList.add('port-slider__prev');
prevButton.textContent = '<';
document.querySelector('.port-slider').appendChild(prevButton);

const nextButton = document.createElement('button');
nextButton.classList.add('port-slider__next');
nextButton.textContent = '>';
document.querySelector('.port-slider').appendChild(nextButton);

prevButton.addEventListener('click', moveToPrevCard);
nextButton.addEventListener('click', moveToNextCard);
