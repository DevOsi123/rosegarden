document.addEventListener('DOMContentLoaded', function() {
    // Sticky header functionality
    const header = document.querySelector('.sticky-header');
    let lastScrollPosition = 0;

    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset;

        if (currentScrollPosition > 100) {
            if (currentScrollPosition > lastScrollPosition) {
                // Scrolling down - hide header
                header.classList.add('hide');
            } else {
                // Scrolling up - show header
                header.classList.remove('hide');
            }
        } else {
            // At top of page - show header
            header.classList.remove('hide');
        }

        lastScrollPosition = currentScrollPosition;
    });

    // Image carousel functionality
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const carouselItems = carousel.querySelectorAll('.carousel-item');
        let currentIndex = 0;

        function showCarouselItem(index) {
            carouselItems.forEach((item, i) => {
                if (i === index) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }

        function nextCarouselItem() {
            currentIndex = (currentIndex + 1) % carouselItems.length;
            showCarouselItem(currentIndex);
        }

        function prevCarouselItem() {
            currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
            showCarouselItem(currentIndex);
        }

        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', prevCarouselItem);
            nextBtn.addEventListener('click', nextCarouselItem);
        }

        let carouselInterval = setInterval(nextCarouselItem, 5000);

        carousel.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });

        carousel.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(nextCarouselItem, 5000);
        });

        showCarouselItem(currentIndex);
    }

    // Menu item zoom functionality
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        const image = item.querySelector('.menu-item-image');
        const zoomContainer = item.querySelector('.menu-item-zoom');
        
        if (image && zoomContainer) {
            image.addEventListener('mouseenter', () => {
                zoomContainer.classList.add('active');
            });

            image.addEventListener('mouseleave', () => {
                zoomContainer.classList.remove('active');
            });
        }
    });

    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking a link
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }});