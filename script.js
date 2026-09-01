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
    // toggles the hamburger menu variable to open / closed and enables / disables page scrolling accordingly
    nav.classList.toggle('hamburger-menu-open');
    document.body.classList.toggle('no-scroll');

    // the variable gets updated after it's toggled
    const hamburgerMenuOpen = nav.classList.contains('hamburger-menu-open');

    // prevents main from being focused, clicked, or read by screen readers while hamburger menu is open
    main.inert = hamburgerMenuOpen;

    /*
        adds or removes the event listener depending on whether the hamburger is open or not,
        and sets the aria-expanded accordingly for screen reader users
    */
   
    if (hamburgerMenuOpen) {
        document.addEventListener('keydown', escapeKeyPress);
        hamburgerMenu.setAttribute('aria-expanded', 'true');
        console.log(hamburgerMenu)
    } else {
        document.removeEventListener('keydown', escapeKeyPress);
        hamburgerMenu.setAttribute('aria-expanded', 'false');
        console.log(hamburgerMenu)
    };
};

// listens for escape key while the hamburger menu is open
function escapeKeyPress(e) {
    if (e.key === 'Escape') {
        toggleHamburgerMenu();
    };
};