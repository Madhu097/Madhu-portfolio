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
    // Initialize responsive project marquee
    setupProjectMarquee();
});

/*
  Responsive continuous marquee for project cards.
  - Converts existing `.sec-4-2` list of `.box3` cards into a scrolling track.
  - Duplicates children as needed so the scroll is continuous.
  - Generates dynamic keyframes based on track width and updates on resize.
*/
function setupProjectMarquee() {
    const srcContainer = document.querySelector('.sec-4-2');
    if (!srcContainer) return;

    // If we already transformed this container, skip
    if (srcContainer.classList.contains('marquee-initialized')) return;

    // Create outer viewport and track
    const outer = document.createElement('div');
    outer.className = 'project-slider-container';
    const track = document.createElement('div');
    track.className = 'project-slider';

    // Move existing project cards (.box3) into track
    const cards = Array.from(srcContainer.querySelectorAll('.box3'));
    if (cards.length === 0) return; // nothing to do
    cards.forEach(card => track.appendChild(card));

    // Replace the original container with our outer viewport
    srcContainer.parentNode.replaceChild(outer, srcContainer);
    outer.appendChild(track);

    // helper: remove previously added clones
    function removeClones() {
        Array.from(track.querySelectorAll('.clone')).forEach(n => n.remove());
    }

    // helper: build clones until track width >= 2 * viewport width
    function ensureEnoughContent() {
        removeClones();
        const viewportW = outer.clientWidth || document.documentElement.clientWidth;
        let i = 0;
        // Clone original set (not including clones) until long enough
        const originals = Array.from(track.querySelectorAll('.box3'));
        while (track.scrollWidth < viewportW * 2 && i < 20) {
            originals.forEach(orig => {
                const c = orig.cloneNode(true);
                c.classList.add('clone');
                track.appendChild(c);
            });
            i++;
        }
    }

    // Create / update the animation based on track width
    let styleEl = null;
    function updateAnimation() {
        if (styleEl) styleEl.remove();
        styleEl = document.createElement('style');
        const distance = Math.round(track.scrollWidth / 2);
    // speed: pixels per second (adjustable) — lower = slower scroll
    const speed = 40; // px per second (slower)
        const duration = Math.max(8, Math.round(distance / speed));

        const animName = `marquee_${Date.now()}`;
        styleEl.textContent = `@keyframes ${animName} { 0% { transform: translateX(0); } 100% { transform: translateX(-${distance}px); } }\n` +
            `.project-slider { animation: ${animName} ${duration}s linear infinite; }`;

        document.head.appendChild(styleEl);
    }

    // Pause on hover
    // Pause on mouse hover (desktop)
    track.addEventListener('mouseenter', () => { track.style.animationPlayState = 'paused'; });
    track.addEventListener('mouseleave', () => { track.style.animationPlayState = 'running'; });

    // On touch devices, resume after interaction so auto-scroll continues
    let resumeTimer = null;
    function pauseForInteraction() {
        if (resumeTimer) { clearTimeout(resumeTimer); resumeTimer = null; }
        track.style.animationPlayState = 'paused';
    }
    function resumeAfterInteraction(delay = 600) {
        if (resumeTimer) clearTimeout(resumeTimer);
        resumeTimer = setTimeout(() => {
            track.style.animationPlayState = 'running';
            resumeTimer = null;
        }, delay);
    }

    track.addEventListener('touchstart', () => { pauseForInteraction(); });
    track.addEventListener('touchend', () => { resumeAfterInteraction(500); });
    // pointer events (covers pen/mouse/touch in supporting browsers)
    track.addEventListener('pointerdown', () => { pauseForInteraction(); });
    track.addEventListener('pointerup', () => { resumeAfterInteraction(500); });

    // initial setup
    function rebuild() {
        ensureEnoughContent();
        // small timeout to wait for images to load and sizes to settle
        setTimeout(() => {
            updateAnimation();
        }, 120);
    }

    rebuild();

    // recompute on resize (debounced)
    let rt;
    window.addEventListener('resize', () => {
        clearTimeout(rt);
        rt = setTimeout(() => {
            rebuild();
        }, 180);
    });

    // mark as initialized to avoid duplicate transforms
    srcContainer.classList.add('marquee-initialized');
}