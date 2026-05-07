(function () {
    const buttons = document.querySelectorAll("[data-create-lot]");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            window.location.href = "lots.html";
        });
    });
})();
