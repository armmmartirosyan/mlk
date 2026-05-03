document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('signin-password-toggle');
    const input = document.getElementById('signin-password');
    if (!toggle || !input) return;

    toggle.addEventListener('click', function () {
        const isPassword = input.type === 'password';

        if (isPassword) {
            input.type = 'text';
            toggle.setAttribute('aria-label', 'Show password');
        } else {
            input.type = 'password';
            toggle.setAttribute('aria-label', 'Hide password');
        }
    });
});
