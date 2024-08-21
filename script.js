const menuToggle = document.querySelector('.hamburger-menu');
const header = document.querySelector('header');

menuToggle.onclick = function() {
    header.classList.toggle('active');
};