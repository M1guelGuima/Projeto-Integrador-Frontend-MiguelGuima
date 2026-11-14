/*
Projeto: Analisador de planos da NexaNet

Entrada:
- Velocidade mínima informada pelo usuário.

Processamento:
- Validar a entrada.
- Classificar os planos por velocidade e categoria.
- Contar os planos por faixa de velocidade.
- Identificar a maior velocidade disponível.
- Contar os planos com benefícios adicionais.

Saida:
- Relatório com resultados da análise.

Pseudocódigo:
1. Preparar os dados dos planos.
2. Solicitar uma velocidade mínima.
3. Validar o valor informado.
4. Classificar os planos por velocidade e categoria.
5. Contar os planos e identificar a maior velocidade.
6. Contar os planos com benefícios adicionais.
7. Exibir o relatório final.
*/

/*
Tabela de testes — entrada: 300 Mbps

| Iteração | Plano       | Velocidade | Resultado esperado |
|----------|-------------|------------|--------------------|
| 1        | Nexa Casua  | 300 Mbps   | Básica             |
| 2        | Nexa Pro    | 500 Mbps   | Intermediária      |
| 3        | Nexa Gamer  | 700 Mbps   | Alta               |

Verificação:
- Os três planos devem passar pelo filtro de velocidade.
- As classificações devem corresponder às faixas definidas no código.
- O plano Nexa Empresa deve ser ignorado, pois sua velocidade é null.
*/

const planos = [
    {
        nome: "Nexa Casua",
        velocidade: 300,
        precoBase: 59.90,
        categoria: "casual",
        temBeneficio: false

    },
    {
        nome: "Nexa Pro",
        velocidade: 500,
        precoBase: 99.90,
        categoria: "pro",
        temBeneficio: true

    },
    {
        nome: "Nexa Gamer",
        velocidade: 700,
        precoBase: 119.90,
        categoria: "gamer",
        temBeneficio: true

    },
    {
        nome: "Nexa Empresa",
        velocidade: null,
        precoBase: null,
        categoria: "empresa",
        temBeneficio: true

    }
];

// Navegação do carrossel de feedbacks
const listaFeedbacks = document.getElementById("lista-feedbacks");
const botaoFeedbackAnterior = document.getElementById("feedback-anterior");
const botaoFeedbackProximo = document.getElementById("feedback-proximo");

if (listaFeedbacks && botaoFeedbackAnterior && botaoFeedbackProximo) {
    const obterDistancia = () => {
        const cartao = listaFeedbacks.querySelector(".card-feedback");
        if (!cartao) return listaFeedbacks.clientWidth;

        const estilo = getComputedStyle(listaFeedbacks);
        const intervalo = parseFloat(estilo.columnGap) || 0;

        return cartao.getBoundingClientRect().width + intervalo;
    };

    botaoFeedbackProximo.addEventListener("click", () => {
        const chegouAoFinal =
            listaFeedbacks.scrollLeft + listaFeedbacks.clientWidth >=
            listaFeedbacks.scrollWidth - 5;

        if (chegouAoFinal) {
            listaFeedbacks.scrollTo({
                left: 0,
                behavior: "smooth"
            });
        } else {
            listaFeedbacks.scrollBy({
                left: obterDistancia(),
                behavior: "smooth"
            });
        }
    });

    botaoFeedbackAnterior.addEventListener("click", () => {
        if (listaFeedbacks.scrollLeft <= 5) {
            listaFeedbacks.scrollTo({
                left: listaFeedbacks.scrollWidth,
                behavior: "smooth"
            });
        } else {
            listaFeedbacks.scrollBy({
                left: -obterDistancia(),
                behavior: "smooth"
            });
        }
    });
}

// Controle de abertura e fechamento do menu lateral
const botaoMenuLateral = document.getElementById("botao-menu-lateral");
const menuLateral = document.getElementById("menu-lateral");
const fundoMenuLateral = document.getElementById("fundo-menu-lateral");

if (botaoMenuLateral && menuLateral && fundoMenuLateral) {
    function abrirMenuLateral() {
        // Guarda a posição atual do botão.
        const areaBotao = botaoMenuLateral.getBoundingClientRect();

        // Abre o menu.
        menuLateral.classList.add("aberto");
        fundoMenuLateral.hidden = false;

        botaoMenuLateral.setAttribute("aria-expanded", "true");
        menuLateral.setAttribute("aria-hidden", "false");
        menuLateral.removeAttribute("inert");

        // Move o botão para fora do menu.
        const larguraBotao = botaoMenuLateral.offsetWidth;
        const margem = 16;
        const posicaoX = Math.min(
            menuLateral.offsetWidth + margem,
            window.innerWidth - larguraBotao - margem
        );

        botaoMenuLateral.style.left = `${posicaoX}px`;
        botaoMenuLateral.style.top = `${areaBotao.top}px`;
        botaoMenuLateral.style.right = "auto";
        botaoMenuLateral.style.bottom = "auto";
    }

    function fecharMenuLateral() {
        // Fecha o menu.
        menuLateral.classList.remove("aberto");
        fundoMenuLateral.hidden = true;

        botaoMenuLateral.setAttribute("aria-expanded", "false");
        menuLateral.setAttribute("aria-hidden", "true");
        menuLateral.setAttribute("inert", "");

        // Devolve o botão ao canto inferior esquerdo.
        botaoMenuLateral.style.left = "";
        botaoMenuLateral.style.top = "";
        botaoMenuLateral.style.right = "";
        botaoMenuLateral.style.bottom = "";

        botaoMenuLateral.focus();
    }

    botaoMenuLateral.addEventListener("click", () => {
        if (menuLateral.classList.contains("aberto")) {
            fecharMenuLateral();
        } else {
            abrirMenuLateral();
        }
    });

    // Fecha o menu ao clicar no fundo escurecido.
    fundoMenuLateral.addEventListener("click", fecharMenuLateral);

    // Fecha o menu ao pressionar Escape.
    document.addEventListener("keydown", (evento) => {
        if (
            evento.key === "Escape" &&
            menuLateral.classList.contains("aberto")
        ) {
            fecharMenuLateral();
        }
    });
}