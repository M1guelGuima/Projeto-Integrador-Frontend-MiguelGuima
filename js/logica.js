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

let continuar = true;

do {
    const entrada = prompt(
        'Digite a velocidade mínima desejada (Mbps) ou "sair" para encerrar:'
    );

    if (entrada === null || entrada.trim().toLowerCase() === "sair") {
        continuar = false;
        console.log("Análise encerrada.");
    } else {
        const velocidadeMinima = Number(entrada);
        let entradaValida = true;

        if (entrada.trim() === "") {
            console.log("Erro: nenhum valor foi informado.");
            entradaValida = false;
        } else if (Number.isNaN(velocidadeMinima)) {
            console.log("Erro: digite um valor numérico válido.");
            entradaValida = false;
        } else if (velocidadeMinima < 1 || velocidadeMinima > 10000) {
            console.log("Erro: informe uma velocidade entre 1 e 10.000 Mbps.");
            entradaValida = false;
        }

        if (entradaValida) {
            let quantidadeBasica = 0;
            let quantidadeIntermediaria = 0;
            let quantidadeAlta = 0;
            let quantidadeComBeneficios = 0;
            let maiorVelocidade = 0;
            const resultados = [];

            for (const plano of planos) {
                if (
                    plano.velocidade === null ||
                    plano.velocidade < velocidadeMinima
                ) {
                    continue;
                }

                let classificacao;

                if (plano.velocidade === null) {
                    classificacao = "Personalizada";
                } else if (plano.velocidade < 400) {
                    classificacao = "Básica";
                } else if (plano.velocidade < 600) {
                    classificacao = "Intermediária";
                } else {
                    classificacao = "Alta";
                }

                if (classificacao === "Básica") {
                    quantidadeBasica++;
                } else if (classificacao === "Intermediária") {
                    quantidadeIntermediaria++;
                } else if (classificacao === "Alta") {
                    quantidadeAlta++;
                }

                if (plano.temBeneficio) {
                    quantidadeComBeneficio++;
                }

                if (plano.velocidade != null && plano.velocidade > maiorVelocidade) {
                    maiorVelocidade = plano.velocidade;
                }

                resultados.push({
                    nome: plano.nome,
                    velocidade: plano.velocidade,
                    categoria: plano.categoria,
                    classificacao: classificacao,
                    precoBase: plano.precoBase
                });

                console.log(`${plano.nome}: ${classificacao}`);

                switch (plano.categoria) {
                    case "casual":
                        console.log("Plano indicado para uso cotidiano.");
                        break;

                    case "pro":
                        console.log("Plano indicado para quem precisa de mais desempenho.");
                        break;

                    case "gamer":
                        console.log("Plano indicado para o público gamer.");
                        break;

                    case "empresa":
                        console.log("Plano voltado para empresas.");
                        break;

                    default:
                        console.log("Categoria de plano não reconhecida.");
                }
            }

            console.log("Planos com beneficios:", quantidadeComBeneficios);

            console.table(resultados);
                console.log("Maior velocidade encontrada:", maiorVelocidade, "Mbps");
                console.log("Planos básicos:", quantidadeBasica);
                console.log("Planos intermediários:", quantidadeIntermediaria);
                console.log("Planos de alta velocidade:", quantidadeAlta);
        }
    }
} while (continuar);