(() => {
    const LAPTOP_BREAKPOINT = 1366;
    const responsiveMediaQuery = window.matchMedia(`(max-width: ${LAPTOP_BREAKPOINT}px)`);

    function isDrawerMode(layoutRoot) {
        const layoutType = layoutRoot.dataset.sidebarLayout;

        if (layoutType === 'compact') {
            return true;
        }

        if (layoutType === 'responsive') {
            return responsiveMediaQuery.matches;
        }

        return false;
    }

    function setExpandedState(toggleButton, isExpanded) {
        toggleButton.setAttribute('aria-expanded', String(isExpanded));
    }

    function closeSidebar(layoutRoot, toggleButton) {
        layoutRoot.classList.remove('sidebar-layout_open');
        setExpandedState(toggleButton, false);
    }

    function initializeLayout(layoutRoot, index) {
        const sidebarPanel = layoutRoot.querySelector('[data-sidebar-panel]');
        let toggleButton = layoutRoot.querySelector('[data-sidebar-toggle]');

        if (!sidebarPanel) {
            return;
        }

        if (!toggleButton) {
            toggleButton = document.querySelector('[data-sidebar-toggle]');
        }

        if (!toggleButton) {
            return;
        }

        if (!sidebarPanel.id) {
            sidebarPanel.id = `sidebar-panel-${index + 1}`;
        }

        toggleButton.setAttribute('aria-controls', sidebarPanel.id);
        setExpandedState(toggleButton, false);

        toggleButton.addEventListener('click', () => {
            if (!isDrawerMode(layoutRoot)) {
                return;
            }

            const isOpen = layoutRoot.classList.toggle('sidebar-layout_open');
            setExpandedState(toggleButton, isOpen);
        });

        const syncLayoutState = () => {
            if (!isDrawerMode(layoutRoot)) {
                closeSidebar(layoutRoot, toggleButton);
            }
        };

        syncLayoutState();

        if (typeof responsiveMediaQuery.addEventListener === 'function') {
            responsiveMediaQuery.addEventListener('change', syncLayoutState);
        } else {
            responsiveMediaQuery.addListener(syncLayoutState);
        }
    }

    function initializeSidebarLayouts() {
        const layoutRoots = document.querySelectorAll('[data-sidebar-layout]');

        layoutRoots.forEach((layoutRoot, index) => {
            initializeLayout(layoutRoot, index);
        });
    }

    document.addEventListener('DOMContentLoaded', initializeSidebarLayouts);
})();
