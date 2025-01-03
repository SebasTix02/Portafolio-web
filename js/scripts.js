// Seleccionar elementos
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

// Evento para mostrar/ocultar el menú
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});
