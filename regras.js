/* REGRAS DO GUIA DE DIREITOS
   Edite só os valores e textos. Não apague a primeira linha (window.REGRAS =) nem o ponto e vírgula do final. */
window.REGRAS = {
  "_como_editar": "Mude só os números e textos entre aspas. Não apague vírgulas, aspas ou chaves. Depois de mudar, atualize 'conferido_em'. Nos textos, {palavra} é trocado automaticamente por um valor.",
  "conferido_em": "19/10/2026",
  "salario_minimo": 1621,

  "bolsa_familia": {
    "ativo": true,
    "nome": "Bolsa Família",
    "limite_renda_por_pessoa": 218,
    "minimo_por_familia": 600,
    "valor_por_pessoa": 142,
    "adicional_crianca_0_a_6": 150,
    "adicional_7_a_17_ou_gestante": 50,
    "valor": "cerca de {total} por mês",
    "texto": "Mínimo de {minimo} por família. Já inclui {partes}. Exige criança na escola e vacina em dia.",
    "onde": "Vem pelo Cadastro Único, pago pela Caixa (app Caixa Tem).",
    "fonte": "https://www.guardardinheiro.com.br/blog/bolsa-familia-valor-quem-tem-direito",
    "fonte_oficial_a_conferir": "gov.br/mds"
  },

  "bpc": {
    "ativo": true,
    "nome": "BPC",
    "idade_minima": 65,
    "fracao_salario_minimo_provavel": 0.25,
    "fracao_salario_minimo_vale_perguntar": 0.5,
    "valor": "{sm} por mês",
    "valor_perguntar": "{sm} por mês, se aprovado",
    "texto": "Para quem tem {idade} anos ou mais ou tem deficiência. Não precisa ter contribuído ao INSS. A deficiência passa por avaliação do INSS.",
    "texto_perguntar": "A regra pede renda de até {limite} por pessoa, mas alguns gastos e rendas podem não entrar na conta.",
    "onde": "Pedido no INSS pelo telefone 135 ou no Meu INSS, com o Cadastro Único atualizado.",
    "onde_perguntar": "Pergunte no CRAS se vale fazer o pedido.",
    "fonte": "https://oantagonista.com.br/brasil/bpc-em-2026-quem-realmente-tem-direito-ao-beneficio-de-um-salario-minimo-e-onde-muita-gente-se-confunde/",
    "fonte_oficial_a_conferir": "gov.br/inss"
  },

  "gas_do_povo": {
    "ativo": true,
    "nome": "Gás do Povo",
    "minimo_de_pessoas": 2,
    "botijoes_ate_3_pessoas": 4,
    "botijoes_4_ou_mais": 6,
    "valor": "{botijoes} botijões de gás por ano",
    "texto": "Vale para trocar o botijão vazio de 13 kg em revenda credenciada. Para famílias do Bolsa Família com 2 pessoas ou mais.",
    "onde": "Consulte pelo CPF no app Gás do Povo ou no telefone 121.",
    "fonte": "https://www.serasa.com.br/renda-extra/gas-do-povo-quem-tem-direito/",
    "fonte_oficial_a_conferir": "gasdopovo.mds.gov.br"
  },

  "tarifa_social_luz": {
    "ativo": true,
    "nome": "Tarifa Social de luz",
    "fracao_salario_minimo": 0.5,
    "kwh_gratis": 80,
    "valor": "Conta de graça até {kwh} kWh por mês",
    "texto": "O que passar de {kwh} kWh é cobrado normalmente. A conta precisa estar no nome de alguém da família.",
    "onde": "Vem pelo Cadastro Único, direto na conta de luz.",
    "fonte": "https://www.patrimo.app/blog/tarifa-social-energia-2026-quem-tem-direito",
    "fonte_oficial_a_conferir": "gov.br/aneel"
  },

  "desconto_social_luz": {
    "ativo": true,
    "nome": "Desconto Social de luz",
    "fracao_salario_minimo": 1,
    "kwh_com_desconto": 120,
    "valor": "Conta mais barata até {kwh} kWh por mês",
    "texto": "Desconto para renda entre {de} e {ate} por pessoa. O valor depende da companhia de luz.",
    "onde": "Vem pelo Cadastro Único, direto na conta de luz.",
    "fonte": "https://www.patrimo.app/blog/tarifa-social-energia-2026-quem-tem-direito",
    "fonte_oficial_a_conferir": "gov.br/aneel"
  },

  "onibus_idoso": {
    "ativo": true,
    "nome": "Viagem de ônibus para idosos",
    "idade_minima": 60,
    "valor": "2 vagas grátis por ônibus, ou 50% de desconto",
    "texto": "Em viagens de ônibus entre estados, para quem tem {idade} anos ou mais e renda de até 2 salários mínimos.",
    "onde": "Peça a Carteira da Pessoa Idosa no CRAS.",
    "fonte": "",
    "fonte_oficial_a_conferir": "gov.br/mds"
  },

  "passe_livre": {
    "ativo": true,
    "nome": "Passe Livre",
    "fracao_salario_minimo": 1,
    "valor": "Viagem grátis entre estados",
    "texto": "Para pessoa com deficiência de família com renda baixa, em ônibus, trem e barco.",
    "onde": "Informações no CRAS.",
    "fonte": "",
    "fonte_oficial_a_conferir": "gov.br/transportes"
  },

  "farmacia_popular": {
    "ativo": true,
    "nome": "Farmácia Popular",
    "total_de_itens": 41,
    "valor": "Remédios de graça",
    "texto": "São {itens} itens, todos gratuitos. Não precisa de Cadastro Único. Veja se o remédio está na lista:",
    "onde": "Farmácia com o selo “Aqui Tem Farmácia Popular”. Leve receita (vale 180 dias), documento com foto e CPF.",
    "lista": [
      { "doenca": "Pressão alta", "remedios": "losartana, captopril, enalapril, anlodipino, atenolol, hidroclorotiazida e outros" },
      { "doenca": "Diabetes", "remedios": "metformina, glibenclamida, dapagliflozina e insulina" },
      { "doenca": "Asma", "remedios": "salbutamol, beclometasona, ipratrópio" },
      { "doenca": "Rinite", "remedios": "budesonida, beclometasona" },
      { "doenca": "Colesterol alto", "remedios": "sinvastatina" },
      { "doenca": "Osteoporose", "remedios": "alendronato" },
      { "doenca": "Glaucoma", "remedios": "timolol" },
      { "doenca": "Parkinson", "remedios": "levodopa com carbidopa ou com benserazida" },
      { "doenca": "Anticoncepcional", "remedios": "4 opções, incluindo injeção" }
    ],
    "fralda_idade_minima": 60,
    "fralda_item": { "doenca": "Fralda geriátrica", "remedios": "para quem tem 60 anos ou mais ou tem deficiência, com receita ou laudo" },
    "fralda_nome": "Fralda geriátrica de graça",
    "fralda_valor": "Grátis pela Farmácia Popular",
    "fralda_texto": "Para quem tem 60 anos ou mais ou tem deficiência e precisa de fralda.",
    "fralda_onde": "Leve receita ou laudo, documento com foto e CPF a uma farmácia credenciada.",
    "fonte": "https://meutudo.com.br/blog/lista-remedios-farmacia-popular-2025/",
    "fonte_oficial_a_conferir": "gov.br/saude"
  },

  "pe_de_meia": {
    "ativo": true,
    "nome": "Pé-de-Meia",
    "fracao_salario_minimo": 0.5,
    "valor": "R$ 200 por mês + R$ 1.000 por ano concluído",
    "texto": "Até R$ 9.200 nos 3 anos do ensino médio. Precisa de 80% de presença nas aulas. Os R$ 1.000 ficam guardados até a formatura.",
    "onde": "Não precisa se inscrever: vem pela escola e pelo Cadastro Único.",
    "fonte": "https://blogdoenem.com.br/qual-o-calendario-do-pe-de-meia-em-2026/",
    "fonte_oficial_a_conferir": "gov.br/mec"
  },

  "isencao_enem_concursos": {
    "ativo": true,
    "nome": "Isenção da taxa do ENEM e de concursos",
    "fracao_salario_minimo": 0.5,
    "valor": "Inscrição sem pagar a taxa",
    "texto": "Para quem está no último ano em escola pública ou é de família de baixa renda no Cadastro Único.",
    "onde": "Na hora da inscrição, peça a isenção e tenha o número do NIS em mãos.",
    "fonte": "",
    "fonte_oficial_a_conferir": "gov.br/inep"
  },

  "abono_salarial": {
    "ativo": true,
    "nome": "Abono salarial (PIS)",
    "valor": "Até {sm} por ano",
    "texto": "Para quem trabalha de carteira assinada, ganha pouco e tem o PIS há 5 anos. O valor depende dos meses trabalhados.",
    "onde": "Consulte no app Carteira de Trabalho Digital.",
    "fonte": "",
    "fonte_oficial_a_conferir": "gov.br/trabalho-e-emprego"
  },

  "protecao_inss": {
    "ativo": true,
    "nome": "Proteção do INSS",
    "valor": "Auxílio se adoecer e aposentadoria",
    "texto": "Quem vive de bico não tem essa proteção. Contribuir ao INSS, por exemplo como MEI, garante esses direitos.",
    "texto_com_carteira": "Quem tem carteira assinada já contribui ao INSS. Mas quem faz só bico fica sem auxílio se adoecer. Contribuir ao INSS, por exemplo como MEI, garante esses direitos.",
    "onde": "Converse no CRAS antes de decidir.",
    "fonte": "",
    "fonte_oficial_a_conferir": "gov.br/inss"
  }
}
;
