(() => {
    const POS_LEFT = 'home__carousel-item_pos_left';
    const POS_CENTER = 'home__carousel-item_pos_center';
    const POS_RIGHT = 'home__carousel-item_pos_right';
    const DOT_ACTIVE = 'home__carousel-dot_active';

    function initHomeCarousel() {
        const carousel = document.querySelector('[data-home-carousel]');
        if (!carousel) return;

        const track = carousel.querySelector('.home__carousel-track');
        if (!track) return;

        const items = Array.from(track.querySelectorAll('[data-carousel-item]'));
        const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));

        if (!items.length || !dots.length) return;

        // Derive initial active index from which item currently has the center class
        let activeIndex = items.findIndex((item) => item.classList.contains(POS_CENTER));
        if (activeIndex === -1) activeIndex = 1;

        function setActive(newIndex) {
            activeIndex = ((newIndex % items.length) + items.length) % items.length;

            const leftIndex = (activeIndex - 1 + items.length) % items.length;
            const rightIndex = (activeIndex + 1) % items.length;

            items.forEach((item) => {
                item.classList.remove(POS_LEFT, POS_CENTER, POS_RIGHT);
            });

            items[leftIndex].classList.add(POS_LEFT);
            items[activeIndex].classList.add(POS_CENTER);
            items[rightIndex].classList.add(POS_RIGHT);

            dots.forEach((dot, i) => {
                const active = i === activeIndex;
                dot.classList.toggle(DOT_ACTIVE, active);
                dot.setAttribute('aria-selected', String(active));
            });
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => setActive(i));
        });

        // Sync DOM state with the derived active index on init
        setActive(activeIndex);
    }

    document.addEventListener('DOMContentLoaded', initHomeCarousel);
})();
