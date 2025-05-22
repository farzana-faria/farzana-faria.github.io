document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const enToggle = document.getElementById('en-toggle');
    const bnToggle = document.getElementById('bn-toggle');
    const backToTop = document.getElementById('back-to-top');
    const contactForm = document.getElementById('contactForm');
    const animateElements = document.querySelectorAll('.animate');
    const themeSelector = document.querySelector('.theme-selector');
    const themeSelectorBtn = document.getElementById('theme-selector-btn');
    const themeDropdown = document.querySelector('.theme-dropdown');
    const themeOptions = document.querySelectorAll('.theme-option');
    const themeStylesheet = document.getElementById('theme-stylesheet');
    const themeToggle = document.getElementById('theme-mode-toggle');
    const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
    const navDropdowns = document.querySelectorAll('.nav-dropdown');

    // Initialize
    initializeColorThemes();
    initializeLanguageToggle();
    showAllSections();
    initializeAnimations();
    checkScroll(); // Called immediately to set active menu item on page load
    initializeDarkMode();
    initializeCurriculum();
    initializeTestimonials();
    initializeEducationTimeline();
    initializeNavDropdowns();

    // Navigation Dropdown Menu
    function initializeNavDropdowns() {
        // No longer needed - dropdown menu has been removed
        console.log('Dropdown menu has been removed');
    }
    
    // Handle dropdown toggle click
    function handleDropdownToggle(e) {
        // No longer needed - dropdown menu has been removed
    }
    
    // Handle click outside dropdown
    function handleOutsideClick(e) {
        // No longer needed for dropdown handling
    }
    
    // Handle escape key press
    function handleEscapeKey(e) {
        // Still handle escape for other modals, but not for dropdowns
        // The dropdown specific code is removed
    }
    
    // Handle window resize
    function handleResize() {
        // No dropdown handling needed
    }

    // Theme Switching Functionality
    function initializeColorThemes() {
        if (!themeSelector || !themeSelectorBtn || !themeStylesheet || !themeDropdown) {
            console.error('Theme elements not found');
            return;
        }

        // Toggle theme dropdown
        themeSelectorBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            themeDropdown.classList.toggle('active');
        });

        // Close theme dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!themeSelector.contains(e.target)) {
                themeDropdown.classList.remove('active');
            }
        });

        // Handle theme option selection
        themeOptions.forEach(option => {
            option.addEventListener('click', function() {
                const selectedTheme = this.getAttribute('data-theme');
                setColorTheme(selectedTheme);

                // Update active state
                themeOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');

                // Close dropdown
                themeDropdown.classList.remove('active');
            });
        });

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('colorTheme') || 'emerald-gold';
        setColorTheme(savedTheme);
        themeOptions.forEach(option => {
            if (option.getAttribute('data-theme') === savedTheme) {
                option.classList.add('active');
            }
        });
    }

    function setColorTheme(themeName) {
        let themeFile;
        console.log('Setting theme to:', themeName);

        switch(themeName) {
            case 'default':
                themeFile = 'css/default-theme.css';
                break;
            case 'dusty-rose-sage':
                themeFile = 'css/dusty-rose-sage-theme.css';
                break;
            case 'teal':
                themeFile = 'css/teal-theme.css';
                break;
            case 'modern-navy': // For backward compatibility
            case 'slate-amber':
                themeFile = 'css/slate-amber-theme.css';
                break;
            case 'purple-accent':
                themeFile = 'css/purple-accent-theme.css';
                break;
            case 'emerald-gold':
                themeFile = 'css/emerald-gold-theme.css';
                break;
            case 'burgundy-gold':
                themeFile = 'css/burgundy-gold-theme.css';
                break;
            case 'midnight-orange':
                themeFile = 'css/midnight-orange-theme.css';
                break;
            case 'turquoise-coral':
                themeFile = 'css/turquoise-coral-theme.css';
                break;
            default:
                themeFile = 'css/emerald-gold-theme.css';
        }

        console.log('Loading theme file:', themeFile);
        
        // Create a new link element to avoid caching issues
        const newLink = document.createElement('link');
        newLink.rel = 'stylesheet';
        newLink.id = 'theme-stylesheet';
        newLink.href = themeFile;
        
        // Add a subtle fade transition when changing color themes
        document.body.style.opacity = '0.95';
        
        // Replace the existing theme link with the new one
        const head = document.querySelector('head');
        const oldLink = document.getElementById('theme-stylesheet');
        if (oldLink) {
            head.replaceChild(newLink, oldLink);
        } else {
            head.appendChild(newLink);
        }
        
        localStorage.setItem('colorTheme', themeName);
        
        // Restore opacity after a short delay
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
        
        // Dispatch custom event when theme changes
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: themeName } }));
    }

    // Make sure all sections are visible
    function showAllSections() {
        sections.forEach(section => {
            section.style.display = 'block';
            section.style.visibility = 'visible';
            section.style.opacity = '1';
            section.classList.add('visible');
        });
    }

    // Handle Navigation
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Close any open dropdowns when toggling mobile menu
        if (!navMenu.classList.contains('active')) {
            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Smooth scrolling functionality initialized elsewhere

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Skip for dropdown toggles and back-to-top
            if (this.classList.contains('nav-dropdown-toggle') || targetId === '#') {
                return;
            }
            
            e.preventDefault();
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
            
            // Close any open dropdowns
            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link on scroll
    window.addEventListener('scroll', function() {
        checkScroll();
    });

    // Back to Top Button functionality
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Check scroll position for various UI updates
    function checkScroll() {
        const scrollPosition = window.scrollY;
        
        // Header shadow on scroll
        if (header && scrollPosition > 50) {
            header.classList.add('scrolled');
        } else if (header) {
            header.classList.remove('scrolled');
        }
        
        // Active nav link based on section
        if (sections.length > 0 && navLinks.length > 0) {
            // Default to home as active if at the top
            if (scrollPosition < 150) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#hero') {
                        link.classList.add('active');
                    }
                });
            } else {
                // Determine which section is in view
                sections.forEach(section => {
                    const sectionId = section.getAttribute('id');
                    if (!sectionId) return;
                    
                    const sectionTop = section.offsetTop - 150;
                    const sectionHeight = section.offsetHeight;
                    const sectionBottom = sectionTop + sectionHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        // Set the active navigation link
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${sectionId}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }
        }
        
        // Check for elements to animate
        animateOnScroll();
    }

    // Initialize Dark Mode
    function initializeDarkMode() {
        if (!themeToggle) {
            console.log('Theme toggle element not found with ID "theme-mode-toggle"');
            return;
        }
        
        console.log('Theme toggle found:', themeToggle);
        
        // Function to update theme based on dark mode state
        function setDarkMode(isDark) {
            console.log('Setting dark mode to:', isDark);
            
            // Apply dark mode class to body
            document.body.classList.toggle('dark-mode', isDark);
            
            // Save preference to localStorage
            localStorage.setItem('darkMode', isDark.toString());
            
            // Update Google Maps theme if needed
            updateMapTheme(isDark);
            
            // Update the sun/moon icons
            const sunIcon = themeToggle.querySelector('.fa-sun');
            const moonIcon = themeToggle.querySelector('.fa-moon');
            
            if (sunIcon && moonIcon) {
                if (isDark) {
                    sunIcon.style.opacity = '1';
                    sunIcon.style.transform = 'translate(-50%, -50%) scale(1)';
                    moonIcon.style.opacity = '0';
                    moonIcon.style.transform = 'translate(-50%, -50%) scale(0.5)';
                } else {
                    sunIcon.style.opacity = '0';
                    sunIcon.style.transform = 'translate(-50%, -50%) scale(0.5)';
                    moonIcon.style.opacity = '1';
                    moonIcon.style.transform = 'translate(-50%, -50%) scale(1)';
                }
            }
            
            // Create a subtle fade transition
            document.body.style.opacity = '0.95';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
            
            // Force refresh theme to ensure correct colors in dark/light mode
            const currentTheme = localStorage.getItem('colorTheme') || 'emerald-gold';
            updateThemeForDarkMode(currentTheme, isDark);
            
            // Dispatch custom event when dark mode changes
            document.dispatchEvent(new CustomEvent('darkModeChanged', { detail: { isDark } }));
        }
        
        // Helper function to update theme based on dark/light mode
        function updateThemeForDarkMode(themeName, isDark) {
            // No need to change theme file, as themes handle dark mode via CSS variables
            // Just dispatch event to trigger theme element updates
            document.dispatchEvent(new CustomEvent('themeChanged', { 
                detail: { theme: themeName, isDarkMode: isDark } 
            }));
        }

        // Check for saved dark mode preference or set dark mode as default
        let isDarkMode = true; // Default to dark mode
        const savedMode = localStorage.getItem('darkMode');
        
        if (savedMode !== null) {
            // Use saved preference if available
            isDarkMode = savedMode === 'true';
        } else {
            // Default to dark mode
            localStorage.setItem('darkMode', 'true');
        }
        
        console.log('Initial dark mode setting:', isDarkMode);
        
        // Apply initial dark mode setting
        setDarkMode(isDarkMode);
        
        // Listen for toggle button clicks
        themeToggle.addEventListener('click', function() {
            console.log('Theme toggle clicked');
            const currentIsDark = document.body.classList.contains('dark-mode');
            setDarkMode(!currentIsDark);
        });
        
        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            // Only apply system preference if user hasn't explicitly set a preference
            if (localStorage.getItem('darkMode') === null) {
                setDarkMode(e.matches);
            }
        });
    }

    // Update Google Map theme based on dark/light mode
    function updateMapTheme(isDark) {
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer && mapContainer.querySelector('iframe')) {
            let mapSrc = mapContainer.querySelector('iframe').src;
            
            // Remove existing style parameter if any
            if (mapSrc.includes('&style=')) {
                mapSrc = mapSrc.split('&style=')[0];
            }
            
            // Add dark style if needed
            if (isDark) {
                mapSrc += '&style=dark';
            }
            
            mapContainer.querySelector('iframe').src = mapSrc;
        }
    }

    // Language Toggle with improved handling
    function initializeLanguageToggle() {
        if (!enToggle || !bnToggle) {
            console.error('Language toggle buttons not found');
            return;
        }

        // Add click event listeners
        enToggle.addEventListener('click', function() {
            changeLanguage('en');
        });

        bnToggle.addEventListener('click', function() {
            changeLanguage('bn');
        });

        // Check for saved language preference
        const savedLang = localStorage.getItem('language') || 'en';
        changeLanguage(savedLang);
    }

    // Change Language Function with improved element selection
    function changeLanguage(lang) {
        if (!enToggle || !bnToggle) return;
        
        const elements = document.querySelectorAll('[data-en][data-bn]');
        
        if (lang === 'en') {
            enToggle.classList.add('active');
            bnToggle.classList.remove('active');
            
            elements.forEach(element => {
                element.textContent = element.getAttribute('data-en');
            });
            
            localStorage.setItem('language', 'en');
        } else if (lang === 'bn') {
            bnToggle.classList.add('active');
            enToggle.classList.remove('active');
            
            elements.forEach(element => {
                element.textContent = element.getAttribute('data-bn');
            });
            
            localStorage.setItem('language', 'bn');
        }
    }

    // Contact Form Submit
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                // In a real application, you would send this data to a server
                // For this demo, we'll just show an alert
                alert('Thank you for your message! In a real website, this would be sent to Farzana.');
                contactForm.reset();
            }
        });
    }

    // Initialize animations
    function initializeAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe all sections and animate elements
        sections.forEach(section => {
            observer.observe(section);
        });

        document.querySelectorAll('.edu-milestone, .timeline-item, .experience-item, .education-item, .skills-category-wrapper, .testimonial-card').forEach(item => {
            observer.observe(item);
        });
    }

    // Animate elements on scroll
    function animateOnScroll() {
        const animateElements = document.querySelectorAll('.animate, .edu-milestone, .timeline-item, .experience-item, .education-item, .skills-category-wrapper, .testimonial-card');
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    }

    // Initial check for visible elements
    window.addEventListener('load', function() {
        showAllSections();
        animateOnScroll();
        checkScroll(); // Make sure active menu state is set on page load
    });

    // Check for visible elements on scroll and update active menu
    window.addEventListener('scroll', function() {
        animateOnScroll();
        checkScroll(); // Always check scroll when scrolling to update active menu
    });

    // Added global functions called in index.html
    function initializeNavigation() {
        // Navigation already initialized in the main script
        console.log("Navigation initialized");
    }

    function initializeLanguageSystem() {
        // Language system already initialized in initializeLanguageToggle()
        console.log("Language system initialized");
    }

    function initializeScrollAnimations() {
        // Animations already initialized in initializeAnimations()
        console.log("Scroll animations initialized");
    }

    function initializeContactForm() {
        // Contact form already set up in the main script
        console.log("Contact form initialized");
    }

    function initializeTestimonials() {
        const testimonialItems = document.querySelectorAll('.testimonial-item');
        
        // Add hover effects to testimonial items
        testimonialItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.classList.add('hover');
            });
            
            item.addEventListener('mouseleave', function() {
                this.classList.remove('hover');
            });
        });
        
        console.log("Testimonials initialized");
    }

    function initializeCurriculum() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const experienceItems = document.querySelectorAll('.experience-item');
        const levelTabs = document.querySelectorAll('.level-tab');
        const curriculumContents = document.querySelectorAll('.curriculum-content');
        
        // Initialize curriculum level tabs with enhanced transitions
        if (levelTabs.length > 0 && curriculumContents.length > 0) {
            // Set initial state - ensure junior content is visible at start
            document.getElementById('junior-content').classList.add('active');
            document.getElementById('junior-content').style.opacity = '1';
            document.getElementById('junior-content').style.transform = 'translateY(0)';
            
            levelTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    if (this.classList.contains('active')) return; // Skip if already active
                    
                    // Create ripple effect on click
                    const ripple = document.createElement('span');
                    ripple.classList.add('tab-ripple');
                    this.appendChild(ripple);
                    
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height) * 2;
                    ripple.style.width = ripple.style.height = `${size}px`;
                    ripple.style.left = `${(rect.width - size) / 2}px`;
                    ripple.style.top = `${(rect.height - size) / 2}px`;
                    
                    // Remove ripple after animation completes
                    setTimeout(() => ripple.remove(), 600);
                    
                    // Remove active class from all tabs
                    levelTabs.forEach(t => t.classList.remove('active'));
                    
                    // Add active class to clicked tab
                    this.classList.add('active');
                    
                    // Get currently active content before hiding all
                    const currentActive = document.querySelector('.curriculum-content.active');
                    const level = this.getAttribute('data-level');
                    const targetContent = document.getElementById(`${level}-content`);
                    
                    if (!targetContent) {
                        console.error(`Content with id ${level}-content not found`);
                        return;
                    }
                    
                    console.log('Switching to:', level, targetContent);
                    
                    // If there's a currently active content, fade it out first
                    if (currentActive) {
                        currentActive.style.opacity = '0';
                        currentActive.style.transform = 'translateY(15px)';
                        
                        // After fade out animation completes
                        setTimeout(() => {
                            // Hide all content sections
                            curriculumContents.forEach(content => {
                                content.classList.remove('active');
                                content.style.opacity = '0';
                                content.style.transform = 'translateY(15px)';
                            });
                            
                            // Show the new content section
                            targetContent.classList.add('active');
                            
                            // Force reflow to ensure animation plays
                            void targetContent.offsetWidth;
                            
                            // Ensure the new content is visible
                            targetContent.style.opacity = '1';
                            targetContent.style.transform = 'translateY(0)';
                            
                            // Scroll to content if not visible (on mobile)
                            if (window.innerWidth <= 768) {
                                const yOffset = -80; // Account for fixed header
                                const y = targetContent.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                window.scrollTo({top: y, behavior: 'smooth'});
                            }
                        }, 300);
                    } else {
                        // No current active content, just show the new one immediately
                        curriculumContents.forEach(content => {
                            content.classList.remove('active');
                        });
                        targetContent.classList.add('active');
                        targetContent.style.opacity = '1';
                        targetContent.style.transform = 'translateY(0)';
                    }
                });
            });
            
            // Add ripple style
            const style = document.createElement('style');
            style.textContent = `
                .tab-ripple {
                    position: absolute;
                    background: rgba(var(--primary-rgb), 0.2);
                    border-radius: 50%;
                    pointer-events: none;
                    transform: scale(0);
                    animation: tabRipple 0.6s linear;
                    z-index: 0;
                }
                
                @keyframes tabRipple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add hover effects and animations to timeline items
        if (timelineItems.length > 0) {
            timelineItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.classList.add('hover');
                });
                
                item.addEventListener('mouseleave', function() {
                    this.classList.remove('hover');
                });
            });
        }
        
        // Add hover effects and animations to experience items
        if (experienceItems.length > 0) {
            experienceItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.classList.add('hover');
                });
                
                item.addEventListener('mouseleave', function() {
                    this.classList.remove('hover');
                });
            });
        }
        
        console.log("Curriculum items initialized");
    }

    // Education Timeline Interactions
    function initializeEducationTimeline() {
        // Handle highlight toggles
        const highlightToggles = document.querySelectorAll('.highlights-toggle');
        
        highlightToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                // Get the content container
                const content = this.closest('.highlights-header').nextElementSibling;
                const isOpen = content.classList.contains('active');
                
                // Toggle active classes
                if (isOpen) {
                    content.classList.remove('active');
                    this.classList.remove('active');
                } else {
                    content.classList.add('active');
                    this.classList.add('active');
                }
            });
        });
        
        // Add interactive hover effects for dot pulses
        const milestones = document.querySelectorAll('.edu-milestone');
        
        milestones.forEach(milestone => {
            // Add hover effect to enhance the pulse animation
            milestone.addEventListener('mouseenter', function() {
                const dot = this.querySelector('.connector-dot');
                if(dot) {
                    dot.style.transform = 'scale(1.1)';
                }
            });
            
            milestone.addEventListener('mouseleave', function() {
                const dot = this.querySelector('.connector-dot');
                if(dot) {
                    dot.style.transform = 'scale(1)';
                }
            });
        });
        
        // Intersection observer for timeline animations with advanced options
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.closest('section').classList.add('visible');
                    
                    // Add staggered animation to each milestone
                    if (entry.target.querySelector('.edu-milestone')) {
                        const milestones = entry.target.querySelectorAll('.edu-milestone');
                        milestones.forEach((milestone, index) => {
                            setTimeout(() => {
                                milestone.style.opacity = '1';
                                milestone.style.transform = 'translateY(0)';
                            }, 300 * index);
                        });
                    }
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '-50px 0px'
        });
        
        // Observe the timeline
        const timelineWrapper = document.querySelector('.edu-timeline-wrapper');
        if (timelineWrapper) {
            observer.observe(timelineWrapper);
        }
    }

    // Education details toggle
    const detailsToggles = document.querySelectorAll('.details-toggle');
    
    detailsToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.closest('.edu-details').querySelector('.edu-details-content');
            
            // Toggle active class on button
            this.classList.toggle('active');
            
            // Toggle content visibility
            if (content.classList.contains('active')) {
                content.classList.remove('active');
            } else {
                content.classList.add('active');
            }
        });
    });

    // Education Timeline Highlights Toggle
    const highlightsToggles = document.querySelectorAll('.highlights-toggle');
    
    highlightsToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.closest('.milestone-highlights').querySelector('.highlights-content');
            
            // Toggle active class on button
            this.classList.toggle('active');
            
            // Toggle content visibility
            if (content.classList.contains('active')) {
                content.classList.remove('active');
            } else {
                content.classList.add('active');
            }
        });
    });
}); 