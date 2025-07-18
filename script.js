 document.addEventListener('DOMContentLoaded', function() {
    // Select elements
    const hamburger = document.querySelector('.hamburger');
    const menuBar = document.querySelector('.navbar-menu .menu-bar');
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    // Toggle menu function
    function toggleMenu() {
        const isOpen = hamburger.classList.toggle('is-active');
        menuBar.classList.toggle('show');
        overlay.classList.toggle('show');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    // Close menu function
    function closeMenu() {
        hamburger.classList.remove('is-active');
        menuBar.classList.remove('show');
        overlay.classList.remove('show');
        document.body.style.overflow = '';
    }

    // Hamburger click event
    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking on overlay
    overlay.addEventListener('click', closeMenu);

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar-menu .menu-bar a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hamburger.classList.contains('is-active')) {
            closeMenu();
        }
    });
});