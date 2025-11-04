let wrapper = document.querySelector('.wrapper');
let linksWrapper = document.querySelector('.links-wrapper');
let menu = document.querySelector('.hamburger-menu');
let packages = document.querySelector('.packages');
let events = document.querySelector('.events');

// toggles hamburger menu
menu.addEventListener('click', () => {
    wrapper.classList.toggle('active')
});

// disables scroll when nav is open
menu.addEventListener('click', () => {
    document.body.classList.toggle('no-scroll');
});

// toggles packages drop-down sub menu
packages.addEventListener('click', () => {
    linksWrapper.classList.toggle('active-packages-menu');
});

// toggles events drop-down sub menu
events.addEventListener('click', () => {
    linksWrapper.classList.toggle('active-events-menu');
});