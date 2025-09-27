const prompt = require('prompt-sync')();

let ValorReal = Number(prompt("Digite um valor: "));

function converterReais(valor) {
    const taxas = {
        Euro: 0.187,
        Dolar: 0.160
    };

    const resultados = {
        ValorFinalEuro: valor * taxas.Euro,
        ValorfinalDollars: valor * taxas.Dolar
    };

    return resultados; 
}

let convertido = converterReais(ValorReal);

console.log(`${convertidoValorFinalEuro} é o valor da taxa em Euro`);
console.log(`${convertido.ValorfinalDollars} é o valor da taxa em Dólar`);