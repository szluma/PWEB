function calcularDelta(a, b, c) {
    let delta = (b * b) - 4 * a * c;
    return delta;
}

let a = 2;
let b = 5;
let c = -3;

let delta = calcularDelta(a, b, c);
console.log(`O valor de delta é: ${delta}`);