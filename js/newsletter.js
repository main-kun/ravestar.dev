document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('email');
  const submitBtn = document.getElementById('submit-btn');
  const messageDiv = document.getElementById('form-message');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (!email) {
      showMessage('Please enter your email address.', 'error');
      return;
    }

    // Disable form during submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Subscribing...';
    messageDiv.className = 'form-message';
    messageDiv.style.display = 'none';

    try {
      const response = await fetch('/mailing-list-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_address: email }),
      });

      const data = await response.json();

      if (response.ok) {
        showMessage('Successfully subscribed! Check your email to confirm.', 'success');
        emailInput.value = '';
      } else {
        const errorMessage = data.error || 'Something went wrong. Please try again.';
        showMessage(errorMessage, 'error');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      showMessage('Network error. Please check your connection and try again.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Subscribe';
    }
  });

  function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
  }
});
