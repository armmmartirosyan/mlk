document.addEventListener("DOMContentLoaded", () => {
    const tipStart = document.querySelector('.model__body-list-item-tip-start');
    const tipBox = document.querySelector('.model__body-list-item-tip');
    const tipStartBtn = document.querySelector('.model__body-list-item-tip-start-button');
    const tipBoxBtn = document.querySelector('.model__body-list-item-tip-button'); // "Tip" button inside the big form
    
    // Also "Ask" if they wanted it to do something, but let's bind tip for now
    const askStart = document.querySelector('.model__body-list-item-ask');
    const askStartBtn = document.querySelector('.model__body-list-item-ask-button');

    if (tipStart && tipBox && tipStartBtn && tipBoxBtn) {
        tipStartBtn.addEventListener('click', () => {
            tipStart.style.display = 'none';
            tipBox.style.display = 'flex';
        });

        // When placing the tip, we might want to revert back
        tipBoxBtn.addEventListener('click', () => {
            tipBox.style.display = 'none';
            tipStart.style.display = 'flex';
        });
    }

    // We don't have a bigger ask box yet, so maybe we just toggle to the tip box too?
    // Let's leave ask untouched unless told, or we can make it show tipBox too.
    if (askStartBtn && tipBox) {
        askStartBtn.addEventListener('click', () => {
            // maybe they meant ask shows the same big box?
            // User: "By default we show "tip start" and "ask" and on click we swap those elements to the bigger element."
            // If they are separate, we can't swap tip-start with ask's big box...
            // Let's just do it for tip.
        });
    }
});
