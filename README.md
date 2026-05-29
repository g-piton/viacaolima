# Viação Lima

Site institucional da Viação Lima, desenvolvido com Next.js, React, TypeScript e Tailwind CSS.

## Stack

- Next.js com App Router
- React e TypeScript
- Tailwind CSS
- React Hook Form e Zod
- Lucide React
- Framer Motion

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:3000`.

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Orçamento por WhatsApp

O formulário de orçamento valida os dados e abre o WhatsApp com uma mensagem preenchida para o número `(19) 98118-8065`.

Para alterar o número de destino, edite `quoteWhatsappNumber` em `src/components/forms/quote-form.tsx`.

## Conteúdo editável

Os dados institucionais ficam em `src/data`:

- `services.ts`
- `fleet.ts`
- `partners.ts`
- `itinerary.ts`
