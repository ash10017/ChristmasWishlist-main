document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const id = card.dataset.id;
        const button = card.querySelector(".buy-btn");

        // Load saved state
        const isBought = localStorage.getItem(id) === "true";
        if (isBought) {
            card.classList.add("bought");
            button.textContent = "Bought ✓";
        }

        button.addEventListener("click", () => {
            const bought = card.classList.toggle("bought");
            localStorage.setItem(id, bought);
            button.textContent = bought ? "Bought ✓" : "Mark as Bought";
        });
    });
});
