const nav = document.querySelector('nav');
const logo = document.querySelector('.logo');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const linksWrapper = document.querySelector('.links-wrapper');
const main = document.querySelector('main');

hamburgerMenu.addEventListener('click', toggleHamburgerMenu);

linksWrapper.addEventListener('click', (e) => {
    // toggles the sub menus based on which was clicked
    if(e.target.closest('.packages')) {
        linksWrapper.classList.toggle('packages-menu-open');
        linksWrapper.classList.remove('events-menu-open');
    } else if(e.target.closest('.events')) {
        linksWrapper.classList.toggle('events-menu-open');
        linksWrapper.classList.remove('packages-menu-open');
    };
});

function toggleHamburgerMenu() {
    // toggles nav and disables scrolling accordingly
    nav.classList.toggle('active');
    const active = nav.classList.contains('active');
    document.body.classList.toggle('no-scroll');

    // prevents these elements from being focused, clicked, or read by screen readers
    main.inert = active;
    logo.inert = active;

    // adds or removes the esc key event listener when the hamburger menu is open or closed
    if (active) {
        document.addEventListener('keydown', escapeKeyPress);
    } else {
        document.removeEventListener('keydown', escapeKeyPress);
    };
};

function escapeKeyPress(e) {
    if (e.key === 'Escape') {
        toggleHamburgerMenu();
    };
};