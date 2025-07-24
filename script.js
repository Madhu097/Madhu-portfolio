 // Typewriter Effect
function initTypewriter() {
    const textElement = document.querySelector('.typewriter-text');
    const cursor = document.querySelector('.cursor');
    const words = ['Frontend Developer', 'UI/UX Designer', 'Editor'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 70; // Faster typing speed
    let deletingSpeed = 30; // Faster deleting speed
    let delayBetweenWords = 800; // Shorter delay between words

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Delete character
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = deletingSpeed;
        } else {
            // Type character
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Word is typed completely, wait and start deleting
            typingSpeed = delayBetweenWords;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Word is deleted, move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(type, typingSpeed);
    }

    // Start the typewriter effect
    setTimeout(type, 1000);
}

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
    
    // Initialize typewriter effect
    initTypewriter();
});