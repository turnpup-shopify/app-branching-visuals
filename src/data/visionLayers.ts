import type { TreeDef } from "../types";

export const visionLayersTree: TreeDef = {
  id: "vision",
  label: "Slow Layers",
  tagline: "Long-term work vision — what changes fast, what changes slow.",
  root: {
    id: "vision-root",
    title: "Long-Term Vision",
    blurb: "Pace-layered",
    description:
      "Borrowed from Stewart Brand's pace-layering model: the slow layers (identity, values) change rarely and constrain the fast ones (tasks, projects), which adapt constantly. Edit this tree in src/data/visionLayers.ts.",
    accent: "signal",
    children: [
      {
        id: "identity",
        title: "Identity & Values",
        blurb: "Slowest layer — decades",
        description: "The almost-fixed core: who you are, what you refuse to compromise on. Rarely changes.",
        accent: "ink",
        children: [
          { id: "identity-1", title: "Core value", description: "Name a value you'd keep even if it cost you." },
          { id: "identity-2", title: "Core value", description: "Add another non-negotiable." },
        ],
      },
      {
        id: "vision-decade",
        title: "Vision",
        blurb: "5-10 year horizon",
        description: "The world or career you're slowly building toward. Direction, not a deadline.",
        accent: "ink",
        children: [
          { id: "vision-1", title: "Decade theme", description: "What does 'done well' look like a decade out?" },
          { id: "vision-2", title: "Decade theme", description: "Add another long horizon thread." },
        ],
      },
      {
        id: "strategy",
        title: "Strategy",
        blurb: "1-3 year bets",
        description: "The handful of bets that move you toward the vision, re-evaluated yearly.",
        accent: "ink",
        children: [
          { id: "strategy-1", title: "Current bet", description: "A multi-quarter initiative tied to the vision." },
          { id: "strategy-2", title: "Current bet", description: "Add a second strategic bet." },
        ],
      },
      {
        id: "projects",
        title: "Projects",
        blurb: "Quarterly",
        description: "Concrete, shippable projects that serve the current strategy.",
        accent: "ink",
        children: [
          { id: "project-1", title: "This quarter", description: "A project with a defined finish line." },
          { id: "project-2", title: "This quarter", description: "Add another active project." },
        ],
      },
      {
        id: "tasks",
        title: "Tasks",
        blurb: "Fastest layer — weekly",
        description: "The day-to-day work. Changes constantly, should always trace back up the tree.",
        accent: "ink",
        children: [
          { id: "task-1", title: "This week", description: "A concrete next action." },
          { id: "task-2", title: "This week", description: "Add another near-term task." },
        ],
      },
    ],
  },
};
