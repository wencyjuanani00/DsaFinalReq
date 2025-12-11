document.addEventListener('DOMContentLoaded', function() {
    // Navigation highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Tab switching
    const tabs = document.querySelectorAll('.ds-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Initialize tabs
    function initializeTabs() {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.getAttribute('data-tab');
                
                // Update active tab
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Show target tab content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === targetTab + '-tab') {
                        content.classList.add('active');
                        
                        // Reset language to C++ when switching tabs
                        const langButtons = content.querySelectorAll('.lang-btn');
                        const codeContainers = content.querySelectorAll('.code-container');
                        
                        langButtons.forEach(btn => {
                            btn.classList.remove('active');
                            if (btn.getAttribute('data-lang') === 'cpp') {
                                btn.classList.add('active');
                            }
                        });
                        
                        codeContainers.forEach(container => {
                            if (container.id.includes('cpp')) {
                                container.style.display = 'block';
                            } else {
                                container.style.display = 'none';
                            }
                        });
                    }
                });
            });
        });
    }
    
    // Language switching
    function initializeLanguageToggles() {
        const langButtons = document.querySelectorAll('.lang-btn');
        
        langButtons.forEach(button => {
            button.addEventListener('click', () => {
                const lang = button.getAttribute('data-lang');
                const tabContent = button.closest('.tab-content');
                
                // Update active language button
                tabContent.querySelectorAll('.lang-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
                
                // Show selected language code
                tabContent.querySelectorAll('.code-container').forEach(container => {
                    if (container.id.includes(lang)) {
                        container.style.display = 'block';
                    } else {
                        container.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Scroll spy for navigation
    function updateActiveNavLink() {
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Smooth scrolling for navigation links
    function initializeSmoothScrolling() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
    }
    
    // Initialize all functionality
    function initialize() {
        initializeTabs();
        initializeLanguageToggles();
        initializeSmoothScrolling();
        
        // Set up scroll listener
        window.addEventListener('scroll', updateActiveNavLink);
        updateActiveNavLink(); // Initial call
    }
    
    // Run initialization
    initialize();
});