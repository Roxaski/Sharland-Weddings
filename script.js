const nav = document.querySelector('nav');
const logo = document.querySelector('.logo');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const linksWrapper = document.querySelector('.links-wrapper');
const main = document.querySelector('main');

hamburgerMenu.addEventListener('click', toggleHamburgerMenu);

// toggles the sub menus based on which was clicked
linksWrapper.addEventListener('click', (e) => {
    if(e.target.closest('.packages')) {
        linksWrapper.classList.toggle('packages-menu-open');
    } else if(e.target.closest('.events')) {
        linksWrapper.classList.toggle('events-menu-open');
    };
});

function toggleHamburgerMenu() {
    const hamburgerMenuOpen = nav.classList.contains('hamburger-menu-open');

    // toggles nav and disables scrolling accordingly
    nav.classList.toggle('hamburger-menu-open');
    document.body.classList.toggle('no-scroll');

    // prevents these elements from being focused, clicked, or read by screen readers
    main.inert = hamburgerMenuOpen;
    logo.inert = hamburgerMenuOpen;

    // adds or removes the esc key event listener when the hamburger menu is open or closed
    if (hamburgerMenuOpen) {
        document.addEventListener('keydown', escapeKeyPress);
    } else {
        document.removeEventListener('keydown', escapeKeyPress);
    };
};

// listens for escape key while the hamburger menu is open
function escapeKeyPress(e) {
    if (e.key === 'Escape') {
        toggleHamburgerMenu();
    };
};