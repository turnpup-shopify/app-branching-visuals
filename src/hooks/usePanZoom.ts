import { useCallback, useRef, useState } from "react";

export interface Transform {
  x: number;
  y: number;
  k: number;
}

const MIN_K = 0.35;
const MAX_K = 2.5;

const clampK = (k: number) => Math.min(MAX_K, Math.max(MIN_K, k));

export function usePanZoom(initial: Transform = { x: 0, y: 0, k: 1 }) {
  const [transform, setTransform] = useState<Transform>(initial);
  const dragging = useRef<{ startX: number; startY: number; origin: Transform } | null>(null);
  const pointerMoved = useRef(false);

  const onWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const container = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - container.left - container.width / 2;
    const cy = e.clientY - container.top - container.height / 2;

    setTransform((t) => {
      const nextK = clampK(t.k * Math.exp(-e.deltaY * 0.0015));
      const scaleRatio = nextK / t.k;
      return {
        k: nextK,
        x: cx - (cx - t.x) * scaleRatio,
        y: cy - (cy - t.y) * scaleRatio,
      };
    });
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    pointerMoved.current = false;
    dragging.current = { startX: e.clientX, startY: e.clientY, origin: transform };
  }, [transform]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const dx = e.clientX - dragging.current.startX;
    const dy = e.clientY - dragging.current.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) pointerMoved.current = true;
    setTransform({ ...dragging.current.origin, x: dragging.current.origin.x + dx, y: dragging.current.origin.y + dy });
  }, []);

  const endDrag = useCallback(() => {
    dragging.current = null;
  }, []);

  const reset = useCallback((next: Transform = { x: 0, y: 0, k: 1 }) => {
    setTransform(next);
  }, []);

  const zoomBy = useCallback((factor: number) => {
    setTransform((t) => ({ ...t, k: clampK(t.k * factor) }));
  }, []);

  const wasDragged = () => pointerMoved.current;

  return {
    transform,
    setTransform,
    onWheel,
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerLeave: endDrag,
    reset,
    zoomBy,
    wasDragged,
  };
}
