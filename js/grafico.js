/*
 * GRÁFICO DE VELOCIDADE DOS PLANOS
 * Desenha no canvas as velocidades dos planos residenciais da NexaNet.
 */

// Localiza o canvas da página inicial.
const canvas = document.getElementById("grafico-velocidade");

// O teste permite que o arquivo seja carregado em páginas sem esse gráfico.
if (canvas) {
    const contexto = canvas.getContext("2d");

    // Continua somente se o navegador conseguir criar o contexto 2D.
    if (contexto) {
        const dadosGrafico = [
            { nome: "Nexa Casual", velocidade: 300 },
            { nome: "Nexa Pro", velocidade: 500 },
            { nome: "Nexa Gamer", velocidade: 700 }
        ];

        const larguraMaximaBarra = 240;
        const maiorVelocidade = Math.max(
            ...dadosGrafico.map((plano) => plano.velocidade)
        );

        // Limpa o canvas antes de desenhar o gráfico.
        contexto.clearRect(0, 0, canvas.width, canvas.height);

        // Título do gráfico.
        contexto.fillStyle = "#FFFFFF";
        contexto.font = "bold 18px Arial";
        contexto.fillText("Velocidade dos planos", 20, 30);

        // Desenha uma barra proporcional para cada plano.
        planos.forEach((plano, indice) => {
            const posicaoY = 55 + indice * 55;
            const larguraBarra =
                (plano.velocidade / maiorVelocidade) * larguraMaximaBarra;

            // Nome do plano.
            contexto.fillStyle = "#FFFFFF";
            contexto.font = "14px Arial";
            contexto.fillText(plano.nome, 20, posicaoY + 17);

            // Barra que representa a velocidade.
            contexto.fillStyle = "#00AEEF";
            contexto.fillRect(145, posicaoY, larguraBarra, 24);

            // Valor da velocidade ao lado da barra.
            contexto.fillStyle = "#FFFFFF";
            contexto.fillText(
                `${plano.velocidade} Mbps`,
                155 + larguraMaximaBarra,
                posicaoY + 17
            );
        });
    }
}
