async function sendToEmmy(message) {
  const response = await fetch(
    "http://127.0.0.1:8000/chat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message
      })
    }
  );

  if (!response.ok) {
    throw new Error("Error de conexión con EMMY AI");
  }

  const data = await response.json();
  return data.response;
}

function addMessage(text, sender) {
  const message = document.createElement("div");

  message.textContent = text;
  message.style.cssText = `
    padding: 14px 17px;
    margin: 12px 0;
    max-width: 90%;
    border-radius: 14px;
    background: ${sender === "user" ? "#173d24" : "#202020"};
    color: white;
    white-space: pre-wrap;
  `;

  const chat = document.getElementById("chat");
  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();

  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  try {
    const answer = await sendToEmmy(message);
    addMessage(answer, "emmy");
  } catch (error) {
    addMessage(
      "No puedo conectarme con mi cerebro. Comprueba que Python y Ollama estén funcionando.",
      "emmy"
    );
  }
}

document.getElementById("send-btn")
  .addEventListener("click", sendMessage);

document.getElementById("user-input")
  .addEventListener("keydown", function(event) {
    if (event.key === "Enter") sendMessage();
  });
