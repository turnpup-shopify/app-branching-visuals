import type { TreeDef } from "../types";

export const loveListTree: TreeDef = {
  id: "love-list",
  label: "Love List",
  tagline: "Things that light you up.",
  root: {
    id: "love-root",
    title: "Love List",
    blurb: "What I do & appreciate",
    accent: "bone",
    children: [
      {
        id: "love-making",
        title: "Making Things",
        blurb: "Creating with hands and mind",
        accent: "ink",
        children: [
          { id: "love-m-1", title: "Designing" },
          { id: "love-m-2", title: "Building" },
          { id: "love-m-3", title: "Prototyping" },
          { id: "love-m-4", title: "Woodworking" },
        ],
      },
      {
        id: "love-learning",
        title: "Learning",
        blurb: "Staying curious",
        accent: "ink",
        children: [
          { id: "love-l-1", title: "Reading" },
          { id: "love-l-2", title: "Listening to podcasts" },
          { id: "love-l-3", title: "Exploring new tools" },
        ],
      },
      {
        id: "love-movement",
        title: "Movement",
        blurb: "Being in the body",
        accent: "ink",
        children: [
          { id: "love-mv-1", title: "Running" },
          { id: "love-mv-2", title: "Walking" },
          { id: "love-mv-3", title: "Being outside" },
        ],
      },
      {
        id: "love-food",
        title: "Food & Ritual",
        blurb: "Slowness through eating",
        accent: "ink",
        children: [
          { id: "love-f-1", title: "Cooking" },
          { id: "love-f-2", title: "Baking" },
          { id: "love-f-3", title: "Coffee" },
          { id: "love-f-4", title: "Trying new restaurants" },
        ],
      },
      {
        id: "love-aesthetics",
        title: "Aesthetics",
        blurb: "Things that look and feel right",
        accent: "ink",
        children: [
          { id: "love-a-1", title: "Good typography" },
          { id: "love-a-2", title: "Minimal objects" },
          { id: "love-a-3", title: "Architecture" },
          { id: "love-a-4", title: "Photography" },
        ],
      },
      {
        id: "love-people",
        title: "People & Conversation",
        blurb: "Energy from real exchange",
        accent: "ink",
        children: [
          { id: "love-p-1", title: "Deep conversations" },
          { id: "love-p-2", title: "Mentoring" },
          { id: "love-p-3", title: "Collaboration" },
        ],
      },
    ],
  },
};
