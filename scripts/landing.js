(() => {
    const MIN_USERNAME_LENGTH = 3;

    function setupRevealAnimations() {
        const revealElements = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window) || revealElements.length === 0) {
            revealElements.forEach((element) => element.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -5% 0px'
            }
        );

        revealElements.forEach((element) => observer.observe(element));
    }

    function setupUsernameForm() {
        const form = document.querySelector('.username__form');
        const input = document.getElementById('username-input');
        const submitButton = document.getElementById('username-submit');
        const message = document.getElementById('username-feedback');

        if (!form || !input || !submitButton || !message) {
            return;
        }

        const renderValidation = () => {
            const value = input.value.trim();
            const hasEnoughChars = value.length >= MIN_USERNAME_LENGTH;
            const isPatternValid = /^[a-zA-Z0-9._-]+$/.test(value);

            submitButton.disabled = !(hasEnoughChars && isPatternValid);

            if (value.length === 0) {
                message.textContent = '\u00a0';
                return;
            }

            if (!hasEnoughChars) {
                message.textContent = 'Username must be at least 3 characters.';
                return;
            }

            if (!isPatternValid) {
                message.textContent = 'Use only letters, numbers, dots, dashes, or underscores.';
                return;
            }

            message.textContent = 'Username looks good.';
        };

        input.addEventListener('input', renderValidation);

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (submitButton.disabled) {
                return;
            }
            message.textContent = 'Great. Your Para page setup can start now.';
        });
    }

    function setupParallaxGrid() {
        const items = document.querySelectorAll('.focus__item');
        if (items.length === 0) {
            return;
        }

        const onMouseMove = (event) => {
            const { innerWidth, innerHeight } = window;
            const normalizedX = (event.clientX / innerWidth) - 0.5;
            const normalizedY = (event.clientY / innerHeight) - 0.5;

            items.forEach((item, index) => {
                const depth = ((index % 3) + 1) * 1.2;
                const translateX = normalizedX * depth * 1.8;
                const translateY = normalizedY * depth * 2.4;
                item.style.transform = 'translate(' + translateX.toFixed(2) + 'px, ' + translateY.toFixed(2) + 'px)';
            });
        };

        const onMouseLeave = () => {
            items.forEach((item) => {
                item.style.transform = '';
            });
        };

        const grid = document.querySelector('.focus__grid');
        if (!grid) {
            return;
        }

        grid.addEventListener('mousemove', onMouseMove);
        grid.addEventListener('mouseleave', onMouseLeave);
    }

    document.addEventListener('DOMContentLoaded', () => {
        setupRevealAnimations();
        setupUsernameForm();
        setupParallaxGrid();
    });
})();
