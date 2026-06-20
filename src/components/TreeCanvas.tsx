import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Minus, Plus, Scan } from "lucide-react";
import { computeRadialLayout } from "../layout/radial";
import { usePanZoom } from "../hooks/usePanZoom";
import { NodeCard } from "./NodeCard";
import type { NavDirection } from "../hooks/useTreeExplorer";
import type { TreeNode } from "../types";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const CARD_MARGIN = 150;

interface Props {
  focus: TreeNode;
  direction: NavDirection;
  onSelectChild: (child: TreeNode) => void;
  onSelectGrandchild: (child: TreeNode, grandchild: TreeNode) => void;
  onSelectFocus: () => void;
  canGoUp: boolean;
}

const canvasVariants: Variants = {
  enter: (direction: NavDirection) => ({
    opacity: 0,
    scale: direction === "in" ? 0.55 : direction === "out" ? 1.55 : 1,
  }),
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (direction: NavDirection) => ({
    opacity: 0,
    scale: direction === "in" ? 1.7 : direction === "out" ? 0.5 : 1,
    transition: { duration: 0.32, ease: [0.7, 0, 0.84, 0] },
  }),
};

export function TreeCanvas({ focus, direction, onSelectChild, onSelectGrandchild, onSelectFocus, canGoUp }: Props) {
  const layout = computeRadialLayout(focus);
  const panZoom = usePanZoom();
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const extent = layout.maxExtent + CARD_MARGIN;
    const available = Math.min(size.width, size.height) || 900;
    const fit = extent > 0 ? clamp(available / (2 * extent), 0.45, 1.05) : 1;
    panZoom.reset({ x: 0, y: 0, k: fit });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus.id, size.width, size.height]);

  const half = layout.maxExtent + 220;

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full touch-none overflow-hidden cursor-grab active:cursor-grabbing"
      onWheel={panZoom.onWheel}
      onPointerDown={panZoom.onPointerDown}
      onPointerMove={panZoom.onPointerMove}
      onPointerUp={panZoom.onPointerUp}
      onPointerLeave={panZoom.onPointerLeave}
      onDoubleClick={() => panZoom.reset()}
    >
      <div
        className="absolute inset-0"
        style={{ transform: `translate(${panZoom.transform.x}px, ${panZoom.transform.y}px) scale(${panZoom.transform.k})` }}
      >
        <AnimatePresence custom={direction}>
          <motion.div
            key={focus.id}
            className="absolute inset-0"
            custom={direction}
            variants={canvasVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <div className="absolute left-1/2 top-1/2">
              <svg
                className="absolute"
                style={{ left: -half, top: -half }}
                width={half * 2}
                height={half * 2}
              >
                <g transform={`translate(${half}, ${half})`}>
                  {layout.children.map((c) => (
                    <line
                      key={c.node.id}
                      x1={0}
                      y1={0}
                      x2={c.x}
                      y2={c.y}
                      stroke="rgba(244,238,224,0.18)"
                      strokeWidth={1.5}
                    />
                  ))}
                  {layout.grandchildren.map((g) => {
                    const parent = layout.children.find((c) => c.node.id === g.parentId);
                    if (!parent) return null;
                    return (
                      <line
                        key={g.node.id}
                        x1={parent.x}
                        y1={parent.y}
                        x2={g.x}
                        y2={g.y}
                        stroke="rgba(244,238,224,0.1)"
                        strokeWidth={1}
                      />
                    );
                  })}
                </g>
              </svg>

              <div className="absolute -translate-x-1/2 -translate-y-1/2">
                <NodeCard node={focus} role="focus" onClick={canGoUp ? onSelectFocus : undefined} />
              </div>

              {layout.children.map((c) => (
                <div
                  key={c.node.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: c.x, top: c.y }}
                >
                  <NodeCard
                    node={c.node}
                    role="child"
                    moreCount={layout.moreByParent[c.node.id]}
                    onClick={() => {
                      if (panZoom.wasDragged()) return;
                      onSelectChild(c.node);
                    }}
                  />
                </div>
              ))}

              {layout.grandchildren.map((g) => {
                const parent = layout.children.find((c) => c.node.id === g.parentId);
                if (!parent) return null;
                return (
                  <div
                    key={g.node.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: g.x, top: g.y }}
                  >
                    <NodeCard
                      node={g.node}
                      role="grandchild"
                      onClick={() => {
                        if (panZoom.wasDragged()) return;
                        onSelectGrandchild(parent.node, g.node);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="glass absolute left-5 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-1 rounded-2xl p-1.5">
        <button
          onClick={() => panZoom.zoomBy(1.25)}
          className="rounded-xl p-2 text-bone-100/80 hover:bg-white/10 hover:text-bone-50"
          aria-label="Zoom in"
        >
          <Plus size={16} />
        </button>
        <button
          onClick={() => panZoom.zoomBy(0.8)}
          className="rounded-xl p-2 text-bone-100/80 hover:bg-white/10 hover:text-bone-50"
          aria-label="Zoom out"
        >
          <Minus size={16} />
        </button>
        <button
          onClick={() => panZoom.reset()}
          className="rounded-xl p-2 text-bone-100/80 hover:bg-white/10 hover:text-bone-50"
          aria-label="Recenter"
        >
          <Scan size={16} />
        </button>
      </div>
    </div>
  );
}
