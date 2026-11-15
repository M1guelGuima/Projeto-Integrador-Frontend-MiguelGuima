/*
 * DADOS E INTERAÇÕES DA PÁGINA INICIAL
 *
 * O array "planos" reúne os dados dos planos da NexaNet.
 * As demais rotinas controlam o carrossel de feedbacks e o menu lateral.
 */

// ========================================
// DADOS DOS PLANOS
// ========================================

const planos = [
    {
        nome: "Nexa Casual",
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

// ========================================
// NAVEGAÇÃO DO CARROSSEL DE FEEDBACKS
// ========================================

const listaFeedbacks = document.getElementById("lista-feedbacks");
const botaoFeedbackAnterior = document.getElementById("feedback-anterior");
const botaoFeedbackProximo = document.getElementById("feedback-proximo");

// Só configura os controles quando os elementos do carrossel existem na página.
if (listaFeedbacks && botaoFeedbackAnterior && botaoFeedbackProximo) {

    // Calcula a largura de um cartão somada ao espaço entre os cartões.
    const obterDistancia = () => {
        const cartao = listaFeedbacks.querySelector(".card-feedback");
        if (!cartao) return listaFeedbacks.clientWidth;

        const estilo = getComputedStyle(listaFeedbacks);
        const intervalo = parseFloat(estilo.columnGap) || 0;

        return cartao.getBoundingClientRect().width + intervalo;
    };

    // Avança um cartão; ao chegar ao fim, retorna ao primeiro.
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

    // Volta um cartão; no início, leva a navegação ao último.
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

// ========================================
// CONTROLE DO MENU LATERAL
// ========================================

const botaoMenuLateral = document.getElementById("botao-menu-lateral");
const menuLateral = document.getElementById("menu-lateral");
const fundoMenuLateral = document.getElementById("fundo-menu-lateral");

// Evita configurar eventos caso algum elemento necessário não esteja presente.
if (botaoMenuLateral && menuLateral && fundoMenuLateral) {

    function abrirMenuLateral() {
        // Guarda a posição do botão antes de abrir o menu.
        const areaBotao = botaoMenuLateral.getBoundingClientRect();

        menuLateral.classList.add("aberto");
        fundoMenuLateral.hidden = false;

        // Atualiza o estado acessível do menu e do botão.
        botaoMenuLateral.setAttribute("aria-expanded", "true");
        botaoMenuLateral.setAttribute("aria-label", "Fechar menu lateral");
        menuLateral.setAttribute("aria-hidden", "false");
        menuLateral.removeAttribute("inert");

        // Move o botão para fora do menu para que continue acessível.
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
        menuLateral.classList.remove("aberto");
        fundoMenuLateral.hidden = true;

        // Restaura os atributos acessíveis do menu e do botão.
        botaoMenuLateral.setAttribute("aria-expanded", "false");
        botaoMenuLateral.setAttribute("aria-label", "Abrir menu lateral");
        menuLateral.setAttribute("aria-hidden", "true");
        menuLateral.setAttribute("inert", "");

        // Devolve o botão à posição definida originalmente no CSS.
        botaoMenuLateral.style.left = "";
        botaoMenuLateral.style.top = "";
        botaoMenuLateral.style.right = "";
        botaoMenuLateral.style.bottom = "";

        botaoMenuLateral.focus();
    }

    // Alterna entre abrir e fechar o menu.
    botaoMenuLateral.addEventListener("click", () => {
        if (menuLateral.classList.contains("aberto")) {
            fecharMenuLateral();
        } else {
            abrirMenuLateral();
        }
    });

    // Fecha o menu ao clicar fora dele ou pressionar Escape.
    fundoMenuLateral.addEventListener("click", fecharMenuLateral);

    document.addEventListener("keydown", (evento) => {
        if (
            evento.key === "Escape" &&
            menuLateral.classList.contains("aberto")
        ) {
            fecharMenuLateral();
        }
    });
}
