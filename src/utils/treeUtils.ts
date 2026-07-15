import type { TreeNode } from "../types";

export function applyOverride(node: TreeNode, ov: Record<string, Partial<TreeNode>>): TreeNode {
  const patch = ov[node.id];
  return patch ? { ...node, ...patch } : node;
}

export function applyOverrides(node: TreeNode, ov: Record<string, Partial<TreeNode>>): TreeNode {
  const live = applyOverride(node, ov);
  if (!live.children) return live;
  return { ...live, children: live.children.map((c) => applyOverride(c, ov)) };
}

export function flattenTree(
  node: TreeNode,
  depth = 0,
): Array<{ node: TreeNode; depth: number }> {
  return [
    { node, depth },
    ...(node.children ?? []).flatMap((c) => flattenTree(c, depth + 1)),
  ];
}
