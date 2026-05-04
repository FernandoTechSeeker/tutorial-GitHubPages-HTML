const leadForm = document.querySelector('#leadForm');
const feedback = document.querySelector('#formFeedback');

leadForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.querySelector('#nome').value.trim();
  const telefone = document.querySelector('#telefone').value.trim();
  const cidade = document.querySelector('#cidade').value.trim();
  const situacao = document.querySelector('#situacao').value.trim();
  const paraQuem = document.querySelector('#paraQuem').value.trim();
  const urgencia = document.querySelector('#urgencia').value.trim();
  const mensagem = document.querySelector('#mensagem').value.trim();
  const consentimento = document.querySelector('#consentimento').checked;

  if (!nome || !telefone || !cidade || !situacao || !paraQuem || !urgencia || !consentimento) {
    feedback.textContent = 'Preencha nome, WhatsApp, cidade, situação, para quem é, urgência e autorização de contato.';
    return;
  }

  const texto = `Olá, gostaria de receber orientação sobre tratamento para dependência química ou alcoolismo. Quero entender custos, contrato, regras e próximos passos antes de decidir.%0A%0ANome: ${encodeURIComponent(nome)}%0AWhatsApp: ${encodeURIComponent(telefone)}%0ACidade/Estado: ${encodeURIComponent(cidade)}%0ASituação envolve: ${encodeURIComponent(situacao)}%0AÉ para: ${encodeURIComponent(paraQuem)}%0AUrgência: ${encodeURIComponent(urgencia)}%0AMensagem: ${encodeURIComponent(mensagem || 'Não informado')}`;

  window.open(`https://wa.me/5581997155279?text=${texto}`, '_blank', 'noopener,noreferrer');
  feedback.textContent = 'Perfeito. O WhatsApp foi aberto com a mensagem pronta.';
});
