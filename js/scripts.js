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

    // Prevent navbar collapse from closing prematurely on mobile
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navbarToggler.addEventListener('click', (e) => {
        e.stopPropagation();
        navbarCollapse.classList.toggle('show');
    });

    navbarCollapse.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarCollapse.classList.remove('show');
        });
    });

    document.addEventListener('click', (e) => {
        if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
            navbarCollapse.classList.remove('show');
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