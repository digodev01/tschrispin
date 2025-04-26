const users = ["cl01", "cl02", "cl03"];
const senha = "cl2025";

function login(event) {
  event.preventDefault(); // Impede o comportamento padrão do formulário (não recarregar a página)

  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMessage");

  if (users.includes(user) && pass === senha) {
    window.location.href = "dashboard.html";  // Redireciona para o dashboard
  } else {
    errorMsg.textContent = "Usuário ou senha incorretos.";
  }
}

// Adicionando o evento de submit para o formulário de login
document.getElementById("loginForm").addEventListener("submit", login);
