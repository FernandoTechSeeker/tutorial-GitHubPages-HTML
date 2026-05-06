const WHATSAPP_URL = 'https://wa.me/5581997155279?text=Ol%C3%A1%2C%20gostaria%20de%20receber%20orienta%C3%A7%C3%A3o%20sobre%20tratamento%20para%20depend%C3%AAncia%20qu%C3%ADmica%20ou%20alcoolismo.%20Quero%20entender%20custos%2C%20contrato%2C%20regras%20e%20pr%C3%B3ximos%20passos%20antes%20de%20decidir.';

const leadForm = document.querySelector('#leadForm');
const feedback = document.querySelector('#formFeedback');

function createCtaBox(title, text, buttonText) {
  const box = document.createElement('div');
  box.className = 'conversion-cta';
  box.innerHTML = `
    <div>
      <strong>${title}</strong>
      <p>${text}</p>
    </div>
    <a class="btn btn-primary" href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer">${buttonText}</a>
  `;
  return box;
}

function insertAfter(element, newElement) {
  if (!element || !element.parentNode) return;
  element.parentNode.insertBefore(newElement, element.nextSibling);
}

function addStrategicCtas() {
  const ctaStyle = document.createElement('style');
  ctaStyle.textContent = `
    .conversion-cta {
      width: min(1120px, 92%);
      margin: 34px auto 0;
      background: linear-gradient(135deg, #DDEDE9 0%, #F6F1E8 100%);
      border: 1px solid var(--borda);
      border-radius: var(--radius);
      padding: 22px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      box-shadow: 0 12px 30px rgba(18,60,58,.08);
    }
    .conversion-cta strong { color: var(--verde-profundo); font-size: 1.08rem; display: block; margin-bottom: 4px; }
    .conversion-cta p { color: var(--texto-suave); margin: 0; }
    @media(max-width: 900px) {
      .conversion-cta { flex-direction: column; align-items: flex-start; }
      .conversion-cta .btn { width: 100%; }
    }
  `;
  document.head.appendChild(ctaStyle);

  const sections = document.querySelectorAll('main > section');

  insertAfter(
    sections[1],
    createCtaBox(
      'Dúvida sobre custos, contrato ou regras?',
      'Fale com discrição pelo WhatsApp e receba orientação inicial antes de tomar qualquer decisão.',
      'Falar com discrição pelo WhatsApp'
    )
  );

  insertAfter(
    sections[3],
    createCtaBox(
      'Quer entender melhor antes de escolher?',
      'A orientação ajuda a família a organizar perguntas sobre entrada, mensalidade, prazo, visita e saída antecipada.',
      'Entender custos e contrato'
    )
  );

  insertAfter(
    document.querySelector('#como-funciona'),
    createCtaBox(
      'Já sabe que precisa conversar com alguém?',
      'Comece pelo essencial. Você não precisa expor tudo no primeiro contato.',
      'Quero orientação antes de decidir'
    )
  );

  insertAfter(
    sections[8],
    createCtaBox(
      'Atendemos sua região?',
      'Envie sua cidade pelo WhatsApp para entendermos a região e os próximos passos possíveis.',
      'Ver orientação para minha região'
    )
  );

  const contato = document.querySelector('#contato .section-title');
  if (contato) {
    const quickNote = document.createElement('div');
    quickNote.className = 'conversion-cta';
    quickNote.innerHTML = `
      <div>
        <strong>Prefere ir direto para o WhatsApp?</strong>
        <p>Você pode começar a conversa agora e enviar apenas as informações essenciais.</p>
      </div>
      <a class="btn btn-primary" href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer">Começar conversa pelo WhatsApp</a>
    `;
    contato.parentNode.insertBefore(quickNote, contato.nextSibling);
  }
}

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

document.addEventListener('DOMContentLoaded', addStrategicCtas);
