document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS with settings optimized for contact section animations
    AOS.init({
        duration: 800,
        once: true,
        offset: 100, // Slight offset to ensure animations trigger smoothly
        easing: 'ease-in-out' // Smooth easing for zoom-in effects
    });

    // Dark/Light Mode Toggle with localStorage
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const theme = localStorage.getItem('theme');

    if (theme === 'light') {
        body.classList.add('light-mode');
        toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
    }

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        toggleButton.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    // Navbar toggle functionality
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarNav');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    // Initialize Bootstrap Collapse
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false
    });

    // Toggle navbar on click
    navbarToggler.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        bsCollapse.toggle();
        navbarToggler.setAttribute('aria-expanded', navbarCollapse.classList.contains('show'));
    });

    // Prevent clicks inside navbar from closing it
    navbarCollapse.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Smooth scrolling and collapse navbar on link click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close navbar after clicking a link
                bsCollapse.hide();
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Close navbar when clicking outside (debounced for mobile)
    let isToggling = false;
    document.addEventListener('click', (e) => {
        if (isToggling) return;
        if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target) && navbarCollapse.classList.contains('show')) {
            isToggling = true;
            bsCollapse.hide();
            navbarToggler.setAttribute('aria-expanded', 'false');
            setTimeout(() => { isToggling = false; }, 300);
        }
    });

    // Contact Form Submission (handled by Formspree)
    const form = document.getElementById('contact-form');
    const formContainer = form.parentElement;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Remove any existing messages
        const existingMessage = formContainer.querySelector('.form-message');
        if (existingMessage) existingMessage.remove();

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message text-center mt-3 p-3 rounded';
        messageDiv.style.transition = 'opacity 0.5s ease';
        messageDiv.style.opacity = '0';
        formContainer.insertBefore(messageDiv, form.nextSibling);

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                messageDiv.textContent = 'Message sent successfully!';
                messageDiv.classList.add('bg-success', 'text-white');
                form.reset();
            } else {
                messageDiv.textContent = 'Error sending message. Please try again.';
                messageDiv.classList.add('bg-danger', 'text-white');
            }
            // Fade in message
            setTimeout(() => { messageDiv.style.opacity = '1'; }, 100);
            // Remove message after 5 seconds
            setTimeout(() => {
                messageDiv.style.opacity = '0';
                setTimeout(() => { messageDiv.remove(); }, 500);
            }, 5000);
        }).catch(() => {
            messageDiv.textContent = 'Error sending message. Please try again.';
            messageDiv.classList.add('bg-danger', 'text-white');
            // Fade in message
            setTimeout(() => { messageDiv.style.opacity = '1'; }, 100);
            // Remove message after 5 seconds
            setTimeout(() => {
                messageDiv.style.opacity = '0';
                setTimeout(() => { messageDiv.remove(); }, 500);
            }, 5000);
        });
    });
});