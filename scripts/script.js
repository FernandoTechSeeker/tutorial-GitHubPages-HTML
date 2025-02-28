// Aguarda o carregamento completo do HTML antes de executar o JavaScript
document.addEventListener("DOMContentLoaded", () => {
    
    // 🎯 Seleciona a imagem no HTML
    let myImage = document.querySelector("img");

    // 🖱️ Adiciona evento para trocar a imagem ao clicar nela
    myImage.addEventListener("click", () => {
        // Obtém o caminho atual da imagem
        let mySrc = myImage.getAttribute("src");

        // Se a imagem for "images_1.jpg", troca para "html1.jpg"
        if (mySrc.includes("images_1.jpg")) {
            myImage.setAttribute("src", "images/html1.jpg"); // Novo caminho
        } else {
            // Se não for, volta para a imagem original
            myImage.setAttribute("src", "images/images_1.jpg");
        }
    });

    // 🎯 Seleciona o botão e o título (h1) no HTML
    let myButton = document.querySelector("#botao");
    let myHeading = document.querySelector("h1");

    // 📝 Função para definir um nome de usuário
    function setUserName() {
        let myName = prompt("Por favor, digite seu nome."); // Pergunta o nome

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
        // Se já existir, exibe o nome salvo no título
        myHeading.textContent = `JavaScript é muito legal, ${storedName}`;
    } else {
        // Se não existir, pede um nome ao usuário
        setUserName();
    }

    // 🖱️ Adiciona um evento ao botão para alterar o nome
    myButton.addEventListener("click", () => {
        setUserName();
    });

});
