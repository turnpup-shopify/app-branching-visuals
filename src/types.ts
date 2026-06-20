export type NodeAccent = "signal" | "ink" | "bone";

export interface NodeLink {
  label: string;
  url: string;
}

export interface TreeNode {
  id: string;
  title: string;
  /** short line shown on the card itself */
  blurb?: string;
  /** longer copy shown in the detail panel */
  description?: string;
  links?: NodeLink[];
  image?: string;
  accent?: NodeAccent;
  children?: TreeNode[];
}

export interface TreeDef {
  id: string;
  label: string;
  /** one-line description shown under the toggle */
  tagline: string;
  root: TreeNode;
}
