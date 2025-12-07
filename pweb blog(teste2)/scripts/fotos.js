// 🔗 Mapa de páginas dos artigos
const paginas = {
    "dexter": "dexter.html",
    "thehaunting": "thehauntingofblymanor.html",
    "tlfou": "tlfou.html",
    "you": "you.html",
    "tvd": "tvd.html",
    "killingeve": "killingeve.html",
    "ahs": "ahs.html",
    "breakingbad": "breakingbad.html",
    "bomdiaveronica": "bomdiaveronica.html",
    "blackmirror": "blackmirror.html",
    "yellowjackets": "yellowjackets.html",
    "twd": "twd.html",
    "strangerthings": "StrangerThings"
};

// 🧠 Função que detecta o nome do arquivo pela imagem
function detectarPagina(imgSrc) {
    // pega só o nome do arquivo sem extensão
    let nome = imgSrc.split("/").pop().split(".")[0].toLowerCase();

    // procura algo que existe no mapa
    for (let chave in paginas) {
        if (nome.includes(chave)) {
            return paginas[chave];
        }
    }

    return null;
}

// 🎯 Clique nos cards semelhantes
document.addEventListener("click", e => {
    const card = e.target.closest(".card");
    if (!card) return;

    const img = card.querySelector("img");
    if (!img) return;

    const pagina = detectarPagina(img.src);

    if (pagina) {
        window.location.href = pagina;
    }
});
