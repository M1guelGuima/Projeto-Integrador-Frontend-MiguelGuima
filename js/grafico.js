
console.log("Olá, NexaNet!");

const canvas = document.getElementById("grafico-velocidade");
const contexto = canvas.getContext("2d");

// Título do gráfico
contexto.fillStyle = "#FFFFFF";
contexto.font = "bold 18px Arial";
contexto.fillText("Velocidade dos nossos planos", 20, 30);

// Nome do primeiro plano
contexto.font = "14px Arial";
contexto.fillText("Fibra Básica", 20, 75);

// Barra do primeiro plano
contexto.fillStyle = "#00AEEF";
contexto.fillRect(140, 58, 150, 24);

// Velocidade do primeiro plano
contexto.fillStyle = "#FFFFFF";
contexto.fillText("300 Mbps", 300, 75);

// Nome do segundo plano
contexto.fillText("Fibra Avançada", 20, 125);

 // Barra do segundo plano
contexto.fillStyle = "#00AEEF";
contexto.fillRect(140, 108, 240, 24);

// Velocidade do segundo plano
contexto.fillStyle = "#FFFFFF";
contexto.fillText("600 Mbps", 390, 125);