/* Recebe o "Este guia te ajudou?" e guarda no banco D1 da Cloudflare.
   Precisa de um banco D1 ligado ao projeto com o nome (binding) DB. Veja o passo a passo no LEIA-ME.

   O que é guardado: sim/não, os nomes das ajudas que apareceram, quantas pessoas moram na casa,
   a data das regras e a data da resposta. Nenhum dado que identifique a pessoa.
   O endereço de internet (IP) NÃO é guardado: só uma "impressão" embaralhada dele, válida por um dia,
   para limitar quem tenta mandar respostas demais. */

const LIMITE_POR_DIA = 20;

const json = (dados, status = 200) =>
  new Response(JSON.stringify(dados), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }
  });

async function impressao(texto) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto));
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function limpaTexto(t, max) {
  return String(t).replace(/[\u0000-\u001f\u007f<>]/g, '').trim().slice(0, max);
}

export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ ok: false, erro: 'banco não configurado' }, 503);

  // Só aceita envios vindos do próprio site.
  const origem = request.headers.get('Origin');
  if (origem && new URL(origem).host !== new URL(request.url).host) return json({ ok: false }, 403);

  if (!(request.headers.get('Content-Type') || '').includes('application/json')) return json({ ok: false }, 415);
  const texto = await request.text();
  if (texto.length > 3000) return json({ ok: false }, 413);

  let corpo;
  try { corpo = JSON.parse(texto); } catch { return json({ ok: false }, 400); }

  const voto = corpo && corpo.voto;
  if (voto !== 'sim' && voto !== 'nao') return json({ ok: false }, 400);

  const beneficios = Array.isArray(corpo.beneficios)
    ? corpo.beneficios.filter((b) => typeof b === 'string').slice(0, 15).map((b) => limpaTexto(b, 80)).filter(Boolean).join(' | ')
    : '';
  const pessoas = Number.isInteger(corpo.pessoas) && corpo.pessoas >= 1 && corpo.pessoas <= 90 ? corpo.pessoas : null;
  const versao = typeof corpo.versao === 'string' ? limpaTexto(corpo.versao, 20) : '';

  // Limite anti-spam: no máximo LIMITE_POR_DIA respostas por conexão por dia.
  const dia = new Date().toISOString().slice(0, 10);
  const ip = request.headers.get('CF-Connecting-IP') || 'desconhecido';
  const chave = await impressao(ip + '|' + dia + '|' + (env.SAL || 'guia-de-direitos'));

  const linha = await env.DB.prepare(
    'INSERT INTO limites (chave, dia, n) VALUES (?1, ?2, 1) ON CONFLICT(chave) DO UPDATE SET n = n + 1 RETURNING n'
  ).bind(chave, dia).first();
  if (linha && linha.n > LIMITE_POR_DIA) return json({ ok: false, erro: 'muitas respostas' }, 429);

  await env.DB.batch([
    env.DB.prepare('INSERT INTO feedback (voto, beneficios, pessoas, versao_regras) VALUES (?1, ?2, ?3, ?4)').bind(voto, beneficios, pessoas, versao),
    env.DB.prepare('DELETE FROM limites WHERE dia < ?1').bind(dia)
  ]);

  return json({ ok: true });
}

export async function onRequest() {
  return json({ ok: false, erro: 'use POST' }, 405);
}
