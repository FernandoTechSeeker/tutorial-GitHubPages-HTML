const leadForm = document.querySelector("#leadForm");
const feedback = document.querySelector("#formFeedback");

leadForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.querySelector("#nome").value.trim();
  const telefone = document.querySelector("#telefone").value.trim();
  const cidade = document.querySelector("#cidade").value.trim();
  const mensagem = document.querySelector("#mensagem").value.trim();
  const consentimento = document.querySelector("#consentimento").checked;

  if (!nome || !telefone || !cidade || !consentimento) {
    feedback.textContent = "Preencha nome, WhatsApp, cidade e autorização de contato.";
    return;
  }

  const texto = `Olá, vim pelo site Apoio Regional PE/PB e gostaria de orientação.%0A%0ANome: ${encodeURIComponent(nome)}%0AWhatsApp: ${encodeURIComponent(telefone)}%0ACidade/Estado: ${encodeURIComponent(cidade)}%0AMensagem: ${encodeURIComponent(mensagem || "Não informado")}`;

  window.open(`https://wa.me/5581997155279?text=${texto}`, "_blank", "noopener,noreferrer");
  feedback.textContent = "Perfeito. O WhatsApp foi aberto com a mensagem pronta.";
});
