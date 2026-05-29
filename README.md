# Viação Lima

Site institucional da Viação Lima, desenvolvido com Next.js, React, TypeScript e Tailwind CSS.

## Stack

- Next.js com App Router
- React e TypeScript
- Tailwind CSS
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

## Atendimento por WhatsApp

O botão de atendimento abre a página `/atendimento`, onde um chat guiado coleta as informações principais e abre o WhatsApp com uma mensagem preenchida para o número `(19) 98118-8065`.

## Conteúdo editável

Os dados institucionais ficam em `src/data`:

- `services.ts`
- `fleet.ts`
- `partners.ts`

Os dados da empresa ficam em `src/lib/constants.ts`.
O chat de atendimento fica em `src/components/home/quote-chat.tsx`.
