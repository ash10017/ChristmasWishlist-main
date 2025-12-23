document.addEventListener("DOMContentLoaded", () => {

    // ------------------------------
    // MARK AS BOUGHT LOGIC
    // ------------------------------
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const id = card.dataset.id;
        const button = card.querySelector(".buy-btn");

        if (!button || id === "note") return;

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

    // ------------------------------
    // ❄️ FALLING SNOW
    // ------------------------------
    const snowContainer = document.getElementById("snow-container");

    if (snowContainer) {
        function createSnowflake() {
            const snowflake = document.createElement("div");
            snowflake.className = "snowflake";
            snowflake.textContent = "❄";

            snowflake.style.left = Math.random() * window.innerWidth + "px";
            snowflake.style.fontSize = Math.random() * 10 + 10 + "px";
            snowflake.style.animationDuration = Math.random() * 5 + 5 + "s";
            snowflake.style.opacity = Math.random();

            snowContainer.appendChild(snowflake);

            setTimeout(() => snowflake.remove(), 10000);
        }

        setInterval(createSnowflake, 300);
    }
});


// ------------------------------
// EMAIL MODAL + EMAILJS
// ------------------------------

emailjs.init("YOUR_PUBLIC_KEY");

function openModal() {
    const modal = document.getElementById("noteModal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("noteModal");
    modal.style.display = "none";
}

function sendNote() {
    const nameInput = document.getElementById("senderName");
    const messageInput = document.getElementById("senderMessage");
    const sendButton = document.querySelector(".modal-actions .buy-btn");

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
        alert("Please enter your name and a note 🎄");
        return;
    }

    // Prevent double clicks while sending
    sendButton.disabled = true;
    sendButton.textContent = "Sending…";

    emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        { name, message }
    )
    .then(() => {
        alert("🎉 Note sent! Thank you!");

        // Reset form
        nameInput.value = "";
        messageInput.value = "";

        closeModal();
    })
    .catch(() => {
        alert("❌ Something went wrong. Please try again.");
    })
    .finally(() => {
        // Always re-enable button
        sendButton.disabled = false;
        sendButton.textContent = "Send";
    });
}
