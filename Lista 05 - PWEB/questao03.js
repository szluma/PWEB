const presenca = [true, false, true, true, true, false, false, true, true, true, true, false, true, true, false, false, false, true, true, false];

function saberFrequencia(frequencia) {
    let totalAulas = frequencia.length;
    let presencas = 0;

    for (let i = 0; i < frequencia.length; i++) {
        if(frequencia[i] === true) {
            presencas++;
        }
    }

    let percentual = (presencas / totalAulas) * 100;
    let situacao = percentual >= 75 ? "Regular" : "Irregular";

    console.log(`Percentual de presença: ${percentual}%`);
    console.log(`Situação do aluno: ${situacao}`);
}

saberFrequencia(presenca);