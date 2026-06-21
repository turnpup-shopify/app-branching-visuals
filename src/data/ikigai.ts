import type { TreeDef } from "../types";

export const ikigaiTree: TreeDef = {
  id: "ikigai",
  label: "Ikigai",
  tagline: "The compass behind how you decide, create, and live.",
  root: {
    id: "ikigai-root",
    title: "My Compass",
    blurb: "Four lenses, one direction",
    description:
      "What guides big decisions, what comes naturally, what you hold onto, and what genuinely lights you up.",
    accent: "signal",
    children: [
      {
        id: "north-stars",
        title: "🧭 My North Stars",
        blurb: "Slow layering",
        accent: "ink",
        children: [
          { id: "north-1", title: "Home goods that promote creative & intentional (slow) thinking" },
          { id: "north-2", title: "Marketing / design knowledge" },
          { id: "north-3", title: "Creative home experiences" },
        ],
      },
      {
        id: "strengths",
        title: "🧿 My Strengths",
        blurb: "What comes naturally",
        accent: "ink",
        children: [
          { id: "strength-1", title: "An emphasis on the why" },
          { id: "strength-2", title: "Data-driven" },
          { id: "strength-3", title: "Love of design" },
          { id: "strength-4", title: "Pattern finder based on understanding the why" },
        ],
      },
      {
        id: "values",
        title: "🌎 What I Value",
        blurb: "What anchors you",
        accent: "ink",
        children: [
          { id: "value-1", title: "Gratitude" },
          { id: "value-2", title: "Freedom" },
          { id: "value-3", title: "Creativity" },
        ],
      },
      {
        id: "things-i-love",
        title: "💙 Things I Genuinely Love",
        blurb: "What lights you up",
        accent: "ink",
        children: [
          { id: "love-1", title: "Immersive installations (water / light / sound)" },
          { id: "love-2", title: "Seeing others smile, laugh, make memories" },
          { id: "love-3", title: "Tiny houses — making do with less" },
          { id: "love-4", title: "Public installations that make you think and feel awe" },
          { id: "love-5", title: "Dune / spy shows" },
        ],
      },
    ],
  },
};
