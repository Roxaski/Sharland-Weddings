const wrapper = document.querySelector('.wrapper');
const linksWrapper = document.querySelector('.links-wrapper');
const menu = document.querySelector('.hamburger-menu');
const packagesMenu = document.querySelector('.packages');
const eventsMenu = document.querySelector('.events');
const mobileQuery = window.matchMedia('(max-width: 1145px)');

menu.addEventListener('click', toggleHamburgerMenu);
menu.addEventListener('keydown', toggleHamburgerMenu);
linksWrapper.addEventListener('click', toggleSubmenu);
linksWrapper.addEventListener('keydown', toggleSubmenu);
document.addEventListener('keydown', handleEscape);

// focus event listeners for keyboard users
if (packagesMenu) {
    packagesMenu.addEventListener('focusin', menuFocus);
    packagesMenu.addEventListener('focusout', menuBlur);
};

if (eventsMenu) {
    eventsMenu.addEventListener('focusin', menuFocus);
    eventsMenu.addEventListener('focusout', menuBlur);
};

// removes the open class from the submenu if it's closed
function closeMenu(menuType) {
    if (menuType === 'packages') {
        linksWrapper.classList.remove('packages-menu-open');
    } else {
        linksWrapper.classList.remove('events-menu-open');
    };
};

// checks which submenu is focused and updates the variable accordingly
function menuFocus(e) {
    if (!mobileQuery.matches) return;
    
    if (e.currentTarget.classList.contains('packages')) {
        linksWrapper.classList.add('packages-menu-open');
    } else {
        linksWrapper.classList.add('events-menu-open');
    };
};

// closes the sub menu when it's tabbed away
function menuBlur(e) {
    if (!mobileQuery.matches) return;
    
    if (e.currentTarget.contains(e.relatedTarget)) return;
    
    if (e.currentTarget.classList.contains('packages')) {
        closeMenu('packages');
    } else {
        closeMenu('events');
    };
};

// toggles the hamburger menu when clicking, using enter or space keys 
function toggleHamburgerMenu(e) {
    if (e.type !== 'click' && e.key !== 'Enter' && e.key !== ' ') return;
    
    e.preventDefault();

    wrapper.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
};

// toggles the sub menu when clicking, using enter or space keys
function toggleSubmenu(e) {
    const clickedPackages = e.target.closest('.packages');
    const clickedEvents = e.target.closest('.events');

    // allows the links inside the sub menu's to be clickable
    if (e.target.closest('.sub-menu')) return;

    if (e.type !== 'click' && e.key !== 'Enter' && e.key !== ' ') return;

    // prevents the submenu logic from running if clicking on other links
    if (!clickedPackages && !clickedEvents) return;
    
    e.preventDefault();
    
    // toggles the sub menu classes to open or close
    if (clickedPackages) {
        linksWrapper.classList.toggle('packages-menu-open');
    } else {
        linksWrapper.classList.toggle('events-menu-open');
    };
};

// closes the sub menu's and the hamburger menu when using the escape key
function handleEscape(e) {
    if (e.key !== 'Escape') return;

    const activeElement = document.activeElement;
    const isInsidePackagesMenu = packagesMenu && packagesMenu.contains(activeElement);
    const isInsideEventsMenu = eventsMenu && eventsMenu.contains(activeElement);
    
    // checks if the user is focused on something inside the packages or events sub menu's
    if (isInsidePackagesMenu) {
        e.preventDefault();
        activeElement.blur();
        closeMenu('packages');
        return;
    };
    
    if (isInsideEventsMenu) {
        e.preventDefault();
        activeElement.blur();
        closeMenu('events');
        return;
    };
    
    // mobile - closes any of the open sub menu's
    if (linksWrapper.classList.contains('packages-menu-open')) {
        e.preventDefault();
        closeMenu('packages');
        return;
    };
    
    if (linksWrapper.classList.contains('events-menu-open')) {
        e.preventDefault();
        closeMenu('events');
        return;
    };
    
    // closes the hamburger menu
    if (wrapper.classList.contains('active')) {
        e.preventDefault();
        wrapper.classList.remove('active');
        document.body.classList.remove('no-scroll');
    };
};