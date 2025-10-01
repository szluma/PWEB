const salarioBase = 3000;
const horasExtras = 10;
const ValorHoras = 25.00;

let funcionaria = (ValorHoras * horasExtras);
    console.log(`${funcionaria} é o valor que a funcionaria vai receber de acordo com suas horas extras`);

let salarioTotal = salarioBase + funcionaria;
    console.log(`${salarioTotal} é o salario total da funcionaria`);