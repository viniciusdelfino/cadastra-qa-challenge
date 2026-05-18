# QA Challenge — Cadastra Editorial

Bem-vindo(a). Este desafio avalia suas habilidades de QA **manual**: planejamento,
execução, descoberta de defeitos, comunicação e raciocínio crítico.

Você **não precisa escrever automação**. Se quiser, há um bônus opcional ao final.

---

## O produto

Storefront editorial em Next.js. Catálogo mockado em memória, três rotas principais:

- `/` — home com hero, coleções em destaque e newsletter.
- `/collections` — listagem de produtos com filtros (Section, Category), busca via header, paginação.
- `/products/[slug]` — detalhe do produto com "Add to bag".

Funcionalidades adicionais:

- **Carrinho** com persistência local (badge no header + drawer lateral).
- **Newsletter** com persistência local + página `/subscribers` para visualização.

> Esta versão da aplicação contém defeitos plantados. Sua missão é encontrá-los.

---

## Como rodar

```bash
git clone <repo>
cd avaliacao-qa
git checkout qa-challenge
npm install
npm run dev   # http://localhost:3000
```

Alternativamente, use a URL de preview já deployada (link enviado por e-mail).

Limpe o `localStorage` entre cenários quando necessário:

> DevTools → Application → Local Storage → clique direito → Clear.

Chaves usadas pela aplicação:

- `cadastra-cart:v1`
- `cadastra-subscribers:v1`

---

## O que entregar

Em uma branch `submission/<seu-nome>`:

1. **`TEST_EXECUTION.md`** — checklist preenchido (obrigatório).
2. **`bugs.yaml`** — bugs descobertos (obrigatório).
3. **`TEST_PLAN.md`** — sua estratégia em 1 página (obrigatório).
4. **`tests/candidate/*.spec.ts`** — automação Playwright (opcional, bônus).

Templates prontos em `submission-template/`. Copie a pasta e preencha.

---

## Rubrica

| Critério | Pts | Forma |
|---|---|---|
| Execução do checklist (matches com gabarito) | 50 | Automática |
| Bug report (matches com catálogo) | 25 | Automática |
| Falsos positivos (FAIL marcado onde estava OK) | -10 a 0 | Automática |
| **Subtotal automatizado** | **até 75** | |
| Plano de teste (estratégia, cobertura, riscos) | 10 | Revisão humana |
| Lateral thinking (bugs válidos fora do catálogo) | 0 a +10 | Revisão humana |
| Bônus automação Playwright (opcional) | 0 a +5 | Revisão humana |

Total possível: 100. **Linha de corte sugerida: 60.**

---

## Regras

- Você **não pode** alterar o código da aplicação. Só pode escrever testes/relatórios.
- O quanto explorar é com você — recomendamos cobrir todas as features listadas.
- Tempo estimado: **4–6 horas**. Prazo de entrega: combinado por e-mail.
- Em caso de dúvida sobre o produto, registre como pergunta no `TEST_PLAN.md` em vez de
  contatar o time — parte da avaliação é entender o que está dado.

---

## Critérios de severidade (use no `bugs.yaml`)

- **High** — bloqueia uma funcionalidade central, gera perda/duplicação de dados, ou
  quebra um fluxo crítico (carrinho, cadastro).
- **Medium** — degrada a experiência sem bloquear (validação fraca, mensagem incorreta).
- **Low** — incômodo ou polimento (UX, microinteração, copy).

---

## Submissão

```bash
git checkout -b submission/<seu-nome>
cp -r submission-template/* .          # copia templates para a raiz
# preencha TEST_EXECUTION.md, bugs.yaml, TEST_PLAN.md
git add TEST_EXECUTION.md bugs.yaml TEST_PLAN.md
git commit -m "QA submission - <seu-nome>"
git push origin submission/<seu-nome>
```

Abra um pull request da sua branch para `qa-challenge` com o título
`QA submission - <seu-nome>`.

Boa caça.
