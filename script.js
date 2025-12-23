document.addEventListener("DOMContentLoaded", () => {
    // 🎁 Wishlist logic
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const id = card.dataset.id;
        const button = card.querySelector(".buy-btn");

        const isBought = localStorage.getItem(id) === "true";
        if (isBought) {
            card.classList.add("bought");
            button.textContent = "Bought ✓";
            button.disabled = true;
        }

        button.addEventListener("click", () => {
            card.classList.add("bought");
            localStorage.setItem(id, true);
            button.textContent = "Bought ✓";
            button.disabled = true;
        });
    });

    // ❄️ Falling snow
    const snowContainer = document.getElementById("snow-container");

    function createSnowflake() {
        const snowflake = document.createElement("div");
        snowflake.className = "snowflake";
        snowflake.textContent = "❄";

        snowflake.style.left = Math.random() * window.innerWidth + "px";
        snowflake.style.fontSize = Math.random() * 10 + 10 + "px";
        snowflake.style.animationDuration = Math.random() * 5 + 5 + "s";
        snowflake.style.opacity = Math.random();

        snowContainer.appendChild(snowflake);

        setTimeout(() => {
            snowflake.remove();
        }, 10000);
    }

    setInterval(createSnowflake, 300);
});
