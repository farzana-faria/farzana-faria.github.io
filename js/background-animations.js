document.addEventListener('DOMContentLoaded', function() {
    // Background animation elements
    const animatedBgs = document.querySelectorAll('.animated-bg');
    
    // Initialize animations
    function initializeBackgroundAnimations() {
        if (animatedBgs.length > 0) {
            animatedBgs.forEach(bg => {
                const particles = bg.querySelectorAll('.particle');
                animateParticles(particles);
            });
        }
    }

    // Animate particles with random movements
    function animateParticles(particles) {
        if (particles.length > 0) {
            particles.forEach(particle => {
                const duration = Math.random() * 20 + 10;
                const delay = Math.random() * 5;
                
                particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
                particle.style.opacity = Math.random() * 0.7 + 0.3;
            });
        }
    }
    
    // Initialize
    initializeBackgroundAnimations();
}); 