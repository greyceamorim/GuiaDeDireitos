# Guia de Direitos: como manter o site

## Para que serve este site

Milhões de famílias brasileiras deixam de receber benefícios a que já têm direito. Os direitos existem, mas a informação não chega a quem mais precisa: muita gente tem dificuldade de leitura, usa a internet só pelo crédito do celular e não sabe por onde começar.

Quem mais precisa raramente usa uma ferramenta sozinho. A ajuda costuma vir de alguém de confiança: uma voluntária da igreja, uma vizinha, uma agente de saúde ou um parente. **O Guia de Direitos foi feito para essas pessoas que ajudam, e também para as famílias que querem conferir sozinhas.**

Com 6 perguntas simples sobre a casa, o guia mostra:
- quais benefícios a família **provavelmente** tem e quais **vale perguntar**;
- quanto, mais ou menos, isso dá em dinheiro por mês;
- o primeiro passo, que quase sempre é o **Cadastro Único** no CRAS;
- uma lista única de documentos;
- um resumo para mandar pelo WhatsApp.

Princípios: é de graça e sem cadastro, não pede nem guarda dados pessoais, usa linguagem simples e letras grandes, funciona em celular simples e internet fraca, e é uma orientação, não uma garantia. Quem confirma é sempre o CRAS ou o órgão oficial.

**Situação atual:** versão de teste. Os valores são de 2026, mas ainda estão sendo conferidos nas fontes oficiais do gov.br.

## O que tem nesta pasta

| Arquivo | Para que serve | Precisa mexer? |
|---|---|---|
| `regras.js` | Valores, limites de renda e textos de cada benefício | Sim, quando uma regra mudar |
| `index.html` | A página em si. Abra este para ver o site | Quase nunca |
| `app.js` | As contas e as perguntas | Só para mudar perguntas ou a lógica |
| `style.css` | Cores e letras | Só para mudar o visual |
| `_headers` | Proteções de segurança (vale quando o site está publicado) | Não |
| `functions/api/feedback.js` | Recebe e guarda o "Este guia te ajudou?" | Não |
| `banco/criar-tabelas.sql` | Cria o banco do feedback (usar uma vez) | Não |
| `banco/consultas.sql` | Consultas prontas para ver o feedback | Não |
| `LEIA-ME.md` | Este guia | Não |
| `README.md` | Este guia em inglês (aparece na página do GitHub) | Não |

Para testar no computador, é só dar dois cliques no `index.html`.

## Como atualizar uma regra

1. Abra o `regras.js` num editor de texto simples (Bloco de Notas, TextEdit em modo texto ou VS Code). Não use o Word.
2. Mude só o número ou o texto entre aspas. Exemplo, quando o salário mínimo mudar:
   `"salario_minimo": 1621,` vira `"salario_minimo": 1700,`
3. Atualize a data: `"conferido_em": "19/10/2026",`
4. Salve e abra o `index.html` para conferir. Se aparecer "Não foi possível carregar as regras", alguma vírgula, aspa ou chave foi apagada sem querer: desfaça a última mudança.
5. Publique (veja abaixo).

Cuidados:
- Não apague a primeira linha `window.REGRAS = {` nem o `};` do final.
- Não apague vírgulas, aspas nem chaves `{ }`.
- Nos textos, palavras entre chaves, como `{kwh}` ou `{sm}`, são trocadas por números automaticamente. Pode mudar a frase em volta, mas mantenha a palavra entre chaves.
- Para esconder um benefício sem apagar, troque `"ativo": true` por `"ativo": false`.

## O que depende do salário mínimo

Mudando só `salario_minimo`, estes limites se atualizam sozinhos:
- BPC: até 1/4 do salário mínimo por pessoa (`fracao_salario_minimo_provavel: 0.25`)
- Tarifa Social de luz, Pé-de-Meia e isenção: até 1/2 (`0.5`)
- Desconto Social de luz e Passe Livre: até 1 salário mínimo (`1`)

O Bolsa Família tem valores fixos em reais. Esses precisam ser conferidos à parte.

## Rotina sugerida

- **Janeiro:** salário mínimo novo. Revisar tudo.
- **Todo mês (cerca de 1 hora):** abrir as fontes oficiais de cada benefício (campo `fonte_oficial_a_conferir`) e comparar.
- **Alertas grátis no Google Alertas:** "Bolsa Família novo valor", "BPC nova regra", "tarifa social mudança", "Farmácia Popular novos medicamentos".

Antes de divulgar amplamente, troque cada `fonte` (hoje são sites de notícia) pelo link da página oficial no gov.br.

## Como publicar no Cloudflare Pages com o GitHub

1. Crie uma conta grátis no GitHub e uma no Cloudflare. **Ative a verificação em duas etapas nas duas.**
2. No GitHub, crie um repositório (pode ser privado) e envie os arquivos desta pasta.
3. No Cloudflare, vá em Workers & Pages › Create › Pages › Connect to Git e escolha o repositório.
4. Em "Build settings", deixe o comando de build vazio e a pasta de saída como `/`.
5. Pronto: cada vez que você editar o `regras.js` no GitHub e salvar, o site se atualiza sozinho.

O `_headers` também funciona no Netlify, se preferir usar ele.

## Feedback: "Este guia te ajudou?"

No fim do resultado aparecem dois rostos: **Sim, ajudou** e **Não ajudou**. Um toque envia e aparece "Obrigada!".

O que é guardado: sim ou não, os nomes das ajudas que apareceram, quantas pessoas moram na casa, a data das regras e a data da resposta. **Nada que identifique a pessoa.** O IP não é guardado: só uma versão embaralhada dele, apagada no dia seguinte, para bloquear quem tenta mandar mais de 20 respostas por dia.

As respostas ficam num banco de dados gratuito da própria Cloudflare (D1). O plano grátis aguenta muito mais acessos do que o guia vai ter.

### Configurar (uma vez, uns 10 minutos)

Faça os passos 1 a 3 **antes** de enviar os arquivos novos para o GitHub.

1. **Criar o banco.** No painel da Cloudflare, abra **Storage & Databases › D1 SQL Database › Create**. Nome: `guia-feedback`. Clique em **Create**.
2. **Criar as tabelas.** Dentro do banco, abra a aba **Console**, cole todo o texto de `banco/criar-tabelas.sql` e clique em **Execute**.
3. **Ligar o banco ao site.** Abra **Workers & Pages ›** seu projeto **› Settings › Bindings › Add › D1 database**.
   - Variable name: `DB` (exatamente assim, em maiúsculas)
   - D1 database: `guia-feedback`
   - Clique em **Save**.
4. **(Opcional, mais segurança)** Em **Settings › Variables and Secrets**, adicione um segredo chamado `SAL` com qualquer frase longa e aleatória.
5. **Enviar os arquivos.** No GitHub, envie o `app.js`, o `style.css` e as pastas `functions` e `banco` (dá para arrastar as pastas no Chrome). Clique em **Commit changes**. A Cloudflare publica de novo sozinha.
6. **Testar.** Abra o site, faça uma consulta e toque num rosto. No Console do banco, rode `SELECT * FROM feedback;`. Sua resposta deve aparecer.

Se o banco não estiver ligado, o site continua funcionando normalmente. O rosto agradece, e a resposta só não é guardada.

### Ver as respostas

No **Console** do banco D1, cole uma das consultas de `banco/consultas.sql`, por exemplo:
- quantos disseram sim e não;
- o percentual de "sim";
- as últimas respostas "não ajudou", com as ajudas que apareceram. Isso mostra onde o guia confunde.

Boa prática de privacidade: uma vez por ano, apague as respostas antigas (a última consulta do arquivo).

## Segurança: o que já está feito

- **Sem login e sem dados pessoais.** As respostas das perguntas ficam só no celular e somem ao fechar a página. O único dado guardado é o "ajudou ou não", anônimo. Não há dados pessoais para roubar.
- **Política de conteúdo (CSP)** no `_headers`: o navegador só aceita código deste site e a fonte do Google. Isso bloqueia a maioria das tentativas de injetar código.
- **Textos tratados:** todo texto do `regras.js` é exibido como texto puro, nunca como código.
- **Proteção contra a página ser embutida** em sites falsos (`frame-ancestors 'none'`).
- **HTTPS obrigatório**, sem acesso a câmera, microfone ou localização.

## Segurança: o que depende de você

O maior risco num site assim não é invadirem o servidor, e sim alguém entrar nas suas contas e trocar os textos.
- Verificação em duas etapas no GitHub, no Cloudflare e no Registro.br (se comprar domínio).
- Senhas diferentes em cada um, de preferência num gerenciador de senhas.
- No GitHub, só você com permissão de editar.
- Fique atenta a cópias falsas do site que peçam pagamento. O site sempre diz que tudo é gratuito; divulgue o endereço oficial.
