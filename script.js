document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme == 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeToggles.forEach(toggle => {
            if (toggle.querySelector('i')) {
                toggle.querySelector('i').classList.remove('fa-moon');
                toggle.querySelector('i').classList.add('fa-sun');
            }
        });
    } else if (currentTheme == 'light') {
        document.body.setAttribute('data-theme', 'light');
        themeToggles.forEach(toggle => {
            if (toggle.querySelector('i')) {
                toggle.querySelector('i').classList.remove('fa-sun');
                toggle.querySelector('i').classList.add('fa-moon');
            }
        });
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            let theme = 'light';
            if (document.body.getAttribute('data-theme') === 'light') {
                document.body.setAttribute('data-theme', 'dark');
                theme = 'dark';
                document.querySelectorAll('.theme-toggle i').forEach(icon => {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                });
            } else {
                document.body.setAttribute('data-theme', 'light');
                theme = 'light';
                document.querySelectorAll('.theme-toggle i').forEach(icon => {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                });
            }
            localStorage.setItem('theme', theme);
        });
    });

    // Active Link Highlighting (Header & Sidebar)
    const currentLocation = location.pathname.split('/').pop() || 'index.html';
    const menuItems = document.querySelectorAll('nav a, .sidebar-nav a');
    menuItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentLocation || (currentLocation === '' && href === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Sidebar Mobile Toggle
    const mobileSidebarBtn = document.getElementById('mobile-sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.dashboard-main');

    if (mobileSidebarBtn && sidebar) {
        mobileSidebarBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 900 &&
                !sidebar.contains(e.target) &&
                !mobileSidebarBtn.contains(e.target) &&
                sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    }

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
