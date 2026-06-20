# Branching Visuals

An immersive, zoomable explorer for branching life maps — Ikigai, long-term work
vision ("slow layers"), or any tree-shaped idea. Tap a node to dive into its
branch, pan and zoom freely, and keep a glass-styled detail panel with notes,
links, and images for whatever you're looking at.

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
  description: "Longer note shown in the detail panel.",
  links: [{ label: "Blog", url: "https://..." }],
  image: "https://...",
  children: [/* nested nodes */],
}
```

Add a new tree by creating a file like the existing ones and adding it to the
`trees` array in `src/data/trees.ts`.

## Stack

Vite, React, TypeScript, Tailwind CSS v4, Framer Motion, lucide-react. The
radial layout and pan/zoom are hand-rolled (`src/layout/radial.ts`,
`src/hooks/usePanZoom.ts`) — no graph-visualization dependency.
</content>
