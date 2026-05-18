# Cadastra Editorial

Base de aplicação em **Next.js 15** (App Router + TypeScript + Tailwind), com camadas de domínio bem separadas e dados mockados, pronta para deploy gratuito na **Vercel (plano Hobby)**.

A interface implementa o design system editorial fornecido (paleta neutra, tipografia Bodoni Moda + Manrope, layout em grid amplo) e cobre três rotas reais: home, listagem de coleções e detalhe de produto.

---

## Sumário

- [Stack](#stack)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Scripts](#scripts)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Padrões de Clean Code adotados](#padrões-de-clean-code-adotados)
- [Camada de dados (mock → API real)](#camada-de-dados-mock--api-real)
- [Deploy na Vercel (Hobby)](#deploy-na-vercel-hobby)
- [Limites do plano Hobby](#limites-do-plano-hobby)

---

## Stack

- [Next.js 15](https://nextjs.org/) com **App Router**
- [React 19](https://react.dev/)
- **TypeScript** com `strict` + `noUncheckedIndexedAccess`
- [Tailwind CSS 3](https://tailwindcss.com/) com design tokens customizados
- ESLint (`next/core-web-vitals` + `next/typescript`) e Prettier (com `prettier-plugin-tailwindcss`)
- Fontes carregadas via `next/font/google` (Bodoni Moda + Manrope)

Sem dependências pagas, sem banco de dados, sem serviços externos.

---

## Pré-requisitos

- Node.js **20.x** ou superior
- npm **10.x** ou superior

---

## Instalação

```bash
git clone <url-do-repo>
cd avaliacao-qa
npm install
```

---

## Scripts

| Comando                | Descrição                                                  |
| ---------------------- | ---------------------------------------------------------- |
| `npm run dev`          | Sobe o servidor de desenvolvimento em `http://localhost:3000` |
| `npm run build`        | Faz o build de produção                                    |
| `npm start`            | Roda o build em modo produção                              |
| `npm run lint`         | Roda o ESLint                                              |
| `npm run format`       | Aplica o Prettier em todo o projeto                        |
| `npm run format:check` | Verifica formatação sem alterar arquivos                   |

---

## Estrutura de pastas

```
src/
├── app/                           App Router (rotas, layouts, loading, error)
│   ├── collections/               /collections (lista filtrável)
│   ├── products/[slug]/           /products/:slug (detalhe, SSG via generateStaticParams)
│   ├── error.tsx                  Error boundary global
│   ├── loading.tsx                Loading boundary global
│   ├── not-found.tsx              Página 404
│   ├── layout.tsx                 Root layout + fonts + Header/Footer
│   └── page.tsx                   Home (Server Component, ISR)
├── components/
│   ├── layout/                    Header, Footer, Newsletter
│   └── ui/                        Primitivos: Button, Container, Icon, Logo, Price, SectionHeader
├── features/
│   └── products/
│       ├── components/            Componentes do domínio "produto"
│       └── data/                  Mocks (única fonte de verdade enquanto não há backend)
├── lib/                           Utilitários puros (cn, format)
├── services/                      API pública do domínio para a UI
├── repositories/                  Acesso aos dados (in-memory hoje, REST/DB amanhã)
├── types/                         Contratos TypeScript globais
├── constants/                     Constantes da aplicação (nav, site)
└── styles/                        Reservado para estilos globais adicionais
```

### Por que `services` e `repositories`?

- **Repository** isola a origem dos dados. Hoje é in-memory; trocar por Supabase, REST ou Postgres é **uma só implementação a substituir**, sem tocar nas páginas.
- **Service** expõe as operações de domínio para a UI (`getProductsBySection`, `getRelatedProducts`, etc.). É o único ponto que as rotas consomem.
- Componentes nunca importam mocks diretamente.

---

## Padrões de Clean Code adotados

- **Server Components por padrão** — `'use client'` apenas onde há estado/eventos (`Newsletter`, `error.tsx`).
- **Composição em vez de componentes gigantes** — `ProductSection` = `SectionHeader` + `ProductGrid` + `ProductCard`.
- **Funções puras** em `lib/` (`cn`, `formatPrice`).
- **Tipagem nas fronteiras** — entradas/saídas de service e repository são tipadas; `noUncheckedIndexedAccess` força tratamento explícito de índices.
- **Separação de responsabilidades** — UI não conhece a origem dos dados; mocks ficam atrás do repository.
- **Erros previsíveis** — `notFound()` em rota dinâmica, `error.tsx` + `not-found.tsx` no App Router.
- **Imports organizados** com alias `@/*`.
- **Sem CSS inline / sem lógica de negócio em componentes de UI.**

---

## Camada de dados (mock → API real)

Tudo passa por [`src/services/products.service.ts`](src/services/products.service.ts), que delega ao repositório em [`src/repositories/products.repository.ts`](src/repositories/products.repository.ts).

Para trocar o mock por um backend real:

1. Crie uma nova classe que implemente a interface `ProductsRepository`.
2. Exporte `productsRepository` apontando para ela.
3. Nenhum componente precisa ser alterado.

Exemplo com `fetch`:

```ts
class HttpProductsRepository implements ProductsRepository {
  async list() {
    const res = await fetch(`${process.env.API_URL}/products`, {
      next: { revalidate: 60 },
    });
    return res.json();
  }
  // ...
}
```

---

## Deploy na Vercel (Hobby)

1. **Suba o repositório no GitHub / GitLab / Bitbucket.**
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório.
3. A Vercel detecta Next.js automaticamente. Mantenha os defaults:
   - Framework: **Next.js**
   - Build Command: `next build`
   - Output: `.next`
   - Install Command: `npm install`
4. Clique em **Deploy**.

Nenhuma variável de ambiente é necessária para o projeto base. Quando você adicionar integrações reais, use o painel **Settings → Environment Variables** (e atualize `.env.example`).

### Garantias do projeto para o Hobby

- **Sem Edge Functions pagas:** todas as rotas são Server Components estáticos ou com ISR (`revalidate = 3600`).
- **Sem dependências pagas.**
- **`generateStaticParams` na rota dinâmica `/products/[slug]`** → todas as páginas de produto são geradas no build, evitando execuções de função em runtime para detalhes que não mudam.
- **Imagens externas usam `unoptimized`** para não consumir o quota de `Image Optimization` do Hobby. Se você adicionar imagens próprias em `public/`, pode remover o `unoptimized` e aproveitar o limite gratuito mensal.

---

## Limites do plano Hobby

> Valores referenciais — sempre confira a [documentação oficial](https://vercel.com/docs/limits) antes de produção.

- Uso **não comercial / pessoal**.
- 100 GB de bandwidth/mês.
- Serverless / Edge Functions com cap de execução mensal.
- 1000 imagens otimizadas/mês (por isso o projeto usa `unoptimized` para fotos hospedadas externamente).
- Sem suporte a domínio customizado com SSL avançado (o `*.vercel.app` é gratuito).
- Build minutes mensais limitados.

Para evitar surpresas:

- Mantenha rotas **estáticas ou ISR** (já configurado).
- Evite chamadas em runtime para terceiros pagos.
- Se precisar de banco, comece por opções com plano gratuito (Supabase free, Neon free, Turso free) e isole por trás do `repository`.

---

## Próximos passos sugeridos

- Conectar `ProductsRepository` a um CMS headless gratuito (Sanity / Contentful free / Supabase).
- Adicionar testes unitários (`vitest`) nos `services` e `lib`.
- Adicionar carrinho com `Zustand` (cliente, sem custo de função).
- Internacionalização com `next-intl`.
