ValorProduto = 300;
descontoProduto = 10;

desconto = (ValorProduto * descontoProduto/100);

let valorDesconto = ValorProduto - desconto;
    console.log(`${valorDesconto} é o valor do produto com 10% de desconto`);