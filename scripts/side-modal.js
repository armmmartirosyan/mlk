(function () {
    const openModals = new Set();

    function openModal(modal) {
        if (!modal) return;
        modal.dataset.state = "open";
        document.body.classList.add("side-modal-open");
        openModals.add(modal);

        const firstField = modal.querySelector("input, select, textarea, button");
        if (firstField) firstField.focus({ preventScroll: true });
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.dataset.state = "closed";
        openModals.delete(modal);
        if (openModals.size === 0) {
            document.body.classList.remove("side-modal-open");
        }
        clearForm(modal);
    }

    function clearForm(modal) {
        const form = modal.querySelector("form");
        if (!form) return;
        form.reset();
        form.querySelectorAll("[data-state='error']").forEach((field) => {
            field.removeAttribute("data-state");
        });
        form.querySelectorAll(".form-select").forEach(syncSelectEmpty);
    }

    function syncSelectEmpty(select) {
        select.dataset.empty = select.value === "" ? "true" : "false";
    }

    function validateForm(form) {
        let firstInvalid = null;
        form.querySelectorAll("[data-validate]").forEach((field) => {
            const control = field.querySelector("input, select, textarea");
            if (!control) return;
            const value = (control.value || "").trim();
            if (value === "") {
                field.dataset.state = "error";
                if (!firstInvalid) firstInvalid = control;
            } else {
                field.removeAttribute("data-state");
            }
        });
        if (firstInvalid) firstInvalid.focus();
        return !firstInvalid;
    }

    document.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-modal-target]");
        if (trigger) {
            const modal = document.getElementById(trigger.dataset.modalTarget);
            openModal(modal);
            return;
        }

        const closeTrigger = event.target.closest("[data-modal-close]");
        if (closeTrigger) {
            const modal = closeTrigger.closest(".side-modal");
            closeModal(modal);
            return;
        }

        const overlay = event.target.closest(".side-modal__overlay");
        if (overlay) {
            const modal = overlay.closest(".side-modal");
            closeModal(modal);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape" || openModals.size === 0) return;
        const last = [...openModals].pop();
        closeModal(last);
    });

    document.addEventListener("submit", (event) => {
        const form = event.target;
        if (!form.matches(".side-modal form")) return;
        event.preventDefault();
        if (!validateForm(form)) return;
        const modal = form.closest(".side-modal");
        closeModal(modal);
    });

    document.addEventListener("input", (event) => {
        const control = event.target;
        const field = control.closest(".form-field");
        if (!field) return;
        if (field.dataset.state === "error" && (control.value || "").trim() !== "") {
            field.removeAttribute("data-state");
        }
        if (control.matches(".form-select")) {
            syncSelectEmpty(control);
        }
    });

    document.addEventListener("change", (event) => {
        if (event.target.matches(".form-select")) {
            syncSelectEmpty(event.target);
        }
    });

    document.querySelectorAll(".form-select").forEach(syncSelectEmpty);
})();
