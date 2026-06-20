import type { TreeNode } from "../types";

export interface LayoutChild {
  node: TreeNode;
  x: number;
  y: number;
  angle: number;
}

export interface LayoutGrandchild {
  node: TreeNode;
  x: number;
  y: number;
  parentId: string;
}

export interface RadialLayout {
  childRadius: number;
  maxExtent: number;
  children: LayoutChild[];
  grandchildren: LayoutGrandchild[];
  moreByParent: Record<string, number>;
}

const GRAND_RADIUS = 150;
const GRAND_SPREAD_DEG = 56;
const MAX_GRANDCHILDREN_PER_CHILD = 3;

export function computeRadialLayout(focus: TreeNode): RadialLayout {
  const children = focus.children ?? [];
  const n = children.length;
  const childRadius = n === 0 ? 0 : Math.max(260, 42 * n + 170);

  const layoutChildren: LayoutChild[] = children.map((child, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    return {
      node: child,
      x: Math.cos(angle) * childRadius,
      y: Math.sin(angle) * childRadius,
      angle,
    };
  });

  const grandchildren: LayoutGrandchild[] = [];
  const moreByParent: Record<string, number> = {};

  for (const { node: child, angle } of layoutChildren) {
    const allGrandkids = child.children ?? [];
    const shown = allGrandkids.slice(0, MAX_GRANDCHILDREN_PER_CHILD);
    const extra = allGrandkids.length - shown.length;
    if (extra > 0) moreByParent[child.id] = extra;

    const count = shown.length;
    shown.forEach((gc, i) => {
      const spread = (GRAND_SPREAD_DEG * Math.PI) / 180;
      const offset = count === 1 ? 0 : spread * (i / (count - 1) - 0.5);
      const a = angle + offset;
      grandchildren.push({
        node: gc,
        x: Math.cos(angle) * childRadius + Math.cos(a) * GRAND_RADIUS,
        y: Math.sin(angle) * childRadius + Math.sin(a) * GRAND_RADIUS,
        parentId: child.id,
      });
    });
  }

  const maxExtent = n === 0 ? 0 : childRadius + GRAND_RADIUS;

  return { childRadius, maxExtent, children: layoutChildren, grandchildren, moreByParent };
}
