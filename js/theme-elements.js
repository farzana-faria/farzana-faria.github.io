/**
 * Theme Elements - Updates SVG elements in the hero section based on the current theme
 */

document.addEventListener('DOMContentLoaded', function() {
    // Set up the theme change observer
    setupThemeColorObserver();
    
    // Initial update based on the current theme
    updateHeroSvgColors();
    updateHeroBackground();
});

/**
 * Updates the SVG elements in the hero section based on the current theme
 */
function updateHeroSvgColors() {
    // Get computed CSS variables from the current theme
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
    const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim();
    
    // Update atom colors
    const atom1 = document.querySelector('.atom-1 circle');
    const atom1Orbits = document.querySelectorAll('.atom-1 ellipse');
    const atom2 = document.querySelector('.atom-2 circle');
    const atom2Orbits = document.querySelectorAll('.atom-2 ellipse');
    
    if (atom1) atom1.setAttribute('fill', primaryColor);
    if (atom1Orbits) atom1Orbits.forEach(orbit => orbit.setAttribute('stroke', primaryColor));
    if (atom2) atom2.setAttribute('fill', secondaryColor);
    if (atom2Orbits) atom2Orbits.forEach(orbit => orbit.setAttribute('stroke', secondaryColor));
    
    // Update DNA helix
    const dnaStrands = document.querySelectorAll('.dna');
    if (dnaStrands && dnaStrands.length >= 2) {
        dnaStrands[0].setAttribute('stroke', primaryColor);
        dnaStrands[1].setAttribute('stroke', secondaryColor);
    }
    
    // Update molecule structure
    const moleculeCircles = document.querySelectorAll('.molecule circle');
    if (moleculeCircles && moleculeCircles.length >= 4) {
        moleculeCircles[0].setAttribute('fill', primaryColor);
        moleculeCircles[1].setAttribute('fill', secondaryColor);
        moleculeCircles[2].setAttribute('fill', secondaryColor);
        moleculeCircles[3].setAttribute('fill', primaryColor);
    }

    // Update beaker
    const beaker = document.querySelector('.beaker path');
    const liquid = document.querySelector('.liquid');
    if (beaker) beaker.setAttribute('stroke', primaryColor);
    if (liquid) liquid.setAttribute('fill', primaryColor);
    
    // Update flask
    const flask = document.querySelector('.flask path');
    const flaskCircle = document.querySelector('.flask circle');
    if (flask) flask.setAttribute('stroke', primaryColor);
    if (flaskCircle) {
        flaskCircle.setAttribute('stroke', secondaryColor);
        flaskCircle.setAttribute('fill', `rgba(${hexToRgb(secondaryColor)}, 0.2)`);
    }
    
    // Update waves
    const waves = document.querySelectorAll('.wave');
    if (waves && waves.length >= 2) {
        waves[0].setAttribute('stroke', '#E9E0D1'); // Keep subtle color for first wave
        waves[1].setAttribute('stroke', secondaryColor);
    }
    
    // Update formula text color
    const formulas = document.querySelectorAll('.formula');
    if (formulas) {
        formulas.forEach(formula => {
            formula.setAttribute('fill', textColor);
        });
    }
    
    // Update pulse circles
    const pulseCircles = document.querySelectorAll('.pulse-circle');
    if (pulseCircles && pulseCircles.length >= 3) {
        pulseCircles[0].setAttribute('fill', primaryColor);
        pulseCircles[1].setAttribute('fill', secondaryColor);
        pulseCircles[2].setAttribute('fill', primaryColor);
    }
}

/**
 * Updates the hero section background to match the current theme
 */
function updateHeroBackground() {
    // Get theme colors from CSS variables
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
    const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Get hero background elements
    const heroBg = document.querySelector('.hero-bg');
    const heroPattern = document.querySelector('.hero-pattern');
    const teacherAnimation = document.querySelector('.teacher-animation');
    
    if (heroBg) {
        if (isDarkMode) {
            // Dark mode - use darker colors
            heroBg.style.background = 'linear-gradient(135deg, #1f2933 0%, #151a20 100%)';
        } else {
            // Light mode - use theme-appropriate light background
            const bgLight = getComputedStyle(document.documentElement).getPropertyValue('--bg-light').trim();
            const bgSecondary = getComputedStyle(document.documentElement).getPropertyValue('--bg-secondary').trim();
            heroBg.style.background = `linear-gradient(135deg, ${bgLight} 0%, ${bgSecondary} 100%)`;
        }
    }
    
    if (heroPattern) {
        // Update the dot pattern with theme colors but adjust opacity for visibility
        const primaryOpacity = isDarkMode ? 0.4 : 0.3;
        const secondaryOpacity = isDarkMode ? 0.4 : 0.3;
        
        heroPattern.style.backgroundImage = `
            radial-gradient(rgba(${hexToRgb(primaryColor)}, ${primaryOpacity}) 1px, transparent 1px),
            radial-gradient(rgba(${hexToRgb(secondaryColor)}, ${secondaryOpacity}) 1px, transparent 1px)
        `;
        heroPattern.style.opacity = '1'; // Ensure pattern is visible
    }
    
    if (teacherAnimation) {
        if (isDarkMode) {
            // Dark mode - match the hero background dark gradient
            teacherAnimation.style.background = 'linear-gradient(135deg, #252d38 0%, #1c232d 100%)';
        } else {
            // Light mode - use theme-appropriate light background
            const bgLight = getComputedStyle(document.documentElement).getPropertyValue('--bg-light').trim();
            const bgSecondary = getComputedStyle(document.documentElement).getPropertyValue('--bg-secondary').trim();
            teacherAnimation.style.background = `linear-gradient(135deg, ${bgLight} 0%, ${bgSecondary} 100%)`;
        }
    }
}

/**
 * Sets up a mutation observer to watch for changes in the theme stylesheet
 */
function setupThemeColorObserver() {
    // Watch for theme changes
    const themeStylesheet = document.getElementById('theme-stylesheet');
    if (!themeStylesheet) {
        console.warn('Theme stylesheet not found, will use event listeners only');
    } else {
        // Create a mutation observer to watch for href changes
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'href') {
                    // Wait for the stylesheet to load
                    setTimeout(() => {
                        // Theme has changed, update colors
                        updateHeroSvgColors();
                        updateHeroBackground();
                    }, 50);
                }
            });
        });
        
        // Start observing
        observer.observe(themeStylesheet, { attributes: true });
    }
    
    // Watch for new theme stylesheets being added (our improved implementation)
    const headObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.id === 'theme-stylesheet') {
                        // Wait for the stylesheet to load
                        setTimeout(() => {
                            updateHeroSvgColors();
                            updateHeroBackground();
                        }, 50);
                    }
                });
            }
        });
    });
    
    // Start observing the head for new stylesheets
    headObserver.observe(document.querySelector('head'), { 
        childList: true,
        subtree: true
    });
    
    // Also listen for dark mode toggle
    document.addEventListener('darkModeChanged', function(event) {
        // Dark mode was toggled, update colors
        console.log('Dark mode changed, updating colors');
        updateHeroSvgColors();
        updateHeroBackground();
    });
    
    // Listen for theme changes
    document.addEventListener('themeChanged', function(event) {
        // Theme was changed, update colors
        console.log('Theme changed event received', event.detail);
        
        // Wait a brief moment for CSS variables to update
        setTimeout(() => {
            updateHeroSvgColors();
            updateHeroBackground();
        }, 50);
    });
}

/**
 * Helper function to convert hex color to rgb format
 */
function hexToRgb(hex) {
    // Remove the # if present
    hex = hex.replace('#', '');
    
    // Parse the hex value
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    
    return `${r}, ${g}, ${b}`;
}

/**
 * Helper function to lighten or darken a color
 * @param {string} color - Hex color code
 * @param {number} amount - Amount to lighten (positive) or darken (negative)
 * @returns {string} - New hex color
 */
function lightenDarkenColor(color, amount) {
    // Remove the # if present
    color = color.replace(/^#/, '');
    
    // Convert to RGB
    let r = parseInt(color.substring(0, 2), 16);
    let g = parseInt(color.substring(2, 4), 16);
    let b = parseInt(color.substring(4, 6), 16);
    
    // Lighten or darken
    r = Math.max(0, Math.min(255, r + amount));
    g = Math.max(0, Math.min(255, g + amount));
    b = Math.max(0, Math.min(255, b + amount));
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
} 