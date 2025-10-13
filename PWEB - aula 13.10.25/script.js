let title = document.getElementById("title");
    console.log(title);

let description = document.getElementsByClassName("description");
    console.log|(description);

let informacao = document.getElementsByClassName("informacao");
console.log(informacao);

// let ul = document.createElement("ul");
// let li = document.createElement("li");
// let p = document.createElement("p");

// p.innerHTML="Hannibal";
// ul.append(ul);
// li.append(li);

let img = document.createElement("img");
img.setAttribute("src", "https://www.revistanerd.com.br/wp-content/uploads/2021/01/dexter.jpg");
document.body.appendChild(img);
img.classList.add("imagem");