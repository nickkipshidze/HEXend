const socket = new WebSocket("ws://localhost:8000/api/chat");
const sendBtn = document.getElementById("send-btn");
const chatInput = document.getElementById("chat-input");
const chatHistory = document.getElementById("chat-history");

window.onload = () => {
    fetch("http://127.0.0.1:8000/api/chat")
        .then((response) => response.json())
        .then((data) => {
            const messages = data.messages;
            messages.forEach((message) => {
                const li = document.createElement("li");
                li.textContent = message;
                chatHistory.appendChild(li);
            });
        });
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.message) {
        const li = document.createElement("li");
        li.textContent = data.message;
        chatHistory.appendChild(li);
    }
};

sendBtn.addEventListener("click", () => {
    const message = chatInput.value.trim();
    if (message) {
        fetch("http://127.0.0.1:8000/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });
        chatInput.value = "";
    }
});
