/*
 * CONTROLE DO FORMULÁRIO DE CONTATO
 * Este arquivo cuida da formatação dos campos, da validação do CPF
 * e da alternância entre CPF e e-mail como forma de identificação.
 */

// ========================================
// SELEÇÃO DOS ELEMENTOS DO FORMULÁRIO
// ========================================

const formulario = document.querySelector("form");
const telefone = document.querySelector("#telefone");
const cpf = document.querySelector("#cpf");
const email = document.querySelector("#email");

// Textos que informam se CPF e e-mail são obrigatórios ou opcionais.
const statusCpf = document.querySelector("#status-cpf");
const statusEmail = document.querySelector("#status-email");

// Opções que permitem escolher a forma de identificação.
const opcoesIdentificacao = document.querySelectorAll(
    'input[name="tipo-identificacao"]'
);

// ========================================
// CONTROLE DOS CAMPOS CPF E E-MAIL
// ========================================

function atualizarCampos() {
    const opcaoSelecionada = document.querySelector(
        'input[name="tipo-identificacao"]:checked'
    );

    // Evita acessar .value caso nenhuma opção esteja selecionada.
    if (!opcaoSelecionada) return;

    const cpfObrigatorio = opcaoSelecionada.value === "cpf";

    // Apenas o campo escolhido se torna obrigatório.
    cpf.required = cpfObrigatorio;
    email.required = !cpfObrigatorio;

    statusCpf.textContent = cpfObrigatorio
        ? "(obrigatório)"
        : "(opcional)";

    statusEmail.textContent = cpfObrigatorio
        ? "(opcional)"
        : "(obrigatório)";

    // Uma validação antiga não deve bloquear o envio quando o CPF é opcional.
    if (!cpfObrigatorio) {
        cpf.setCustomValidity("");
    } else {
        validarCampoCpf();
    }
}

// Atualiza os campos sempre que a pessoa troca a forma de identificação.
opcoesIdentificacao.forEach((opcao) => {
    opcao.addEventListener("change", atualizarCampos);
});

// Define o estado inicial dos campos ao carregar a página.
atualizarCampos();

// ========================================
// VALIDAÇÃO DOS DÍGITOS DO CPF
// ========================================

function cpfEhValido(valor) {
    const numeros = valor.replace(/\D/g, "");

    // O CPF precisa ter 11 dígitos e não pode ser uma sequência repetida.
    if (numeros.length !== 11 || /^(\d)\1{10}$/.test(numeros)) {
        return false;
    }

    // Calcula os dois dígitos verificadores e compara com os informados.
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

// Aplica ou remove a mensagem de validação personalizada do CPF.
function validarCampoCpf() {
    if (!cpf.required || cpf.value.length === 0) {
        cpf.setCustomValidity("");
        return;
    }

    if (cpf.value.length === 14 && !cpfEhValido(cpf.value)) {
        cpf.setCustomValidity("CPF inválido. Confira os números digitados.");
    } else {
        cpf.setCustomValidity("");
    }
}

// ========================================
// FORMATAÇÃO AUTOMÁTICA DO TELEFONE
// ========================================

telefone.addEventListener("input", () => {
    // Mantém somente números e limita o telefone a 11 dígitos.
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

// ========================================
// FORMATAÇÃO E VALIDAÇÃO DO CPF
// ========================================

cpf.addEventListener("input", () => {
    // Remove caracteres que não sejam números e limita a 11 dígitos.
    let numeros = cpf.value.replace(/\D/g, "").slice(0, 11);

    // Insere pontos e hífen conforme a pessoa digita.
    numeros = numeros.replace(/^(\d{3})(\d)/, "$1.$2");
    numeros = numeros.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    numeros = numeros.replace(
        /^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})$/,
        "$1.$2.$3-$4"
    );

    cpf.value = numeros;
    validarCampoCpf();
});

// ========================================
// ENVIO E LIMPEZA DO FORMULÁRIO
// ========================================

formulario.addEventListener("submit", (evento) => {
    // Mantém a demonstração no Front-end, sem enviar dados para um servidor.
    evento.preventDefault();

    alert(
        "Solicitação enviada com sucesso! Em breve nossa equipe entrará em contato."
    );

    formulario.reset();
});

// Depois da limpeza, restaura os campos e as validações para o estado inicial.
formulario.addEventListener("reset", () => {
    // O pequeno atraso permite que o navegador conclua o reset primeiro.
    setTimeout(() => {
        cpf.setCustomValidity("");
        atualizarCampos();
    }, 0);
});
