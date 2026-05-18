# Test Execution

Preencha a coluna **Resultado** com `PASS`, `FAIL` ou `BLOCKED`.
Use a coluna **Observação** para registrar evidência ou contexto quando `FAIL`.

> Limpe o `localStorage` entre seções quando necessário para isolar os cenários.

---

## Home (`/`)

| ID | Caso | Resultado | Observação |
|----|------|-----------|------------|
| TC-HOME-01 | A home carrega sem erros visíveis e sem erros no console | | |
| TC-HOME-02 | O header fica fixo no topo ao rolar a página | | |
| TC-HOME-03 | Logo do header não ultrapassa 80px de altura em qualquer breakpoint | | |
| TC-HOME-04 | Clicar na logo navega para `/` | | |

## Coleções e filtros (`/collections`)

| ID | Caso | Resultado | Observação |
|----|------|-----------|------------|
| TC-COL-01 | A listagem mostra produtos em grid de 3 colunas no desktop | | |
| TC-COL-02 | Dropdown "Section" mostra as 3 seções com contagem por seção | | |
| TC-COL-03 | Dropdown "Category" mostra as categorias existentes com contagem | | |
| TC-COL-04 | Selecionar uma Section filtra a listagem corretamente | | |
| TC-COL-05 | Selecionar uma Category filtra a listagem corretamente | | |
| TC-COL-06 | Combinar Section + Category aplica os dois filtros simultaneamente | | |
| TC-COL-07 | "Clear All" remove todos os filtros e volta para a listagem completa | | |
| TC-COL-08 | Clicar fora de um dropdown aberto fecha o dropdown | | |
| TC-COL-09 | Pressionar `Esc` com um dropdown aberto fecha o dropdown | | |
| TC-COL-10 | URL reflete os filtros (`?section=...&category=...`) e link compartilhável aplica o filtro | | |

## Paginação (`/collections`)

| ID | Caso | Resultado | Observação |
|----|------|-----------|------------|
| TC-PAG-01 | A paginação aparece quando há mais de 6 produtos no resultado | | |
| TC-PAG-02 | "Previous" fica desabilitado na primeira página | | |
| TC-PAG-03 | "Next" fica desabilitado na última página | | |
| TC-PAG-04 | Avançar para a página 2 preserva o filtro de Category ativo na URL | | |
| TC-PAG-05 | Avançar para a página 2 preserva o filtro de Section ativo na URL | | |

## Busca (header)

| ID | Caso | Resultado | Observação |
|----|------|-----------|------------|
| TC-SRC-01 | O ícone da lupa abre o campo de busca | | |
| TC-SRC-02 | Pressionar Enter com um termo válido navega para `/collections?q=...` | | |
| TC-SRC-03 | A busca por "coat" retorna o Sculpted Wool Coat | | |
| TC-SRC-04 | A busca por "Coat" (com maiúscula) retorna o mesmo resultado de "coat" | | |
| TC-SRC-05 | A busca sem resultados mostra mensagem amigável | | |

## Carrinho (PDP + drawer)

| ID | Caso | Resultado | Observação |
|----|------|-----------|------------|
| TC-CART-01 | Clicar "Add to bag" no PDP incrementa o badge no header e abre o drawer | | |
| TC-CART-02 | Adicionar o mesmo produto duas vezes soma na quantidade, não duplica linha | | |
| TC-CART-03 | Botão "−" no drawer não permite quantidade abaixo de 1 (clicar em qty=1 remove o item) | | |
| TC-CART-04 | Botão "+" no drawer aumenta a quantidade do item | | |
| TC-CART-05 | Remover um item via "×" atualiza o badge do header | | |
| TC-CART-06 | "Clear bag" esvazia o drawer | | |
| TC-CART-07 | Pressionar `Esc` com o drawer aberto fecha o drawer | | |
| TC-CART-08 | Fechar e abrir o navegador mantém os itens do carrinho (localStorage) | | |
| TC-CART-09 | Subtotal exibido no drawer corresponde à soma de (preço × quantidade) dos itens | | |

## Newsletter (`/` footer)

| ID | Caso | Resultado | Observação |
|----|------|-----------|------------|
| TC-NEWS-01 | E-mail válido (`teste@exemplo.com`) mostra mensagem de sucesso e limpa o input | | |
| TC-NEWS-02 | E-mail sem domínio TLD (`teste@exemplo`) é rejeitado com mensagem de erro | | |
| TC-NEWS-03 | E-mail sem `@` (`teste.com`) é rejeitado com mensagem de erro | | |
| TC-NEWS-04 | E-mail com espaços (`a @b.com`) é rejeitado com mensagem de erro | | |
| TC-NEWS-05 | Submeter o mesmo e-mail duas vezes mostra mensagem de "já cadastrado" | | |
| TC-NEWS-06 | E-mail com MAIÚSCULAS é normalizado para minúsculas em `/subscribers` | | |

## `/subscribers`

| ID | Caso | Resultado | Observação |
|----|------|-----------|------------|
| TC-SUB-01 | E-mail recém-cadastrado aparece em `/subscribers` com data/hora | | |
| TC-SUB-02 | Mesmo e-mail submetido 2x aparece apenas 1 vez na lista | | |
| TC-SUB-03 | Botão "×" individual remove apenas aquele e-mail | | |
| TC-SUB-04 | "Clear all" exibe confirmação e, ao confirmar, esvazia a lista | | |
| TC-SUB-05 | Reload da página mantém os e-mails cadastrados (localStorage) | | |

---

**Total: 40 casos**
