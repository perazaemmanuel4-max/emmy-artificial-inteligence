
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatArea = document.getElementById("chatArea");
const welcome = document.getElementById("welcome");
const newChat = document.getElementById("newChat");

let messages = [];

function saveHistory() {
  try {
    localStorage.setItem("emmy_ai_history", JSON.stringify(messages));
  } catch (error) {
    console.warn("No se pudo guardar el historial.");
  }
}

function addMessage(text, sender) {
  const message = document.createElement("div");

  message.style.cssText = `
    padding: 14px 17px;
    margin: 12px 0;
    max-width: 90%;
    border-radius: 14px;
    line-height: 1.6;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    ${sender === "user"
      ? "align-self:flex-end;background:#19301e;color:white;"
      : "align-self:flex-start;background:#101812;color:#39ff14;border:1px solid #26382a;"}
  `;

  message.textContent = text;
  chatArea.appendChild(message);
}

function sendMessage(text) {
  const cleanText = text.trim();
  if (!cleanText) return;

  if (welcome) welcome.style.display = "none";

  addMessage(cleanText, "user");

  messages.push({
    role: "user",
    content: cleanText
  });

  saveHistory();

  addMessage(
    "Tu mensaje llegó correctamente a EMMY AI. El modelo de inteligencia artificial todavía no está conectado. Estamos preparando esa conexión.",
    "assistant"
  );

  chatArea.scrollTop = chatArea.scrollHeight;
}

chatForm.addEventListener("submit", function(event) {
  event.preventDefault();

  sendMessage(userInput.value);
  userInput.value = "";
});

document.querySelectorAll(".suggestion").forEach(button => {
  button.addEventListener("click", () => {
    sendMessage(button.textContent.replace(/^.{2}\s*/, ""));
  });
});

newChat.addEventListener("click", () => {
  messages = [];
  saveHistory();
  chatArea.replaceChildren();

  if (welcome) {
    welcome.style.display = "block";
    chatArea.appendChild(welcome);
  }
});

try {
  const saved = JSON.parse(
    localStorage.getItem("emmy_ai_history") || "[]"
  );

  if (Array.isArray(saved)) {
    messages = saved;
  }
} catch (error) {
  messages = [];
}
