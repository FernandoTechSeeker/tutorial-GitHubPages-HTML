const leadForm = document.querySelector('#leadForm');
const feedback = document.querySelector('#formFeedback');
const SITE_OFICIAL_URL = 'https://apoiofamiliarpepb.com.br/';
const SITE_OFICIAL_IMAGE = 'https://apoiofamiliarpepb.com.br/assets/img/area-externa-fonte-vista.jpg.jpg';
const WHATSAPP_ORIENTACAO_URL = 'https://wa.me/5581973069389?text=Ol%C3%A1%2C%20gostaria%20de%20receber%20orienta%C3%A7%C3%A3o%20sobre%20tratamento%20para%20depend%C3%AAncia%20qu%C3%ADmica%20ou%20alcoolismo.%20Quero%20entender%20custos%2C%20contrato%2C%20regras%20e%20pr%C3%B3ximos%20passos%20antes%20de%20decidir.';

function atualizarMetadadosDominio() {
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = SITE_OFICIAL_URL;

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', SITE_OFICIAL_URL);

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) ogImage.setAttribute('content', SITE_OFICIAL_IMAGE);

  document.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
    try {
      const data = JSON.parse(script.textContent);
      if (data && data['@type'] === 'LocalBusiness') {
        data.url = SITE_OFICIAL_URL;
        data.telephone = '+5581973069389';
        if (data.contactPoint) data.contactPoint.telephone = '+5581973069389';
        script.textContent = JSON.stringify(data, null, 2);
      }
    } catch (error) {
      return;
    }
  });
}

function atualizarLinksWhatsApp() {
  document.querySelectorAll('a[href*="wa.me"], a[href*="api.whatsapp.com"]').forEach((link) => {
    link.href = WHATSAPP_ORIENTACAO_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}

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

function inserirDepois(elemento, novoElemento) {
  if (!elemento || !elemento.parentNode || !novoElemento) return;
  elemento.parentNode.insertBefore(novoElemento, elemento.nextSibling);
}

function adicionarAtendimentoRapido() {
  if (document.querySelector('#atendimento-rapido')) return;

  const hero = document.querySelector('.hero');
  if (!hero) return;

  const rapido = document.createElement('section');
  rapido.id = 'atendimento-rapido';
  rapido.className = 'atendimento-rapido-section';
  rapido.innerHTML = `
    <div class="container atendimento-rapido-box">
      <div>
        <span class="mini-label">Atendimento rápido</span>
        <h2>Precisa falar agora?</h2>
        <p>Se a família está em crise, recaída ou sem saber o que fazer, vá direto para o WhatsApp. Depois, com calma, você pode ler os detalhes.</p>
        <p class="alerta-urgencia">Em risco imediato, surto, overdose, ameaça à vida ou tentativa de suicídio, procure primeiro atendimento de urgência: SAMU 192, UPA, hospital, CAPS ou serviço especializado da sua região.</p>
        <p class="alerta-urgencia">Depois que a situação estiver estabilizada, fale conosco pelo WhatsApp. Podemos orientar os próximos passos e, quando houver compatibilidade, facilitar o contato com a comunidade responsável para avaliar acolhimento, regras, documentação e possibilidade de remoção segura.</p>
      </div>
      <a href="${WHATSAPP_ORIENTACAO_URL}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp btn-whatsapp-grande">Falar agora pelo WhatsApp</a>
    </div>
  `;

  inserirDepois(hero, rapido);
}

function adicionarSecaoFaixaPrecos() {
  if (document.querySelector('#faixa-precos')) return;

  const transparencia = document.querySelector('#transparencia');
  if (!transparencia || !transparencia.parentNode) return;

  const secao = document.createElement('section');
  secao.id = 'faixa-precos';
  secao.className = 'bg-white secao-compacta';
  secao.innerHTML = `
    <div class="container">
      <div class="section-title">
        <span>Valores</span>
        <h2>Quanto custa em média uma comunidade terapêutica em PE e PB?</h2>
        <p>Não existe um preço único. Os valores variam conforme estrutura, localização, equipe, rotina, tempo de contrato e o que está incluso.</p>
      </div>

      <div class="grid-3">
        <article class="card">
          <h3>Faixa de referência</h3>
          <p>Como referência geral do mercado regional, muitas instituições simples e intermediárias costumam trabalhar com mensalidades entre <strong>R$ 1.500 e R$ 3.500 por mês</strong>.</p>
          <p>Valores menores podem representar custo interno aproximado por paciente, não necessariamente o preço comercial cobrado da família.</p>
        </article>
        <article class="card">
          <h3>Entrada e custos extras</h3>
          <p>Algumas instituições podem cobrar entrada separada, remoção, medicação, itens pessoais, exames, pertences ou custos administrativos. Tudo precisa ser confirmado antes da contratação.</p>
        </article>
        <article class="card">
          <h3>Confirme antes de pagar</h3>
          <p>Antes de fechar, pergunte o valor de entrada, mensalidade, vencimento, tempo mínimo de contrato, regras de saída antecipada e política de reembolso, quando houver.</p>
        </article>
      </div>

      <div class="cta-strip">
        <strong>Quer entender se o valor faz sentido para sua região?</strong>
        <a class="btn btn-primary" href="${WHATSAPP_ORIENTACAO_URL}" target="_blank" rel="noopener noreferrer">Tirar dúvida sobre valores pelo WhatsApp</a>
      </div>
    </div>
  `;

  transparencia.parentNode.insertBefore(secao, transparencia);
}

function adicionarSecaoQuemOrienta() {
  if (document.querySelector('#quem-orienta')) return;

  const contato = document.querySelector('#contato');
  if (!contato || !contato.parentNode) return;

  const secao = document.createElement('section');
  secao.id = 'quem-orienta';
  secao.className = 'bg-white quem-orienta-section secao-compacta';
  secao.innerHTML = `
    <div class="container">
      <div class="section-title">
        <span>Quem orienta</span>
        <h2>Orientação simples, prática e responsável</h2>
        <p>Não somos médicos, psicólogos ou assistentes sociais. Não fazemos diagnóstico e não decidimos por você.</p>
      </div>

      <div class="quem-orienta-destaques">
        <div class="destaque-item">
          <strong>Experiência no contexto</strong>
          <p>Entendemos dúvidas comuns sobre custos, contratos, regras, rotina e contato com instituições em Pernambuco e Paraíba.</p>
        </div>
        <div class="destaque-item">
          <strong>Sem pressão</strong>
          <p>Orientamos dentro dos nossos limites, com clareza e responsabilidade.</p>
        </div>
        <div class="destaque-item">
          <strong>Foco na família</strong>
          <p>Ajudamos a organizar a decisão num momento de medo, pressa e desgaste.</p>
        </div>
      </div>
    </div>
  `;

  contato.parentNode.insertBefore(secao, contato);
}

function compactarPaginaParaFamiliaEmCrise() {
  document.body.classList.add('jornada-rapida');

  const secoes = Array.from(document.querySelectorAll('section'));
  const secaoEstrutura = secoes.find((secao) => secao.textContent.includes('Estrutura e ambiente'));
  const secaoRegioes = document.querySelector('#regioes');

  secaoEstrutura?.classList.add('secao-opcional-mobile');
  secaoRegioes?.classList.add('secao-compacta');
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

  window.open(`https://wa.me/5581973069389?text=${texto}`, '_blank', 'noopener,noreferrer');
  feedback.textContent = 'Perfeito. O WhatsApp foi aberto com a mensagem pronta.';
});

function inicializarAjustes() {
  atualizarMetadadosDominio();
  atualizarLinksWhatsApp();
  prepararFormularioSimplificado();
  adicionarAtendimentoRapido();
  adicionarSecaoFaixaPrecos();
  adicionarSecaoQuemOrienta();
  compactarPaginaParaFamiliaEmCrise();
  atualizarLinksWhatsApp();
  atualizarMetadadosDominio();
}

document.addEventListener('DOMContentLoaded', inicializarAjustes);
inicializarAjustes();
