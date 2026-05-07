const leadForm = document.querySelector('#leadForm');
const feedback = document.querySelector('#formFeedback');

function prepararFormularioSimplificado() {
  const telefoneInput = document.querySelector('#telefone');
  const situacaoInput = document.querySelector('#situacao');
  const paraQuemInput = document.querySelector('#paraQuem');

  const telefoneLabel = telefoneInput?.closest('label');
  const situacaoLabel = situacaoInput?.closest('label');

  telefoneInput?.removeAttribute('required');
  situacaoInput?.removeAttribute('required');

  telefoneLabel?.remove();
  situacaoLabel?.remove();

  if (paraQuemInput && !document.querySelector('#voluntario')) {
    const voluntarioLabel = document.createElement('label');
    voluntarioLabel.innerHTML = `
      Voluntário?
      <select id="voluntario" required>
        <option value="">Selecione</option>
        <option>Sim</option>
        <option>Não</option>
        <option>Não sei informar</option>
      </select>
    `;

    paraQuemInput.closest('label')?.insertAdjacentElement('afterend', voluntarioLabel);
  }
}

leadForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.querySelector('#nome').value.trim();
  const cidade = document.querySelector('#cidade').value.trim();
  const paraQuem = document.querySelector('#paraQuem').value.trim();
  const voluntario = document.querySelector('#voluntario')?.value.trim();
  const urgencia = document.querySelector('#urgencia').value.trim();
  const mensagem = document.querySelector('#mensagem').value.trim();
  const consentimento = document.querySelector('#consentimento').checked;

  if (!nome || !cidade || !paraQuem || !voluntario || !urgencia || !consentimento) {
    feedback.textContent = 'Preencha nome, cidade, para quem é, se é voluntário, urgência e autorização de contato.';
    return;
  }

  const texto = `Olá, gostaria de receber orientação sobre tratamento para dependência química ou alcoolismo. Quero entender custos, contrato, regras e próximos passos antes de decidir.%0A%0ANome: ${encodeURIComponent(nome)}%0ACidade/Estado: ${encodeURIComponent(cidade)}%0AÉ para: ${encodeURIComponent(paraQuem)}%0AVoluntário: ${encodeURIComponent(voluntario)}%0AUrgência: ${encodeURIComponent(urgencia)}%0AMensagem: ${encodeURIComponent(mensagem || 'Não informado')}`;

  window.open(`https://wa.me/5581997155279?text=${texto}`, '_blank', 'noopener,noreferrer');
  feedback.textContent = 'Perfeito. O WhatsApp foi aberto com a mensagem pronta.';
});

document.addEventListener('DOMContentLoaded', prepararFormularioSimplificado);
prepararFormularioSimplificado();
