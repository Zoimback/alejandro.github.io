// Retro Effects JavaScript

// ===== TYPING EFFECT =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// ===== GLITCH EFFECT =====
function randomGlitch() {
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(element => {
        setInterval(() => {
            if (Math.random() > 0.95) {
                element.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
                setTimeout(() => {
                    element.style.transform = 'translate(0, 0)';
                }, 100);
            }
        }, 100);
    });
}

// ===== MATRIX RAIN EFFECT =====
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00FF41';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 50);
}

// ===== VHS GLITCH EFFECT =====
function vhsGlitch() {
    const body = document.body;
    setInterval(() => {
        if (Math.random() > 0.98) {
            body.style.transform = `translate(${Math.random() * 10 - 5}px, 0)`;
            setTimeout(() => {
                body.style.transform = 'translate(0, 0)';
            }, 50);
        }
    }, 100);
}

// ===== SCAN LINE ANIMATION =====
function createScanLine() {
    const scanLine = document.createElement('div');
    scanLine.style.position = 'fixed';
    scanLine.style.top = '0';
    scanLine.style.left = '0';
    scanLine.style.width = '100%';
    scanLine.style.height = '2px';
    scanLine.style.background = 'rgba(0, 240, 255, 0.5)';
    scanLine.style.boxShadow = '0 0 10px rgba(0, 240, 255, 0.8)';
    scanLine.style.zIndex = '9998';
    scanLine.style.animation = 'scanline 6s linear infinite';
    document.body.appendChild(scanLine);

    const style = document.createElement('style');
    style.textContent = `
        @keyframes scanline {
            from { top: 0; }
            to { top: 100%; }
        }
    `;
    document.head.appendChild(style);
}

// ===== BOOT SEQUENCE =====
function bootSequence() {
    const bootMessages = [
        '> INITIALIZING SYSTEM...',
        '> LOADING MODULES...',
        '> CHECKING SECURITY PROTOCOLS...',
        '> ESTABLISHING CONNECTION...',
        '> SYSTEM READY ✓'
    ];

    const bootConsole = document.createElement('div');
    bootConsole.style.position = 'fixed';
    bootConsole.style.top = '50%';
    bootConsole.style.left = '50%';
    bootConsole.style.transform = 'translate(-50%, -50%)';
    bootConsole.style.background = 'rgba(0, 0, 0, 0.95)';
    bootConsole.style.border = '2px solid #00F0FF';
    bootConsole.style.padding = '2rem';
    bootConsole.style.zIndex = '10000';
    bootConsole.style.fontFamily = 'VT323, monospace';
    bootConsole.style.fontSize = '1.2rem';
    bootConsole.style.color = '#00FF41';
    bootConsole.style.minWidth = '400px';
    document.body.appendChild(bootConsole);

    let currentMessage = 0;
    function showNextMessage() {
        if (currentMessage < bootMessages.length) {
            const p = document.createElement('p');
            p.textContent = bootMessages[currentMessage];
            bootConsole.appendChild(p);
            currentMessage++;
            setTimeout(showNextMessage, 500);
        } else {
            setTimeout(() => {
                bootConsole.style.opacity = '0';
                bootConsole.style.transition = 'opacity 0.5s';
                setTimeout(() => bootConsole.remove(), 500);
            }, 1000);
        }
    }

    setTimeout(showNextMessage, 500);
}

// ===== INITIALIZE ON LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    // Boot sequence on first load
    if (document.querySelector('.hero')) {
        bootSequence();
    }

    // Initialize effects
    randomGlitch();
    createMatrixRain();
    vhsGlitch();
    createScanLine();

    // Active navigation highlight
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Button click effects
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.background = 'rgba(0, 240, 255, 0.5)';
            ripple.style.borderRadius = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.animation = 'ripple 0.6s ease-out';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// ===== RESIZE HANDLER =====
window.addEventListener('resize', () => {
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});
