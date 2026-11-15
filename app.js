const form = document.getElementById("chatForm");
const input = document.getElementById("messageInput");
const messages = document.getElementById("messages");
const welcome = document.getElementById("welcome");

function addMessage(text, role) {
  const item = document.createElement("div");
  item.className = `message ${role}`;
  item.textContent = text;
  messages.appendChild(item);
  item.scrollIntoView({ behavior: "smooth", block: "end" });
}

function demoReply(text) {
  return "Gracias por probar EMMY AI. Tu mensaje se recibió correctamente. Esta es la versión inicial de la página; todavía falta conectar un modelo de inteligencia artificial para generar respuestas reales. El siguiente paso será configurar un servicio seguro en el servidor, sin publicar ninguna clave privada.";
}

function sendMessage(text) {
  const clean = text.trim();
  if (!clean) return;
  welcome.hidden = true;
  addMessage(clean, "user");
  input.value = "";
  addMessage(demoReply(clean), "assistant");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(input.value);
});

document.querySelectorAll(".suggestion").forEach((button) => {
  button.addEventListener("click", () => sendMessage(button.dataset.prompt));
});

function resetChat() {
  messages.replaceChildren();
  welcome.hidden = false;
  input.value = "";
  input.focus();
}
document.getElementById("newChat").addEventListener("click", resetChat);
document.getElementById("mobileNewChat").addEventListener("click", resetChat);

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
