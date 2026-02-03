// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Uptime calculator
    const startDate = new Date('2024-01-01');
    
    function updateUptime() {
        const now = new Date();
        const diff = now - startDate;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('uptime').textContent = `${days}d ${hours}h ${minutes}m`;
    }
    
    updateUptime();
    setInterval(updateUptime, 60000); // Update every minute
    
    // Form submission handler
    const form = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Show loading message
        formResponse.className = 'form-response';
        formResponse.textContent = '> TRANSMITTING MESSAGE...';
        formResponse.style.display = 'block';
        formResponse.style.color = 'var(--electric-blue)';
        
        // Simulate API call (replace with actual endpoint)
        setTimeout(() => {
            // Success simulation
            formResponse.className = 'form-response success';
            formResponse.innerHTML = `
                > MESSAGE TRANSMITTED SUCCESSFULLY!<br>
                > STATUS: DELIVERED<br>
                > EXPECTED RESPONSE: &lt;24H
            `;
            
            // Reset form
            form.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formResponse.style.display = 'none';
            }, 5000);
            
            /*
            // For actual implementation, use:
            try {
                const response = await fetch('YOUR_API_ENDPOINT', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                if (response.ok) {
                    formResponse.className = 'form-response success';
                    formResponse.innerHTML = `
                        > MESSAGE TRANSMITTED SUCCESSFULLY!<br>
                        > STATUS: DELIVERED<br>
                        > EXPECTED RESPONSE: &lt;24H
                    `;
                    form.reset();
                } else {
                    throw new Error('Transmission failed');
                }
            } catch (error) {
                formResponse.className = 'form-response error';
                formResponse.innerHTML = `
                    > ERROR: TRANSMISSION FAILED<br>
                    > PLEASE TRY ALTERNATIVE CHANNELS<br>
                    > ERROR CODE: ${error.message}
                `;
            }
            */
        }, 1500);
    });
    
    // Input focus effects
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateX(5px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateX(0)';
        });
    });
    
    // Typing sound effect on input (optional)
    inputs.forEach(input => {
        input.addEventListener('keypress', function() {
            // Add typing sound effect here if desired
            this.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.5)';
            setTimeout(() => {
                this.style.boxShadow = '';
            }, 100);
        });
    });
});
