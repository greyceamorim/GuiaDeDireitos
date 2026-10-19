# Guia de Direitos

**A free, plain-language tool that helps low-income Brazilian families find out which social benefits they may be entitled to, what each is worth, and where to start.**

## Purpose

Millions of Brazilian families miss out on benefits they already qualify for. The rights exist, but the information does not reach the people who need it most:

- **Reading:** 29% of Brazilians aged 15 to 64 are functionally illiterate, rising to 51% among those aged 50 to 64 (Inaf 2024).
- **Mobile data:** most low-income households reach the internet only through prepaid mobile data that often runs out (TIC Domicílios 2025).
- **Unclaimed rights:** 60% of Brazilians say they have missed a right or benefit because they did not know what to do (Ipsos/Jusbrasil). Around 7.9 million eligible families were not receiving the social electricity tariff (Aneel, 2024).

The people most excluded rarely use a digital tool on their own. Help usually comes through someone they trust: a church volunteer, a neighbour, a community health worker or a relative. **Guia de Direitos is designed for those helpers, and for families who can check for themselves.**

In six simple questions about the household, the guide shows:

- which benefits the family is **likely** to receive, and which are **worth asking about**
- an estimated monthly amount of financial support
- the first step, usually registering on the **Cadastro Único** at the local CRAS
- one list of documents to take
- a summary that can be sent by WhatsApp

It covers income support (Bolsa Família, BPC, Gás do Povo), discounts (electricity, inter-state travel), health (Farmácia Popular), education (Pé-de-Meia, exam fee exemptions) and work (wage bonus, INSS protection).

## Principles

- **Free, with no registration.** No names, ID numbers or personal data are asked for or stored. Answers stay on the user's phone and disappear when the page is closed.
- **Plain Portuguese.** Large text, big buttons, short sentences and a typeface designed for readability.
- **Light.** Works on basic smartphones and slow connections.
- **Guidance, not a guarantee.** Results are estimates. Eligibility is always confirmed by the CRAS or the relevant public body, and the site states clearly that these services are free, to help protect people from scams.

## Status

**Test version.** Rules and amounts reflect 2026 (minimum wage R$ 1,621) but are still being checked against official gov.br sources. Several source links currently point to news sites and must be replaced with official pages before wider release.

## Files

| File | Purpose | Edit? |
|---|---|---|
| `regras.js` | Amounts, income thresholds and text for every benefit | Yes, when a rule changes |
| `index.html` | The page itself. Open it to view the site | Rarely |
| `app.js` | Questions and calculations | Only to change questions or logic |
| `style.css` | Colours and typography | Only to change the look |
| `_headers` | Security headers (apply once the site is hosted) | No |
| `functions/api/feedback.js` | Receives and stores "Did this guide help?" | No |
| `banco/criar-tabelas.sql` | Creates the feedback database (run once) | No |
| `banco/consultas.sql` | Ready-made queries to read feedback | No |
| `README.md` | This guide (shown on the GitHub page) | No |
| `LEIA-ME.md` | The same guide in Portuguese | No |

To test locally, double-click `index.html`.

## Updating a rule

1. Open `regras.js` in a plain-text editor (Notepad, TextEdit in plain-text mode or VS Code), or on GitHub click the file and then the pencil icon.
2. Change only the number or the text inside quotation marks, e.g. `"salario_minimo": 1621,` becomes `"salario_minimo": 1700,`.
3. Update the review date: `"conferido_em": "19/10/2026",`.
4. Save (on GitHub: **Commit changes**). With Cloudflare Pages connected, the site updates itself in about a minute.
5. If the site shows "Não foi possível carregar as regras", a comma, quote mark or bracket was removed by mistake. Undo the last change.

Notes:
- Do not delete the first line `window.REGRAS = {` or the final `};`.
- Words in braces inside the text, such as `{kwh}` or `{sm}`, are replaced automatically by values. Reword the sentence freely, but keep the braced word.
- To hide a benefit without deleting it, change `"ativo": true` to `"ativo": false`.

### What depends on the minimum wage

Changing `salario_minimo` updates these thresholds automatically:
- BPC: up to 1/4 of the minimum wage per person
- Social electricity tariff, Pé-de-Meia and exam fee exemption: up to 1/2
- Social electricity discount and Passe Livre: up to 1 minimum wage

Bolsa Família amounts are fixed in reais and must be checked separately.

## Maintenance routine

- **January:** new minimum wage. Review everything.
- **Monthly (about an hour):** check each benefit against its official source (`fonte_oficial_a_conferir` field).
- **Free Google Alerts** for terms such as "Bolsa Família novo valor", "BPC nova regra", "tarifa social mudança" and "Farmácia Popular novos medicamentos".

## Hosting on Cloudflare Pages via GitHub

1. Push these files to a GitHub repository (private is fine).
2. In Cloudflare: **Workers & Pages › Create › Pages › Connect to Git**, then select the repository.
3. Framework preset: **None**. Leave the build command and output directory empty.
4. **Save and Deploy.** Every commit to the repository publishes automatically.

`_headers` also works on Netlify.

## Feedback: "Este guia te ajudou?"

The results screen ends with two faces, **Sim, ajudou** (yes, it helped) and **Não ajudou** (it didn't). One tap sends the answer and shows a thank-you message.

Stored: yes/no, the names of the benefits shown, household size, the rules version and the date. **Nothing that identifies the person.** IP addresses are not stored; a salted daily hash is used only to cap submissions at 20 per connection per day, and it is deleted the next day.

Answers are stored in Cloudflare D1 (free tier, far above expected usage) via a Pages Function.

### Set-up (once, about 10 minutes)

Complete steps 1 to 3 **before** pushing the new files.

1. **Create the database.** Cloudflare dashboard › **Storage & Databases › D1 SQL Database › Create**. Name: `guia-feedback`.
2. **Create the tables.** Open the database › **Console**, paste `banco/criar-tabelas.sql` and click **Execute**.
3. **Bind it to the site.** **Workers & Pages ›** your project **› Settings › Bindings › Add › D1 database**. Variable name: `DB`; database: `guia-feedback`. Save.
4. **(Optional)** **Settings › Variables and Secrets**: add a secret named `SAL` with a long random phrase.
5. **Push the files** (`app.js`, `style.css`, `functions/`, `banco/`). Cloudflare redeploys automatically.
6. **Test.** Complete a check on the site, tap a face, then run `SELECT * FROM feedback;` in the D1 Console.

If the database is not bound, the site still works; the answer simply isn't stored.

### Reading the results

Paste any query from `banco/consultas.sql` into the D1 Console: yes/no counts, the percentage of "yes", daily totals, and the latest "didn't help" answers with the benefits shown, which point to what is confusing. Delete answers older than a year as good privacy practice (last query in the file).

## Security

Already in place:
- No login and no personal data collected, so there is no user data to steal. The only stored data is the anonymous yes/no feedback.
- A Content Security Policy that only allows this site's own code and Google Fonts.
- All text from `regras.js` is rendered as plain text, never as code.
- The page cannot be embedded in other sites; HTTPS is enforced; camera, microphone and location are disabled.

The owner's responsibility:
- Two-factor authentication on GitHub, Cloudflare and Registro.br (if a domain is bought).
- Unique passwords, ideally in a password manager.
- Only the owner has write access to the repository.
- Watch for fake copies of the site asking for payment, and always promote the official address.
