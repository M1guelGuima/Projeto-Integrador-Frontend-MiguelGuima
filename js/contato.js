// Seleciona o formulário e os campos
const formulario = document.querySelector("form");
const telefone = document.querySelector("#telefone");
const cpf = document.querySelector("#cpf");
const email = document.querySelector("#email");
const receberInformacoes = document.querySelector("#receber-informacoes");

// Seleciona os textos "(obrigatório)" e "(opcional)"
const statusCpf = document.querySelector("#status-cpf");
const statusEmail = document.querySelector("#status-email");

// Seleciona as opções CPF e E-mail
const opcoesIdentificacao = document.querySelectorAll(
    'input[name="tipo-identificacao"]'
);

function atualizarCampos() {

    const tipoEscolhido = document.querySelector(
        'input[name="tipo-identificacao"]:checked'
    ).value;

    const cpfObrigatorio = tipoEscolhido === "cpf";

    cpf.required = cpfObrigatorio;
    email.required = !cpfObrigatorio;

    statusCpf.textContent = cpfObrigatorio ? "(obrigatório)" : "(opcional)";
    statusEmail.textContent = cpfObrigatorio ? "(opcional)" : "(obrigatório)";
}

// Atualiza os campos sempre que o cliente trocar a opção
opcoesIdentificacao.forEach((opcao) => {
    opcao.addEventListener("change", atualizarCampos);
});

// Garante o estado correto assim que a página abre
atualizarCampos();

// Valida os dígitos verificadores do CPF
function cpfEhValido(valor) {

    const numeros = valor.replace(/\D/g, "");

    // Precisa ter 11 dígitos e não pode ser uma sequência repetida
    if (numeros.length !== 11 || /^(\d)\1{10}$/.test(numeros)) {
        return false;
    }

    // Calcula o 1º e o 2º dígito verificador
    for (let tamanho = 9; tamanho < 11; tamanho++) {

        let soma = 0;

        for (let i = 0; i < tamanho; i++) {
            soma += Number(numeros[i]) * (tamanho + 1 - i);
        }

        const digito = ((soma * 10) % 11) % 10;

        if (digito !== Number(numeros[tamanho])) {
            return false;
        }
    }

    return true;
}

// Formatação do telefone
telefone.addEventListener("input", () => {

    let numeros = telefone.value.replace(/\D/g, "").slice(0, 11);

    if (numeros.length > 7) {
        numeros = numeros.replace(
            /^(\d{2})(\d{5})(\d{0,4})$/,
            "($1) $2-$3"
        );
    } else if (numeros.length > 2) {
        numeros = numeros.replace(
            /^(\d{2})(\d+)/,
            "($1) $2"
        );
    } else if (numeros.length > 0) {
        numeros = `(${numeros}`;
    }

    telefone.value = numeros;
});

// Formatação e validação do CPF
cpf.addEventListener("input", () => {

    let numeros = cpf.value.replace(/\D/g, "").slice(0, 11);

    numeros = numeros.replace(
        /^(\d{3})(\d)/,
        "$1.$2"
    );

    numeros = numeros.replace(
        /^(\d{3})\.(\d{3})(\d)/,
        "$1.$2.$3"
    );

    numeros = numeros.replace(
        /^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})$/,
        "$1.$2.$3-$4"
    );

    cpf.value = numeros;

    // Com o CPF completo, confere se os números são válidos
    if (cpf.value.length === 14 && !cpfEhValido(cpf.value)) {
        cpf.setCustomValidity("CPF inválido. Confira os números digitados.");
    } else {
        cpf.setCustomValidity("");
    }
});

// Envio do formulário
formulario.addEventListener("submit", (evento) => {

    // Impede o envio padrão (que colocaria os dados na URL)
    evento.preventDefault();

    alert("Solicitação enviada com sucesso! Em breve nossa equipe entrará em contato.");

    formulario.reset();
});

// Depois de limpar o formulário, volta ao estado inicial
formulario.addEventListener("reset", () => {

    // setTimeout espera o navegador terminar de limpar os campos
    setTimeout(() => {
        cpf.setCustomValidity("");
        atualizarCampos();
    }, 0);
});