const leadForm = document.querySelector('#leadForm');
const feedback = document.querySelector('#formFeedback');
const WHATSAPP_ORIENTACAO_URL = 'https://wa.me/5581997155279?text=Ol%C3%A1%2C%20gostaria%20de%20receber%20orienta%C3%A7%C3%A3o%20sobre%20tratamento%20para%20depend%C3%AAncia%20qu%C3%ADmica%20ou%20alcoolismo.%20Quero%20entender%20custos%2C%20contrato%2C%20regras%20e%20pr%C3%B3ximos%20passos%20antes%20de%20decidir.';

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

function criarCtaMeioPagina(textoPrincipal, textoDetalhe) {
  const cta = document.createElement('div');
  cta.className = 'cta-meio-pagina';
  cta.innerHTML = `
    <p>${textoPrincipal}</p>
    <a href="${WHATSAPP_ORIENTACAO_URL}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
      Fale no WhatsApp antes de decidir uma internação
    </a>
    <p class="cta-detalhe">${textoDetalhe}</p>
  `;
  return cta;
}

function inserirDepois(elemento, novoElemento) {
  if (!elemento || !elemento.parentNode || !novoElemento) return;
  elemento.parentNode.insertBefore(novoElemento, elemento.nextSibling);
}

function adicionarCtasMeioPagina() {
  if (document.querySelector('.cta-meio-pagina')) return;

  const secaoEntenda = document.querySelector('#entenda');
  const secaoComoFunciona = document.querySelector('#como-funciona');
  const secaoLimites = Array.from(document.querySelectorAll('section')).find((secao) =>
    secao.textContent.includes('O que fazemos e o que não fazemos')
  );

  inserirDepois(
    secaoEntenda,
    criarCtaMeioPagina(
      'Se esse é o momento da sua família, você não precisa resolver isso sozinho.',
      'Sem compromisso. Sem pressão. Apenas orientação.'
    )
  );

  inserirDepois(
    secaoComoFunciona?.nextElementSibling,
    criarCtaMeioPagina(
      'Ainda tem dúvidas sobre custos, contrato ou próximos passos?',
      'Atendimento pelo WhatsApp conforme disponibilidade.'
    )
  );

  inserirDepois(
    secaoLimites,
    criarCtaMeioPagina(
      'Quer entender melhor antes de qualquer decisão?',
      'Sem diagnóstico. Sem promessa de cura. Apenas orientação.'
    )
  );
}

function adicionarSecaoQuemOrienta() {
  if (document.querySelector('#quem-orienta')) return;

  const contato = document.querySelector('#contato');
  if (!contato || !contato.parentNode) return;

  const secao = document.createElement('section');
  secao.id = 'quem-orienta';
  secao.className = 'bg-white quem-orienta-section';
  secao.innerHTML = `
    <div class="container">
      <div class="section-title">
        <span>Quem orienta</span>
        <h2>Orientação feita com experiência prática e responsabilidade</h2>
        <p>Antes de conversar com uma instituição, a família precisa entender o que perguntar, quais cuidados observar e quais limites respeitar.</p>
      </div>

      <div class="quem-orienta-texto">
        <p>
          O atendimento inicial é feito por pessoas que já estiveram do mesmo lado que você está agora — buscando entender como funciona uma internação, o que perguntar antes de assinar um contrato, o que esperar do processo e como proteger a família durante esse momento.
        </p>
        <p>
          Não somos médicos, psicólogos ou assistentes sociais. Não fazemos diagnóstico e não decidimos por você. Nossa função é organizar as informações administrativas e contratuais para que a família chegue à conversa com a instituição mais preparada, com menos dúvida e com mais clareza sobre o que está sendo contratado.
        </p>
      </div>

      <div class="quem-orienta-destaques">
        <div class="destaque-item">
          <strong>Experiência no contexto</strong>
          <p>Conhecimento prático sobre como funcionam comunidades terapêuticas em Pernambuco e Paraíba — custos, contratos, regras, rotina e o que costuma gerar dúvida nas famílias.</p>
        </div>
        <div class="destaque-item">
          <strong>Sem invenção de credencial</strong>
          <p>Não prometemos o que não somos. Orientamos dentro do que podemos fazer com responsabilidade e clareza sobre os nossos limites.</p>
        </div>
        <div class="destaque-item">
          <strong>Foco na família</strong>
          <p>Sabemos que a família chega cansada, com medo e com pressa. O nosso papel é ajudar a organizar isso antes de qualquer decisão.</p>
        </div>
      </div>

      <div class="cta-meio-pagina cta-quem-orienta">
        <p>Se quiser conversar antes de preencher qualquer coisa:</p>
        <a href="${WHATSAPP_ORIENTACAO_URL}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
          Fale no WhatsApp antes de decidir uma internação
        </a>
        <p class="cta-detalhe">Conversa inicial com discrição e orientação responsável.</p>
      </div>
    </div>
  `;

  contato.parentNode.insertBefore(secao, contato);
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

function inicializarAjustes() {
  prepararFormularioSimplificado();
  adicionarCtasMeioPagina();
  adicionarSecaoQuemOrienta();
}

document.addEventListener('DOMContentLoaded', inicializarAjustes);
inicializarAjustes();
