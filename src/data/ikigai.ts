import type { TreeDef } from "../types";

export const ikigaiTree: TreeDef = {
  id: "ikigai",
  label: "Ikigai",
  tagline: "Why you get up in the morning — four circles, one center.",
  root: {
    id: "ikigai-root",
    title: "Ikigai",
    blurb: "Your reason for being",
    description:
      "The point where what you love, what you're good at, what the world needs, and what you can be paid for all overlap. Edit this tree in src/data/ikigai.ts with your own answers.",
    accent: "signal",
    children: [
      {
        id: "love",
        title: "What you LOVE",
        blurb: "Passion",
        description: "The activities, ideas, and people that pull you in without needing willpower.",
        accent: "ink",
        children: [
          {
            id: "love-1",
            title: "Add a thing you love",
            description: "Replace with something you'd do for free, on a weekend, with no audience.",
          },
          {
            id: "love-2",
            title: "Add another",
            description: "Keep going — list 3-5 honest answers, not the ones that sound good.",
          },
        ],
      },
      {
        id: "good-at",
        title: "What you're GOOD AT",
        blurb: "Vocation",
        description: "Skills people already trust you with, or that come easily compared to most people.",
        accent: "ink",
        children: [
          {
            id: "good-1",
            title: "Add a skill",
            description: "Something others ask you for help with, or that feels almost too easy.",
          },
          {
            id: "good-2",
            title: "Add another",
            description: "Include skills that aren't your job title — adjacent strengths count.",
          },
        ],
      },
      {
        id: "world-needs",
        title: "What the WORLD NEEDS",
        blurb: "Mission",
        description: "Problems you notice, care about fixing, and would feel the pull to address even unpaid.",
        accent: "ink",
        children: [
          {
            id: "need-1",
            title: "Add a need you see",
            description: "A gap, frustration, or unmet need you keep noticing in the world around you.",
          },
          {
            id: "need-2",
            title: "Add another",
            description: "Think locally and globally — both count.",
          },
        ],
      },
      {
        id: "paid-for",
        title: "What you can be PAID FOR",
        blurb: "Profession",
        description: "Value the market will exchange money for, today or with a believable path to get there.",
        accent: "ink",
        children: [
          {
            id: "paid-1",
            title: "Add a paid skill",
            description: "Something with current or near-term market demand tied to your strengths.",
          },
          {
            id: "paid-2",
            title: "Add another",
            description: "Include adjacent or emerging markets, not just your current job.",
          },
        ],
      },
    ],
  },
};
