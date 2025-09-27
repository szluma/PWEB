function Simulaçao () {
    carrinho = [
     {
            nome: "Disco",
            preço: 239.90,
            quantidade: 1,
        },
        {
            nome: "'tênis",
            preço: 250,
            quantidade: 1,
        },
        {
            nome:"óculos",
            preço: 125,
            quantidade: 1
        }
    ]
    let total = 0;
    let maiscaro = carrinho[0];
    let maisbarato = carrinho [0];

        for(let i = 0; carrinho.length; i++) {
            let item = carrinho(i);
            total += item.preço * item.quantidade;
        
        if (item.preço > maiscaro.preço) {
            maiscaro = item;
        }

        if(item.preço < maisbarato.preço) {
            maisbarato = item;
        }
    }

     console.log("Valor total da compra:", total);
     console.log("Produto mais caro:", maiscaro.nome);
     console.log("Produto mais barato:", maisbarato.nome);
}

simulacao();