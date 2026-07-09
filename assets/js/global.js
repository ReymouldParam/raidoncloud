/**
 * Mobile Toggle Menu Handler
 * Handles opening/closing of mobile navbar on mobile devices
 */

document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

    /**
     * Toggle mobile menu
     */
    function toggleMobileMenu() {
        if (mobileToggle && mobileMenu) {
            mobileToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        }
    }

    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        if (mobileToggle && mobileMenu) {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    }

    /**
     * Close menu when a link is clicked
     */
    function handleMenuLinkClick(e) {
        // Check if the link is not an external/anchor link
        const href = e.target.getAttribute('href');
        
        // Close menu on navigation
        closeMobileMenu();
    }

    // Toggle menu on button click
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMobileMenu();
        });
    }

    // Close menu when clicking on a menu link
    if (mobileMenuLinks.length > 0) {
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', handleMenuLinkClick);
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileToggle && mobileMenu) {
            const isClickInside = mobileToggle.contains(e.target) || 
                                 mobileMenu.contains(e.target);
            
            if (!isClickInside && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });

    // Close menu on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    /**
     * Set active link based on current page
     */
    function setActiveLink() {
        const currentLocation = location.pathname.split('/').pop() || 'index.html';
        
        mobileMenuLinks.forEach(link => {
            const href = link.getAttribute('href').split('/').pop() || 'index.html';
            
            // Handle root path
            if (currentLocation === '' || currentLocation === '/') {
                if (href === '' || href === 'index.html') {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            } else {
                if (href === currentLocation) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    // Set active link on page load
    setActiveLink();

    /**
     * Handle window resize - close menu on larger screens
     */
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
});
