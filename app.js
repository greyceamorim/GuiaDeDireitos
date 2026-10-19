/* Guia de Direitos — lógica da página.
   Os valores e textos dos benefícios ficam em regras.js. Este arquivo só faz as contas e monta as telas. */
(function () {
  'use strict';
  var app = document.getElementById('app');
  var R = null; // regras carregadas de regras.js

  var I = {
    casa: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/></svg>',
    coracao: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"/></svg>',
    ok: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
    okp: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
    menos: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>',
    mais: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14"/><path d="M5 12h14"/></svg>',
    som: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>',
    seta: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',
    doc: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8"/><path d="M8 12h8"/><path d="M8 16h5"/></svg>',
    feliz: '<svg width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="24" cy="24" r="20"/><circle cx="17" cy="19" r="1.5" fill="currentColor"/><circle cx="31" cy="19" r="1.5" fill="currentColor"/><path d="M15 28c2.5 4 5.5 6 9 6s6.5-2 9-6"/></svg>',
    triste: '<svg width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="24" cy="24" r="20"/><circle cx="17" cy="19" r="1.5" fill="currentColor"/><circle cx="31" cy="19" r="1.5" fill="currentColor"/><path d="M15 34c2.5-4 5.5-6 9-6s6.5 2 9 6"/></svg>',
    zap: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 0 1-13.4 7.9L3 21l1.1-4.6A9 9 0 1 1 21 12z"/></svg>'
  };

  var GRUPOS = [
    { k: 'c06', label: 'Crianças de até 6 anos' }, { k: 'c717', label: 'De 7 a 17 anos' },
    { k: 'c1859', label: 'Adultos de 18 a 59' }, { k: 'c6064', label: 'De 60 a 64 anos' }, { k: 'c65', label: '65 anos ou mais' }
  ];
  var QS = [
    { key: 'quem', tipo: 'um', pergunta: 'Para quem é a consulta?', ajuda: 'Assim a gente escreve do jeito certo.', opcoes: [{ v: 'eu', label: 'Para a minha família' }, { v: 'outra', label: 'Para uma família que eu ajudo' }] },
    { key: 'grupos', tipo: 'grupos', pergunta: 'Quem mora na casa?', ajuda: 'Use o + para contar as pessoas de cada idade.' },
    { key: 'renda', tipo: 'renda', pergunta: 'Quanto entra de dinheiro por mês, somando todos?', ajuda: 'Pode ser aproximado. Conte salário, bico, aposentadoria e pensão. Não conte o Bolsa Família.' },
    { key: 'trabalho', tipo: 'varios', pergunta: 'De onde vem esse dinheiro?', ajuda: 'Marque todas que servem. Se uma parte vem da carteira e outra de bico, marque as duas.', opcoes: [{ v: 'carteira', label: 'Trabalho com carteira assinada' }, { v: 'bico', label: 'Bico ou trabalho sem carteira' }, { v: 'beneficio', label: 'Aposentadoria, pensão ou benefício' }, { v: 'nenhum', label: 'Ninguém está trabalhando agora' }] },
    { key: 'cad', tipo: 'um', pergunta: 'A família já fez o Cadastro Único no CRAS?', ajuda: 'É o cadastro do governo para programas sociais.', opcoes: [{ v: 'sim', label: 'Sim, já fez' }, { v: 'nao', label: 'Não fez' }, { v: 'naosei', label: 'Não sei' }] },
    { key: 'sit', tipo: 'varios', ultima: true, pergunta: 'Alguém da casa…', ajuda: 'Marque todas que servem.', opcoes: [{ v: 'gest', label: 'Está grávida ou amamentando' }, { v: 'def', label: 'Tem alguma deficiência' }, { v: 'rem', label: 'Toma remédio todo dia' }, { v: 'medio', label: 'Estuda no ensino médio em escola pública' }, { v: 'prova', label: 'Quer fazer o ENEM ou um concurso' }] }
  ];
  var CHIP = { prov: 'Provável', perg: 'Vale perguntar', pensar: 'Para pensar' };

  function novo() { return { tela: 'intro', qi: 0, quem: null, grupos: { c06: 0, c717: 0, c1859: 0, c6064: 0, c65: 0 }, renda: '', trabalho: [], cad: null, sit: [], ouvindo: false }; }
  var s = novo();

  function fmt(v) { return 'R$ ' + Math.round(v).toLocaleString('pt-BR'); }
  // Todo texto vindo de regras.js passa por esc(): impede que um texto mal escrito vire código na página.
  function esc(t) { return String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
  function tpl(t, vars) { return String(t || '').replace(/\{(\w+)\}/g, function (m, k) { return vars && vars[k] != null ? vars[k] : m; }); }
  function on(b) { return b && b.ativo !== false; }
  function pessoas() { var g = s.grupos; return g.c06 + g.c717 + g.c1859 + g.c6064 + g.c65; }
  function rendaNum() { return parseInt(String(s.renda).replace(/\D/g, ''), 10) || 0; }

  function resultado() {
    var SM = Number(R.salario_minimo);
    var g = s.grupos, n = Math.max(1, pessoas()), rpc = rendaNum() / n;
    function tem(v) { return s.sit.indexOf(v) >= 0; }
    var gest = tem('gest'), def = tem('def'), rem = tem('rem'), medio = tem('medio'), prova = tem('prova');
    var idoso60 = g.c6064 + g.c65 > 0, idoso65 = g.c65 > 0;
    var din = [], desc = [], saude = [], edu = [], trab = [], dinheiro = 0;
    function item(nivel, b, valor, texto, onde, extra) {
      var it = { nivel: nivel, nome: b.nome, valor: valor, texto: texto, onde: onde };
      if (extra) it.lista = extra;
      return it;
    }

    var bf = R.bolsa_familia, bfOk = on(bf) && rpc <= bf.limite_renda_por_pessoa;
    if (bfOk) {
      var v = Math.max(bf.minimo_por_familia, bf.valor_por_pessoa * n + bf.adicional_crianca_0_a_6 * g.c06 + bf.adicional_7_a_17_ou_gestante * (g.c717 + (gest ? 1 : 0)));
      dinheiro += v;
      var partes = [];
      if (g.c06 > 0) partes.push(fmt(bf.adicional_crianca_0_a_6) + ' por criança de até 6 anos');
      if (g.c717 > 0 || gest) partes.push(fmt(bf.adicional_7_a_17_ou_gestante) + ' por criança de 7 a 17 anos ou gestante');
      if (!partes.length) partes.push(fmt(bf.valor_por_pessoa) + ' por pessoa');
      din.push(item('prov', bf, tpl(bf.valor, { total: fmt(v) }), tpl(bf.texto, { minimo: fmt(bf.minimo_por_familia), partes: partes.join(' e ') }), bf.onde));
    }

    var bpc = R.bpc, nBpc = g.c65 + (def ? 1 : 0), alvoBpc = idoso65 || def;
    var bpcProv = on(bpc) && alvoBpc && rpc <= SM * bpc.fracao_salario_minimo_provavel;
    if (bpcProv) {
      dinheiro += SM * nBpc;
      din.push(item('prov', bpc, tpl(bpc.valor, { sm: fmt(SM) }) + (nBpc > 1 ? ' para cada pessoa' : ''), tpl(bpc.texto, { idade: bpc.idade_minima }), bpc.onde));
    } else if (on(bpc) && alvoBpc && rpc <= SM * bpc.fracao_salario_minimo_vale_perguntar) {
      din.push(item('perg', bpc, tpl(bpc.valor_perguntar, { sm: fmt(SM) }), tpl(bpc.texto_perguntar, { limite: fmt(SM * bpc.fracao_salario_minimo_provavel) }), bpc.onde_perguntar));
    }

    var gas = R.gas_do_povo;
    if (on(gas) && bfOk && n >= gas.minimo_de_pessoas) {
      din.push(item('prov', gas, tpl(gas.valor, { botijoes: n <= 3 ? gas.botijoes_ate_3_pessoas : gas.botijoes_4_ou_mais }), gas.texto, gas.onde));
    }

    var ts = R.tarifa_social_luz, ds = R.desconto_social_luz;
    if (on(ts) && (rpc <= SM * ts.fracao_salario_minimo || bpcProv)) {
      desc.push(item('prov', ts, tpl(ts.valor, { kwh: ts.kwh_gratis }), tpl(ts.texto, { kwh: ts.kwh_gratis }), ts.onde));
    } else if (on(ds) && rpc <= SM * ds.fracao_salario_minimo) {
      desc.push(item('prov', ds, tpl(ds.valor, { kwh: ds.kwh_com_desconto }), tpl(ds.texto, { de: fmt(SM * ts.fracao_salario_minimo), ate: fmt(SM * ds.fracao_salario_minimo) }), ds.onde));
    }
    var oi = R.onibus_idoso;
    if (on(oi) && idoso60) desc.push(item('perg', oi, oi.valor, tpl(oi.texto, { idade: oi.idade_minima }), oi.onde));
    var pl = R.passe_livre;
    if (on(pl) && def && rpc <= SM * pl.fracao_salario_minimo) desc.push(item('perg', pl, pl.valor, pl.texto, pl.onde));

    var fp = R.farmacia_popular;
    if (on(fp)) {
      var lista = (fp.lista || []).slice();
      if (idoso60 || def) lista.push(fp.fralda_item);
      if (rem) saude.push(item('prov', fp, fp.valor, tpl(fp.texto, { itens: fp.total_de_itens }), fp.onde, lista));
      else if (idoso60 || def) saude.push({ nivel: 'perg', nome: fp.fralda_nome, valor: fp.fralda_valor, texto: fp.fralda_texto, onde: fp.fralda_onde });
    }

    var pm = R.pe_de_meia;
    if (on(pm) && medio && rpc <= SM * pm.fracao_salario_minimo) edu.push(item('prov', pm, pm.valor, pm.texto, pm.onde));
    var ie = R.isencao_enem_concursos;
    if (on(ie) && prova) edu.push(item((medio || rpc <= SM * ie.fracao_salario_minimo) ? 'prov' : 'perg', ie, ie.valor, ie.texto, ie.onde));

    var temCarteira = s.trabalho.indexOf('carteira') >= 0, temBico = s.trabalho.indexOf('bico') >= 0;
    var ab = R.abono_salarial, inss = R.protecao_inss;
    if (on(ab) && temCarteira) trab.push(item('perg', ab, tpl(ab.valor, { sm: fmt(SM) }), ab.texto, ab.onde));
    if (on(inss) && temBico) trab.push(item('pensar', inss, inss.valor, temCarteira ? inss.texto_com_carteira : inss.texto, inss.onde));

    var cats = [
      { nome: 'Dinheiro e ajuda em casa', itens: din }, { nome: 'Descontos', itens: desc },
      { nome: 'Saúde', itens: saude }, { nome: 'Estudo', itens: edu }, { nome: 'Trabalho', itens: trab }
    ].filter(function (c) { return c.itens.length; });
    var prov = 0, perg = 0;
    cats.forEach(function (c) { c.itens.forEach(function (it) { if (it.nivel === 'prov') prov++; if (it.nivel === 'perg') perg++; }); });
    return { cats: cats, prov: prov, perg: perg, baixa: rpc <= SM, dinheiro: dinheiro };
  }

  function topo() {
    return '<div class="teste">Versão de teste · as regras ainda estão sendo conferidas</div>' +
      '<div class="top"><div class="logo">' + I.coracao + '</div><div class="marca">Guia de Direitos</div></div>';
  }

  function telaIntro() {
    return topo() +
      '<section class="card"><div class="ico">' + I.casa + '</div>' +
      '<h1 class="h1">Descubra os direitos da família</h1>' +
      '<p class="lead">Responda 6 perguntas sobre a casa. No fim, você vê quais ajudas a família pode ter, quanto elas valem e por onde começar.</p></section>' +
      '<div class="checks">' +
      ['Para a sua família ou para quem você ajuda', 'Sem cadastro, sem nome, sem documento', 'Valores com o salário mínimo de ' + fmt(R.salario_minimo)].map(function (t) { return '<div class="check">' + I.ok + '<div>' + esc(t) + '</div></div>'; }).join('') +
      '</div><div class="grow"></div>' +
      '<button type="button" class="btn" data-a="comecar">Começar</button>';
  }

  function porPessoa() {
    var r = rendaNum(), n = Math.max(1, pessoas());
    return r > 0 ? 'Dá cerca de ' + fmt(r / n) + ' por pessoa.' : 'Se ninguém tem renda agora, deixe em branco.';
  }

  function telaPergunta() {
    var q = QS[s.qi], total = QS.length;
    var h = topo() +
      '<div class="prog"><div>Pergunta ' + (s.qi + 1) + ' de ' + total + '</div><div class="bar"><div id="barra"></div></div></div>' +
      '<h2 class="h2" id="perg">' + esc(q.pergunta) + '</h2>' + (q.ajuda ? '<p class="ajuda">' + esc(q.ajuda) + '</p>' : '');
    if (q.tipo === 'um') {
      h += '<div class="opts" role="group" aria-labelledby="perg">' + q.opcoes.map(function (o, i) { return '<button type="button" class="opt" data-a="um" data-i="' + i + '">' + esc(o.label) + '</button>'; }).join('') + '</div>';
    } else if (q.tipo === 'grupos') {
      var tp = pessoas();
      h += '<div class="opts">' + GRUPOS.map(function (g) {
        return '<div class="grupo"><div class="lbl">' + esc(g.label) + '</div>' +
          '<button type="button" class="step" data-a="menos" data-k="' + g.k + '" aria-label="Tirar uma pessoa: ' + esc(g.label) + '">' + I.menos + '</button>' +
          '<div class="num">' + s.grupos[g.k] + '</div>' +
          '<button type="button" class="step mais" data-a="mais" data-k="' + g.k + '" aria-label="Adicionar uma pessoa: ' + esc(g.label) + '">' + I.mais + '</button></div>';
      }).join('') + '</div>' +
        '<div class="total">' + (tp === 0 ? 'Adicione pelo menos 1 pessoa.' : 'Total: ' + tp + (tp === 1 ? ' pessoa' : ' pessoas')) + '</div>' +
        '<button type="button" class="btn" data-a="continuar" aria-disabled="' + (tp === 0) + '">Continuar</button>';
    } else if (q.tipo === 'renda') {
      h += '<label class="rotulo" for="renda">Valor por mês, em reais</label>' +
        '<div class="campo"><span>R$</span><input id="renda" type="text" inputmode="numeric" autocomplete="off" maxlength="6" placeholder="0" value="' + esc(s.renda) + '"></div>' +
        '<div class="total" id="porpessoa">' + esc(porPessoa()) + '</div>' +
        '<button type="button" class="btn" data-a="continuar">Continuar</button>';
    } else {
      var marc = s[q.key], tem = marc.length > 0, bloq = !q.ultima && !tem;
      h += '<div class="opts" role="group" aria-labelledby="perg">' + q.opcoes.map(function (o, i) {
        return '<button type="button" class="opt" data-a="varios" data-i="' + i + '" aria-pressed="' + (marc.indexOf(o.v) >= 0) + '"><span class="box">' + I.okp + '</span><span>' + esc(o.label) + '</span></button>';
      }).join('') + '</div>' +
        '<button type="button" class="btn" data-a="continuar" aria-disabled="' + bloq + '">' + (q.ultima ? (tem ? 'Ver resultado' : 'Nenhuma, ver resultado') : (tem ? 'Continuar' : 'Marque pelo menos uma')) + '</button>';
    }
    return h + '<div class="grow"></div><button type="button" class="link" data-a="voltar">Voltar</button>';
  }

  function mensagem(r, titulo, precisaCad) {
    var m = titulo + '.\n';
    if (r.dinheiro > 0) m += 'Ajuda em dinheiro estimada: cerca de ' + fmt(r.dinheiro) + ' por mês.\n';
    if (precisaCad) m += '\nCOMECE POR AQUI: fazer o Cadastro Único no CRAS (é de graça).\n';
    r.cats.forEach(function (c) { m += '\n' + c.nome.toUpperCase() + '\n'; c.itens.forEach(function (it) { m += '• ' + it.nome + ': ' + it.valor + ' (' + CHIP[it.nivel] + '). ' + it.onde + '\n'; }); });
    if (precisaCad) m += '\nLevar ao CRAS: RG ou certidão e CPF de todos, comprovante de endereço, carteira de trabalho se tiver.\n';
    return m + '\nValores estimados. Quem confirma é o CRAS. É de graça: ninguém pode cobrar por isso.';
  }

  function telaResultado() {
    var r = resultado(), total = r.prov + r.perg, fam = s.quem === 'eu' ? 'Sua família' : 'Essa família';
    var titulo = total > 0 ? fam + ' pode ter ' + total + (total === 1 ? ' direito' : ' direitos') : 'Não encontramos direitos com essas respostas';
    var precisaCad = s.cad !== 'sim' && r.baixa && total > 0;
    var h = topo() + '<section class="card"><div class="eyebrow">RESULTADO</div><h2 class="h2">' + esc(titulo) + '</h2>';
    if (r.dinheiro > 0) h += '<div class="dinheiro"><small>Ajuda em dinheiro, estimada</small><b>cerca de ' + fmt(r.dinheiro) + ' por mês</b><small>mais os descontos e serviços abaixo</small></div>';
    if (total > 0) h += '<div class="ajuda">' + r.prov + ' provável(is) · ' + r.perg + ' para perguntar</div>';
    h += '<button type="button" class="ouvir" data-a="ouvir">' + I.som + (s.ouvindo ? 'Áudio em breve nesta versão' : 'Ouvir o resultado em áudio') + '</button></section>';
    if (precisaCad) h += '<section class="comece"><div class="eyebrow">COMECE POR AQUI</div><b>Fazer o Cadastro Único no CRAS</b><div>É de graça e abre a porta para quase todos os direitos abaixo.</div></section>';
    if (s.cad === 'sim' && total > 0) h += '<div class="nota"><strong>O Cadastro Único já está feito.</strong> Atualize os dados no CRAS pelo menos a cada 2 anos, ou quando algo mudar, para não perder os benefícios.</div>';
    r.cats.forEach(function (c) {
      h += '<section class="cat"><h3>' + esc(c.nome) + '</h3>' + c.itens.map(function (it) {
        return '<article class="dir"><div class="dir-top"><div class="dir-nome">' + esc(it.nome) + '</div><div class="chip ' + it.nivel + '">' + CHIP[it.nivel] + '</div></div>' +
          '<div class="valor">' + esc(it.valor) + '</div><p>' + esc(it.texto) + '</p>' +
          (it.lista ? '<div class="lista">' + it.lista.map(function (l) { return '<div><b>' + esc(l.doenca) + '</b><span>' + esc(l.remedios) + '</span></div>'; }).join('') + '</div>' : '') +
          '<div class="onde">' + I.seta + '<div>' + esc(it.onde) + '</div></div></article>';
      }).join('') + '</section>';
    });
    if (total === 0) h += '<div class="dir"><p>Isso não quer dizer que não exista nenhum. Uma conversa no CRAS pode mostrar outros caminhos.</p></div>';
    if (precisaCad) h += '<section class="card"><h3 class="h3">Levar ao CRAS</h3><div class="docs">' +
      ['RG ou certidão de nascimento e CPF de todos da casa', 'Comprovante de endereço (pode ser a conta de luz)', 'Carteira de trabalho, se tiver'].map(function (t) { return '<div class="doc">' + I.doc + '<div>' + t + '</div></div>'; }).join('') + '</div></section>';
    h += cartaoFeedback(r);
    h += '<a class="btn" target="_blank" rel="noopener noreferrer" href="https://wa.me/?text=' + encodeURIComponent(mensagem(r, titulo, precisaCad)) + '">' + I.zap + 'Enviar resumo pelo WhatsApp</a>' +
      '<button type="button" class="link" data-a="recomecar">Fazer outra consulta</button>' +
      '<p class="rodape">Valores estimados, não garantidos. Quando um benefício novo entra, a renda da família muda e os outros valores podem mudar também. Quem confirma é o CRAS ou o órgão oficial, sempre de graça.<br>Regras conferidas em ' + esc(R.conferido_em) + '.</p>';
    return h;
  }

  /* ---------- Feedback: "Este guia te ajudou?" ----------
     Envia só: sim/não, nomes das ajudas que apareceram, número de pessoas e a data das regras.
     Nada que identifique quem respondeu. Se não houver internet, guarda e tenta de novo depois. */
  var PEND = 'guia_feedback_pendente';
  var ultimoResultado = null;

  function cartaoFeedback(r) {
    ultimoResultado = r;
    if (s.voto) {
      return '<section class="card feedback obrigado" aria-live="polite"><div class="fb-titulo">Obrigada!</div>' +
        '<p>Sua resposta ajuda a melhorar o guia.</p></section>';
    }
    return '<section class="card feedback"><h3 class="fb-titulo" id="fbq">Este guia te ajudou?</h3>' +
      '<div class="fb-botoes" role="group" aria-labelledby="fbq">' +
      '<button type="button" class="fb sim" data-a="voto" data-v="sim">' + I.feliz + '<span>Sim, ajudou</span></button>' +
      '<button type="button" class="fb nao" data-a="voto" data-v="nao">' + I.triste + '<span>Não ajudou</span></button>' +
      '</div></section>';
  }

  function dadosFeedback(voto, r) {
    var nomes = [];
    (r ? r.cats : []).forEach(function (c) { c.itens.forEach(function (it) { nomes.push(it.nome + ' (' + CHIP[it.nivel] + ')'); }); });
    return { voto: voto, beneficios: nomes.slice(0, 15), pessoas: Math.max(1, pessoas()), versao: String(R && R.conferido_em || '') };
  }

  function enviar(dados) {
    if (!/^https?:$/.test(location.protocol) || !window.fetch) return Promise.reject(new Error('offline'));
    return fetch('/api/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dados), keepalive: true })
      .then(function (resp) { if (!resp.ok && resp.status !== 429) throw new Error('HTTP ' + resp.status); });
  }

  function guardarPendente(dados) {
    try {
      var lista = JSON.parse(localStorage.getItem(PEND) || '[]');
      lista.push(dados);
      localStorage.setItem(PEND, JSON.stringify(lista.slice(-10)));
    } catch (e) { /* sem armazenamento: tudo bem, a resposta só não é reenviada */ }
  }

  function reenviarPendentes() {
    var lista;
    try { lista = JSON.parse(localStorage.getItem(PEND) || '[]'); } catch (e) { return; }
    if (!lista.length) return;
    try { localStorage.removeItem(PEND); } catch (e) { return; }
    lista.forEach(function (d) { enviar(d).catch(function () { guardarPendente(d); }); });
  }

  function rodape() {
    return '<footer class="rodape-links"><button type="button" class="link-sobre" data-a="sobre">Sobre o Guia de Direitos</button></footer>';
  }

  function telaSobre() {
    var chips = [
      { n: 'prov', t: 'Pelas respostas, a família parece se encaixar nas regras.' },
      { n: 'perg', t: 'Pode ter direito, mas depende de detalhes. Vale perguntar no CRAS.' },
      { n: 'pensar', t: 'Não é um benefício, mas é algo importante para a família saber.' }
    ];
    return topo() +
      '<section class="card sobre"><h1 class="h1">Sobre o Guia de Direitos</h1>' +
      '<p class="lead">Um guia gratuito que ajuda famílias a descobrir quais ajudas do governo podem ter, quanto elas valem e por onde começar.</p></section>' +

      '<section class="card sobre"><h2 class="h3">Para quem é</h2>' +
      '<p>Para famílias que querem conferir seus direitos, e para quem ajuda: voluntárias e voluntários, vizinhos, agentes de saúde e parentes.</p></section>' +

      '<section class="card sobre"><h2 class="h3">Como funciona</h2>' +
      '<p>Você responde 6 perguntas sobre a casa. O guia compara as respostas com as regras dos programas e mostra o resultado com uma destas etiquetas:</p>' +
      '<div class="legenda">' + chips.map(function (c) { return '<div class="leg"><div class="chip ' + c.n + '">' + CHIP[c.n] + '</div><p>' + c.t + '</p></div>'; }).join('') + '</div></section>' +

      '<section class="card sobre"><h2 class="h3">Seus dados</h2>' +
      '<p>Não pedimos nome, CPF nem documento. As respostas ficam só neste celular e não são guardadas nem enviadas para ninguém. Quando você fecha a página, elas somem.</p>' +
      '<p>O resumo só vai para o WhatsApp se você tocar no botão e escolher para quem mandar.</p>' +
      '<p>Se você responder se o guia ajudou, guardamos só a resposta (sim ou não), quais ajudas apareceram e quantas pessoas moram na casa. Nada que identifique você.</p></section>' +

      '<section class="card sobre aviso"><h2 class="h3">Importante</h2>' +
      '<p>Este é um projeto independente e voluntário. <strong>Não é um site do governo</strong> e não substitui o atendimento do CRAS ou do INSS.</p>' +
      '<p>O resultado é uma orientação, não uma garantia. Quem confirma se a família tem direito é sempre o órgão oficial.</p>' +
      '<p><strong>Todos esses serviços são gratuitos.</strong> Se alguém pedir dinheiro para fazer cadastro ou liberar benefício, é golpe.</p></section>' +

      '<section class="card sobre"><h2 class="h3">De onde vêm as informações</h2>' +
      '<p>Das regras públicas dos programas do governo federal, com o salário mínimo de ' + fmt(R.salario_minimo) + '. Regras conferidas em ' + esc(R.conferido_em) + '.</p>' +
      '<p>As regras mudam de tempos em tempos. Esta é uma versão de teste, e os valores ainda estão sendo conferidos nas fontes oficiais.</p></section>' +

      '<section class="card sobre"><h2 class="h3">Onde buscar ajuda oficial</h2>' +
      '<div class="docs">' +
      '<div class="doc">' + I.seta + '<div><strong>CRAS</strong> mais perto de casa: Cadastro Único e benefícios sociais</div></div>' +
      '<div class="doc">' + I.seta + '<div><strong>121</strong>: Disque Social, do Ministério do Desenvolvimento Social</div></div>' +
      '<div class="doc">' + I.seta + '<div><strong>135</strong>: INSS, para BPC e aposentadoria</div></div>' +
      '</div></section>' +

      '<button type="button" class="btn" data-a="fechar-sobre">Voltar</button>';
  }

  function render(foco) {
    app.innerHTML = s.tela === 'sobre' ? telaSobre() : (s.tela === 'intro' ? telaIntro() : s.tela === 'q' ? telaPergunta() : telaResultado()) + rodape();
    var barra = document.getElementById('barra');
    if (barra) barra.style.width = Math.round((s.qi + 1) / QS.length * 100) + '%';
    var inp = document.getElementById('renda');
    if (inp) inp.addEventListener('input', function () {
      var v = inp.value.replace(/\D/g, '').slice(0, 6);
      if (v !== inp.value) inp.value = v;
      s.renda = v;
      document.getElementById('porpessoa').textContent = porPessoa();
    });
    if (foco) {
      window.scrollTo(0, 0);
      var h = app.querySelector('h1,h2');
      if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
    }
  }
  function avancar() { s.qi++; if (s.qi >= QS.length) s.tela = 'res'; render(true); }

  app.addEventListener('click', function (e) {
    var b = e.target.closest('[data-a]'); if (!b || !R) return;
    var a = b.getAttribute('data-a'), q = QS[s.qi];
    if (a === 'comecar') { s.tela = 'q'; s.qi = 0; render(true); }
    else if (a === 'um') { s[q.key] = q.opcoes[+b.getAttribute('data-i')].v; avancar(); }
    else if (a === 'mais' || a === 'menos') {
      var k = b.getAttribute('data-k');
      if (!Object.prototype.hasOwnProperty.call(s.grupos, k)) return;
      s.grupos[k] = Math.max(0, Math.min(15, s.grupos[k] + (a === 'mais' ? 1 : -1))); render(false);
    }
    else if (a === 'varios') {
      var v = q.opcoes[+b.getAttribute('data-i')].v, arr = s[q.key];
      if (arr.indexOf(v) >= 0) arr = arr.filter(function (x) { return x !== v; });
      else if (v === 'nenhum') arr = ['nenhum'];
      else arr = arr.filter(function (x) { return x !== 'nenhum'; }).concat([v]);
      s[q.key] = arr; render(false);
    }
    else if (a === 'continuar') { if (b.getAttribute('aria-disabled') === 'true') return; avancar(); }
    else if (a === 'voltar') { if (s.qi <= 0) s.tela = 'intro'; else s.qi--; render(true); }
    else if (a === 'ouvir') { s.ouvindo = !s.ouvindo; render(false); }
    else if (a === 'voto') {
      if (s.voto) return;
      var voto = b.getAttribute('data-v') === 'sim' ? 'sim' : 'nao';
      var dados = dadosFeedback(voto, ultimoResultado);
      s.voto = voto; render(false);
      var fb = app.querySelector('.feedback'); if (fb) fb.scrollIntoView({ block: 'nearest' });
      enviar(dados).catch(function () { guardarPendente(dados); });
    }
    else if (a === 'recomecar') { s = novo(); render(true); }
    else if (a === 'sobre') { s.anterior = s.tela; s.tela = 'sobre'; render(true); }
    else if (a === 'fechar-sobre') { s.tela = s.anterior || 'intro'; render(true); }
  });

  // As regras vêm de regras.js (carregado antes deste arquivo). Se ele tiver erro, mostra um aviso em vez de valores errados.
  var dados = window.REGRAS;
  if (dados && Number(dados.salario_minimo) > 0) {
    R = dados; render(false);
    reenviarPendentes();
  } else {
    app.innerHTML = topo() + '<div class="erro" role="alert"><strong>Não foi possível carregar as regras agora.</strong><br>Tente de novo em alguns minutos. Se você cuida do site, confira se o arquivo regras.js está correto.</div>';
    if (window.console) console.error('regras.js não carregou ou está com erro.');
  }
})();
