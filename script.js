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

// 🔑 EmailJS init (must be outside DOMContentLoaded)
emailjs.init("0Qnge-Z_E2WTR5XBM");

function openModal() {
    document.getElementById("noteModal").style.display = "block";
}

function closeModal() {
    document.getElementById("noteModal").style.display = "none";
}

function sendNote() {
    const nameInput = document.getElementById("senderName");
    const messageInput = document.getElementById("senderMessage");

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
        alert("Please enter your name and a note 🎄");
        return;
    }

    // Disable button briefly to prevent double-tap
    const sendButton = document.querySelector("#noteModal .buy-btn");
    sendButton.disabled = true;
    sendButton.textContent = "Sending…";

    emailjs.send(
        "service_st78xek",
        "template_iva3lqb",
        { name, message }
    ).then(() => {
        alert("🎉 Note sent! Thank you!");

        // Reset fields properly
        nameInput.value = "";
        messageInput.value = "";

        // Re-enable button
        sendButton.disabled = false;
        sendButton.textContent = "Send";
        closeModal();

        // Keep modal usable for another note
        nameInput.focus();

    }).catch(() => {
        alert("❌ Something went wrong. Please try again.");
        sendButton.disabled = false;
        sendButton.textContent = "Send";
    });
}

function openModalWithProduct(button) {
    const card = button.closest(".card");
    if (!card) return;

    // Get product name (text only, no emojis stripped)
    const titleElement = card.querySelector("h3");
    const productName = titleElement.innerText.trim();

    const messageBox = document.getElementById("senderMessage");

    // Prefill message
    messageBox.value =
`- ${productName}

It will be shipped directly to me at home in India :)`;

    // Open modal
    openModal();

    // Focus message box for quick edit
    setTimeout(() => messageBox.focus(), 100);
}

function triggerSanta() {
    const sleigh = document.getElementById("santa-sleigh");

    // Reset animation
    sleigh.style.display = "block";
    sleigh.style.animation = "none";
    sleigh.offsetHeight; // force reflow

    // Animate
    sleigh.style.animation = "flyAcross 4s linear forwards";

    // Optional: confetti-like joy 😄
    console.log("🎅 Santa is on the way!");

    // Hide after animation
    setTimeout(() => {
        sleigh.style.display = "none";
    }, 4000);
}
