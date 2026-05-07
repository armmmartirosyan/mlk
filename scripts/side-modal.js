(function () {
    const openModals = new Set();

    function openModal(modal) {
        if (!modal) return;
        modal.dataset.state = "open";
        document.body.classList.add("side-modal-open");
        openModals.add(modal);

        const firstField = modal.querySelector(
            "input:not([type='hidden']), select, textarea, .form-field__trigger, .side-modal__list-button, button:not([data-modal-close])"
        );
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
        form.querySelectorAll(".form-field__trigger").forEach(resetTrigger);
        form.querySelectorAll("[data-select-for]").forEach((hidden) => {
            hidden.value = "";
        });
    }

    function resetTrigger(trigger) {
        trigger.dataset.empty = "true";
        trigger.removeAttribute("data-value");
        const valueEl = trigger.querySelector(".form-field__value");
        if (valueEl) valueEl.textContent = "";
    }

    function syncSelectEmpty(select) {
        select.dataset.empty = select.value === "" ? "true" : "false";
    }

    function getFieldControl(field) {
        const trigger = field.querySelector(".form-field__trigger");
        if (trigger) {
            return { el: trigger, isEmpty: trigger.dataset.empty === "true" };
        }
        const control = field.querySelector("input:not([type='hidden']), select, textarea");
        if (control) {
            return { el: control, isEmpty: (control.value || "").trim() === "" };
        }
        const hidden = field.querySelector("input[type='hidden']");
        if (hidden) {
            return { el: hidden, isEmpty: (hidden.value || "").trim() === "" };
        }
        return null;
    }

    function validateForm(form) {
        let firstInvalid = null;
        form.querySelectorAll("[data-validate]").forEach((field) => {
            const found = getFieldControl(field);
            if (!found) return;
            if (found.isEmpty) {
                field.dataset.state = "error";
                if (!firstInvalid) firstInvalid = found.el;
            } else {
                field.removeAttribute("data-state");
            }
        });
        if (firstInvalid && typeof firstInvalid.focus === "function") {
            firstInvalid.focus();
        }
        return !firstInvalid;
    }

    function applyOption(option) {
        const triggerId = option.dataset.optionFor;
        const trigger = document.getElementById(triggerId);
        if (!trigger) return;

        const value = option.dataset.value || "";
        const label = option.dataset.label || option.textContent.trim();

        trigger.dataset.empty = value === "" ? "true" : "false";
        trigger.dataset.value = value;
        const valueEl = trigger.querySelector(".form-field__value");
        if (valueEl) valueEl.textContent = label;

        const hidden = document.querySelector(`[data-select-for="${triggerId}"]`);
        if (hidden) hidden.value = value;

        const field = trigger.closest(".form-field");
        if (field) field.removeAttribute("data-state");

        const modal = option.closest(".side-modal");
        closeModal(modal);
    }

    document.addEventListener("click", (event) => {
        const option = event.target.closest("[data-option-for]");
        if (option) {
            applyOption(option);
            return;
        }

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
