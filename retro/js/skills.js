// Skills Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Calculate total XP
    const skillBars = document.querySelectorAll('.skill-fill');
    let totalXP = 0;
    
    skillBars.forEach(bar => {
        const width = parseInt(bar.style.width);
        totalXP += width;
    });
    
    // Animate total XP counter
    const xpCounter = document.getElementById('total-xp');
    let currentXP = 0;
    const increment = Math.ceil(totalXP / 100);
    
    const counterInterval = setInterval(() => {
        currentXP += increment;
        if (currentXP >= totalXP) {
            currentXP = totalXP;
            clearInterval(counterInterval);
        }
        xpCounter.textContent = currentXP;
    }, 20);
    
    // Animate skill bars on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillFill = entry.target.querySelector('.skill-fill');
                if (skillFill) {
                    const width = skillFill.style.width;
                    skillFill.style.width = '0';
                    setTimeout(() => {
                        skillFill.style.width = width;
                    }, 100);
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.skill-item').forEach(item => {
        observer.observe(item);
    });
});
