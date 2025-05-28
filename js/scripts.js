document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({ duration: 800, once: true });

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

    // Initialize Chart.js for Netflix Data Analysis
    const ctx = document.getElementById('netflixChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [
                {
                    label: 'Movies Watched (Millions)',
                    data: [50, 60, 80, 70, 90],
                    backgroundColor: '#3b82f6',
                    borderColor: '#2563eb',
                    borderWidth: 1
                },
                {
                    label: 'TV Shows Watched (Millions)',
                    data: [30, 40, 50, 45, 60],
                    backgroundColor: '#6b7280',
                    borderColor: '#4b5563',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Viewership (Millions)',
                        color: '#e0e0e0'
                    },
                    grid: {
                        color: '#4b5563'
                    },
                    ticks: {
                        color: '#e0e0e0'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month',
                        color: '#e0e0e0'
                    },
                    grid: {
                        color: '#4b5563'
                    },
                    ticks: {
                        color: '#e0e0e0'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#e0e0e0'
                    }
                },
                title: {
                    display: true,
                    text: 'Netflix Viewing Trends (2024)',
                    color: '#e0e0e0'
                }
            }
        }
    });

    // Contact Form Submission (handled by Formspree)
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Message sent successfully!');
                form.reset();
            } else {
                alert('There was an error sending your message. Please try again.');
            }
        }).catch(() => {
            alert('There was an error sending your message. Please try again.');
        });
    });
});