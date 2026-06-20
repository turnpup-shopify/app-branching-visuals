# Branching Visuals

An immersive card explorer for branching life maps — Ikigai, long-term work
vision ("slow layers"), or any tree-shaped idea. Each screen is a full glass
card for the node you're on, with its notes, links, and image inline, and a
row of buttons at the bottom for diving into its children. A breadcrumb trail
up top lets you jump back to any ancestor.

## Run it

```bash
npm install
npm run dev
```

## Edit your own trees

Each tree is plain data in `src/data/`:

- `src/data/ikigai.ts` — the four-circle Ikigai map
- `src/data/visionLayers.ts` — a pace-layered long-term work vision
- `src/data/trees.ts` — registers which trees show up in the toggle

A node looks like this (see `src/types.ts`):

```ts
{
  id: "love-1",
  title: "Writing",
  blurb: "Passion",
  description: "Longer note shown on the card.",
  links: [{ label: "Blog", url: "https://..." }],
  image: "https://...",
  children: [/* nested nodes */],
}
```

Add a new tree by creating a file like the existing ones and adding it to the
`trees` array in `src/data/trees.ts`.

## Stack

Vite, React, TypeScript, Tailwind CSS v4, Framer Motion, lucide-react. Navigation
is plain path state (`src/hooks/useTreeExplorer.ts`) — no graph-visualization
dependency.
</content>
