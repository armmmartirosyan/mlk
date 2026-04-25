(() => {
    function createModalMarkup() {
        return [
            '<div class="messages-modal messages-modal_hidden" role="dialog" aria-modal="true" aria-label="Messages">',
            '  <div class="messages-modal__header">',
            '    <div></div>',
            '    <h2 class="messages-modal__title type-18-500-secondary">Messages</h2>',
            '    <button class="generic-button-reset messages-modal__close-btn" type="button" aria-label="Close messages modal">',
            '      <img src="images/close-icon.svg" alt="Close" class="messages-modal__close-icon" />',
            '    </button>',
            '  </div>',
            '  <div class="messages-modal__body">',
            '    <div></div>',
            '    <div class="messages-modal__body-content">',
            '      <img src="images/messages-quote.svg" alt="Quote" class="messages-modal__body-icon" />',
            '      <p class="messages-modal__body-info type-15-500-secondary">No messages</p>',
            '      <p class="messages-modal__body-description type-12-secondary">Messages from the team will be shown here</p>',
            '    </div>',
            '    <button class="generic-button-reset messages-modal__body-button type-15-secondary" type="button">',
            '      Send us a message',
            '      <img src="images/send-message.svg" alt="Send" class="messages-modal__body-button-icon" />',
            '    </button>',
            '  </div>',
            '  <div class="messages-modal__footer">',
            '    <div class="messages-modal__footer-tab">',
            '      <img src="images/home-icon.svg" alt="Home" class="messages-modal__footer-tab-img" />',
            '      <p class="messages-modal__footer-tab-text type-12-secondary">Home</p>',
            '    </div>',
            '    <div class="messages-modal__footer-tab">',
            '      <img src="images/messages-quote.svg" alt="Messages" class="messages-modal__footer-tab-img" />',
            '      <p class="messages-modal__footer-tab-text type-12-secondary">Messages</p>',
            '    </div>',
            '  </div>',
            '</div>'
        ].join('');
    }

    function ensureModalExists() {
        let modal = document.querySelector('.messages-modal');
        if (modal) {
            modal.classList.add('messages-modal_hidden');
            return modal;
        }

        document.body.insertAdjacentHTML('beforeend', createModalMarkup());
        modal = document.querySelector('.messages-modal');
        return modal;
    }

    function initHelpModal() {
        const helpButtons = document.querySelectorAll('.navigation__help-trigger');
        if (helpButtons.length === 0) {
            return;
        }

        const modal = ensureModalExists();
        if (!modal) {
            return;
        }

        const closeButton = modal.querySelector('.messages-modal__close-btn');

        const openModal = () => {
            modal.classList.remove('messages-modal_hidden');
        };

        const closeModal = () => {
            modal.classList.add('messages-modal_hidden');
        };

        helpButtons.forEach((button) => {
            button.addEventListener('click', openModal);
        });

        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        });
    }

    document.addEventListener('DOMContentLoaded', initHelpModal);
})();
