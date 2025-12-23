// ------------------------------
// MARK AS BOUGHT LOGIC
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
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
});

// ------------------------------
// EMAIL MODAL + EMAILJS
// ------------------------------

// 🔑 ADD YOUR EMAILJS PUBLIC KEY
emailjs.init("0Qnge-Z_E2WTR5XBM");

function openModal() {
    document.getElementById("noteModal").style.display = "block";
}

function closeModal() {
    document.getElementById("noteModal").style.display = "none";
}

function sendNote() {
    const name = document.getElementById("senderName").value.trim();
    const message = document.getElementById("senderMessage").value.trim();

    if (!name || !message) {
        alert("Please enter your name and a note 🎄");
        return;
    }

    emailjs.send(
        "service_st78xek",     // 🔑 add yours
        "template_iva3lqb",    // 🔑 add yours
        {
            name: name,
            message: message
        }
    ).then(() => {
        alert("🎉 Note sent! Thank you!");
        closeModal();
        document.getElementById("senderName").value = "";
        document.getElementById("senderMessage").value = "";
    }).catch(() => {
        alert("❌ Something went wrong. Please try again.");
    });
}

// ❄️ Falling snow
const snowContainer = document.getElementById("snow-container");

function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
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
