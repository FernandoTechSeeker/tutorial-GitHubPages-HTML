// Aguarda o carregamento completo do HTML antes de executar o JavaScript
document.addEventListener("DOMContentLoaded", () => {

    // 🎯 Seleciona a imagem no HTML
    let myImage = document.querySelector("img");

    // 🖱️ Adiciona evento para trocar a imagem ao clicar nela
    myImage.addEventListener("click", () => {
        let mySrc = myImage.getAttribute("src");

        // Se a imagem for "images_1.jpg", troca para "html1.jpg"
        if (mySrc.includes("images_1.jpg")) {
            myImage.setAttribute("src", "images/html1.jpg");
        } else {
            myImage.setAttribute("src", "images/images_1.jpg");
        }
    });

    // 🎯 Seleciona o botão e o título (h1) no HTML
    let myButton = document.querySelector("#botao");
    let myHeading = document.querySelector("h1");

    // 📝 Função para definir um nome de usuário
    function setUserName() {
        let myName = prompt("Por favor, digite seu nome.");

        // ⚠️ Verifica se o nome é válido (não pode estar vazio)
        if (!myName || myName.trim() === "") {
            alert("Nome inválido! Tente novamente.");
            return;
        }

        // 💾 Salva o nome no localStorage
        localStorage.setItem("name", myName);
        myHeading.textContent = `JavaScript é muito legal, ${myName}`;
    }

    // 🔍 Verifica se já existe um nome salvo no localStorage
    let storedName = localStorage.getItem("name");

    if (storedName) {
        myHeading.textContent = `JavaScript é muito legal, ${storedName}`;
    } else {
        setUserName();
    }

    // 🖱️ Adiciona um evento ao botão para alterar o nome
    myButton.addEventListener("click", () => {
        setUserName();
    });
});
