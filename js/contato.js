
// Seleciona os campos do formulário
const telefone = document.querySelector("#telefone");
const cpf = document.querySelector("#cpf");
const email = document.querySelector("#email");

// Seleciona as áreas de identificação
const campoCpf = document.querySelector("#campo-cpf");
const campoEmail = document.querySelector("#campo-email");

// Seleciona as opções CPF e E-mail
const opcoesIdentificacao = document.querySelectorAll(
    'input[name="tipo-identificacao"]'
);

// Escolha entre CPF e E-mail
opcoesIdentificacao.forEach((opcao) => {

    opcao.addEventListener("change", () => {

        if (opcao.value === "cpf") {

            campoCpf.hidden = false;
            campoEmail.hidden = true;

            cpf.disabled = false;
            cpf.required = true;

            email.disabled = true;
            email.required = false;

        } else {

            campoCpf.hidden = true;
            campoEmail.hidden = false;

            cpf.disabled = true;
            cpf.required = false;

            email.disabled = false;
            email.required = true;

        }

    });

});

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

// Formatação do CPF
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
});