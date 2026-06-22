import type { TreeDef } from "../types";

export const visionLayersTree: TreeDef = {
  id: "vision",
  label: "Slow Layers",
  tagline: "Not slow. Intentional. One layer a day, every day.",
  root: {
    id: "vision-root",
    title: "Slow Layers",
    blurb: "One layer today. Every day.",
    description:
      "A daily practice for building a life and a business on purpose. Explore each layer below, or read the full manifesto.",
    accent: "signal",
    children: [
      {
        id: "believe",
        title: "Believe",
        blurb: "Slowest layer — identity",
        description:
          "Most people inherit their space, taste, and days by default.\n\nI choose mine. On purpose.\n\nNot slow. Intentional. Deliberate can be fast.",
        accent: "ink",
      },
      {
        id: "why",
        title: "Why",
        blurb: "Direction",
        description:
          "The world will pull me a hundred directions. I could chase any of them.\n\nThat is why I pick one on purpose.\n\nPermission to go my own way, knowing I could go any other. To be truer to myself. To get one percent better every day.\n\nThe check. Am I building toward what matters, or away from the hard thing.",
        accent: "ink",
      },
      {
        id: "what",
        title: "What",
        blurb: "1-3 year strategy",
        description:
          "Not furniture. What a space does to a life.\n\nA home is a gallery of you. Every piece on display says this is who I am. Most people let it curate itself by accident. I help them curate it on purpose.\n\nThe space is the path. The feeling is the point. One percent happier, more yourself, every day.\n\nMy lens is what I am good at. Ecommerce, furniture, hardware, design. Not my limit. My way in.",
        accent: "ink",
      },
      {
        id: "the-product",
        title: "The Product",
        blurb: "What I'm building",
        description:
          "Immersive, experiential home decor. A personalized upscale gallery of you.\n\nNot a feed. Not a showroom. A space you move through that turns your home into an exhibit of who you are.\n\nExplore real spaces. Feel how they come together. Build your own gallery, one piece at a time.\n\nLeave more inspired and more capable. One idea you can use, not forty you forget.",
        accent: "ink",
      },
      {
        id: "days",
        title: "Days",
        blurb: "Fastest layer — daily practice",
        description:
          "One layer a day. Never zero. Never a binge.\n\nThe businesses are training, not detours. Firstday, Hapny, HTGT all feed this.\n\nProtect one slot that is mine.",
        accent: "ink",
      },
      {
        id: "filters",
        title: "Filters",
        blurb: "The checks",
        accent: "ink",
        children: [
          { id: "filter-1", title: "Does this add a layer or just noise?" },
          { id: "filter-2", title: "Does it point me in my direction?" },
          { id: "filter-3", title: "Does it ladder up — week to month to year?" },
          { id: "filter-4", title: "Would I linger here?" },
          { id: "filter-5", title: "Collected or installed — earned beats bought." },
          { id: "filter-6", title: "Toward myself, or away from the hard thing?" },
        ],
      },
      {
        id: "refuse",
        title: "Refuse",
        blurb: "What I won't do",
        accent: "ink",
        children: [
          { id: "refuse-1", title: "Trend chasing" },
          { id: "refuse-2", title: "Binge and quit" },
          { id: "refuse-3", title: "Comparison" },
          { id: "refuse-4", title: "Drift" },
        ],
      },
      {
        id: "manifesto",
        title: "The Manifesto",
        blurb: "The full read",
        description:
          "Believe\n\nMost people inherit their space, taste, and days by default.\n\nI choose mine. On purpose.\n\nNot slow. Intentional. Deliberate can be fast.\n\nWhy\n\nThe world will pull me a hundred directions. I could chase any of them.\n\nThat is why I pick one on purpose.\n\nPermission to go my own way, knowing I could go any other. To be truer to myself. To get one percent better every day.\n\nThe check. Am I building toward what matters, or away from the hard thing.\n\nWhat\n\nNot furniture. What a space does to a life.\n\nA home is a gallery of you. Every piece on display says this is who I am. Most people let it curate itself by accident. I help them curate it on purpose.\n\nThe space is the path. The feeling is the point. One percent happier, more yourself, every day.\n\nMy lens is what I am good at. Ecommerce, furniture, hardware, design. Not my limit. My way in.\n\nThe Product\n\nImmersive, experiential home decor. A personalized upscale gallery of you.\n\nNot a feed. Not a showroom. A space you move through that turns your home into an exhibit of who you are.\n\nExplore real spaces. Feel how they come together. Build your own gallery, one piece at a time.\n\nLeave more inspired and more capable. One idea you can use, not forty you forget.\n\nDays\n\nOne layer a day. Never zero. Never a binge.\n\nThe businesses are training, not detours. Firstday, Hapny, HTGT all feed this.\n\nProtect one slot that is mine.\n\nFilters\n\nDoes this add a layer or just noise.\n\nDoes it point me in my direction.\n\nDoes it ladder up. Week to month to year.\n\nWould I linger here.\n\nCollected or installed. Earned beats bought.\n\nToward myself, or away from the hard thing.\n\nRefuse\n\nTrend chasing. Binge and quit. Comparison. Drift.\n\nOne layer today. Every day. That is the method.",
        accent: "bone",
      },
    ],
  },
};
