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
        blurb: "A life that awes, sparks thought, & slows",
        accent: "ink",
        children: [
          {
            id: "ns-products",
            title: "🛖 Products",
            blurb: "Physical forms that slow and inspire",
            accent: "ink",
            children: [
              { id: "ns-p-1", title: "Shelves" },
              { id: "ns-p-2", title: "Hooks" },
              { id: "ns-p-3", title: "Stools" },
              { id: "ns-p-4", title: "Small tables" },
              { id: "ns-p-5", title: "Stackable" },
              { id: "ns-p-6", title: "Modular" },
            ],
          },
          {
            id: "ns-portals",
            title: "🖥️ Portals",
            blurb: "Digital surfaces that open a world",
            accent: "ink",
            children: [
              { id: "ns-po-1", title: "Galleries" },
              { id: "ns-po-2", title: "Marketing" },
            ],
          },
          {
            id: "ns-interactions",
            title: "🪬 Interactions",
            blurb: "The human and systemic layer",
            accent: "ink",
            children: [
              { id: "ns-i-1", title: "Small systems" },
              { id: "ns-i-2", title: "Meetings" },
              { id: "ns-i-3", title: "Processes" },
              { id: "ns-i-4", title: "Questions" },
            ],
          },
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
            title: "Maker",
            blurb: "Design + Technical + Analytical + Open-Minded",
            description:
              "You can operate in all four modes — and switch between them without losing the thread. Most people are strong in one, maybe two. You can feel what a design needs, build or spec the technical solution, pressure-test it with data, and stay genuinely open when the answer surprises you. That range means you can hold a project end-to-end and earn the trust of every kind of collaborator.",
          },
          {
            id: "strength-2",
            title: "Intentional Pattern Finder",
            blurb: "Why, why, why",
            description:
              "You don't stop at what's happening — you keep asking why until you reach the thing underneath. That habit turns surface observations into durable insight. A signal in one category becomes a principle that applies three categories over. Most people collect data points; you build a model. The model is the asset, and it compounds.",
          },
          {
            id: "strength-3",
            title: "Hard Things",
            blurb: "Empathy, Patience, Focus",
            description:
              "These are the skills most people talk about and few actually practice. Empathy means you can inhabit someone else's perspective long enough to make something that serves them. Patience means you don't reach for the shortcut when the slow path is the right one. Focus means you can stay on the one thing when everything around you is pulling for attention. Together they make the difference between work that is technically correct and work that actually lands.",
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
        id: "start-more",
        title: "✨ Start More",
        blurb: "Stay in the present",
        description:
          "Not all about achievement.\n\nIt's about creating more awe, inspiring thought, and intentionality.",
        accent: "ink",
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
