import type { TreeDef } from "../types";

export const ikigaiTree: TreeDef = {
  id: "ikigai",
  label: "Ikigai",
  tagline: "The compass behind how you decide, create, and live.",
  root: {
    id: "ikigai-root",
    title: "My Compass",
    blurb: "Five lenses, one direction",
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
          {
            id: "strength-1",
            title: "An emphasis on the why",
            description:
              "You don't start with what to build — you start with why it matters. This gives your work unusual clarity and staying power. When most people are chasing tactics, you're anchoring to purpose. That orientation makes your decisions more defensible, your creative work more coherent, and your pitch more compelling. People trust work that has a reason behind it.",
          },
          {
            id: "strength-2",
            title: "Data-driven",
            description:
              "You use numbers the way a good editor uses grammar — to sharpen, not to bury. You're comfortable in the metrics but you don't stop there. You know how to find the signal in the noise, translate it into a story, and use it to make a sharper creative call. That combination — quantitative rigor plus creative instinct — is rare and hard to teach.",
          },
          {
            id: "strength-3",
            title: "Love of design",
            description:
              "Design for you isn't decoration — it's thinking made visible. You notice the things most people walk past: the hierarchy that pulls your eye, the color choice that sets a mood, the one decision that makes a space or a page feel intentional. That sensitivity shapes how you brief, how you edit, and how high your bar is for what ships.",
          },
          {
            id: "strength-4",
            title: "Pattern finder",
            description:
              "You see across categories in a way most people can't — because you go underneath the surface to the underlying why. A behavior you observed in athletic apparel informs a merchandising call in home goods. A conversion pattern from one channel teaches you something about another. You don't just collect data points; you build a mental model of how things actually work, and that model travels.",
          },
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
      {
        id: "accomplishments",
        title: "🏆 My Accomplishments",
        blurb: "Work that speaks",
        accent: "ink",
        children: [
          {
            id: "acc-1",
            title: "Nike App at Retail",
            description:
              "Brought the Nike App into physical retail — closing the gap between digital and in-store in a way that hadn't been done before. This was a systems problem as much as a product one: get the app, the associate, and the customer all on the same page at the same moment.",
          },
          {
            id: "acc-2",
            title: "Nike Run Club",
            description:
              "Helped shape one of the most beloved running communities in the world. NRC isn't just an app — it's a platform for habit, accountability, and belonging. Work here meant understanding what motivates people to lace up again tomorrow, and building the experience around that truth.",
          },
          {
            id: "acc-3",
            title: "Milk Bar — Bake Club & Holiday Drops",
            description:
              "Built the digital experience around Milk Bar's most creative and time-sensitive releases. Bake Club and holiday drops are high-stakes, high-joy moments for fans — the execution had to match the energy of the brand. Fast, fun, and frictionless.",
          },
          {
            id: "acc-4",
            title: "Wolf & Shepherd — Rebrand / Redesign",
            description:
              "Helped reposition Wolf & Shepherd as a premium men's footwear brand without losing the performance story underneath. A rebrand is a bet on who the customer is becoming — the redesign had to earn that trust at every touchpoint.",
          },
          {
            id: "acc-5",
            title: "ILIA Beauty — Replatform & GTM Offer Offense",
            description:
              "Led the replatform and built out the go-to-market offer strategy for ILIA at a pivotal growth moment. Clean beauty is a trust game — the site and the offer architecture had to reflect the brand's commitment to transparency while driving conversion.",
          },
        ],
      },
    ],
  },
};
