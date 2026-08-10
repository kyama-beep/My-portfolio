(function() {
    // ------------------ REPLACE WITH YOUR CREDENTIALS ------------------
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';      // from EmailJS dashboard
    const SERVICE_ID = 'YOUR_SERVICE_ID';      // from Email Services
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';    // from Email Templates
    // ------------------------------------------------------------------

    // Initialize EmailJS
    emailjs.init(PUBLIC_KEY);

    const form = document.getElementById('contactForm');
    const statusDiv = document.getElementById('statusMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Gather form data
        const name = document.getElementById('user_name').value.trim();
        const email = document.getElementById('user_email').value.trim();
        const subject = document.getElementById('subject').value.trim() || 'No subject';
        const message = document.getElementById('message').value.trim();

        // Basic validation (already handled by HTML required, but double-check)
        if (!name || !email || !message) {
            showStatus('⚠️ Please fill in all required fields.', 'error');
            return;
        }

        // Prepare template parameters (must match your EmailJS template variables)
        const templateParams = {
            user_name: name,
            user_email: email,
            subject: subject,
            message: message
        };

        // Disable button to prevent double submission
        const submitBtn = form.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Send email
        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
            .then(function(response) {
                showStatus('✅ Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
            })
            .catch(function(error) {
                console.error('EmailJS error:', error);
                showStatus('❌ Oops! Something went wrong. Please try again later.', 'error');
            })
            .finally(function() {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            });
    });

    function showStatus(message, type) {
        statusDiv.textContent = message;
        statusDiv.className = 'status ' + type;
        statusDiv.style.display = 'block';
        // Auto-hide after 8 seconds
        clearTimeout(window.statusTimeout);
        window.statusTimeout = setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 8000);
    }
})();