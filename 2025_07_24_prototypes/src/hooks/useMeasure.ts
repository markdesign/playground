import { useLayoutEffect, useRef, useState, useCallback } from 'react';

type UseMeasureResult<T extends Element> = [React.RefObject<T | null>, DOMRectReadOnly];

type DOMRectReadOnly = {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly top: number;
    readonly right: number;
    readonly bottom: number;
    readonly left: number;
};

/**
 * Custom hook for measuring element dimensions using ResizeObserver
 *
 * @returns A tuple containing a ref to attach to the element and the current bounds
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import { useMeasure } from '@repo/utils/hooks/useMeasure';
 *
 * // For div elements
 * const [divRef, bounds] = useMeasure<HTMLDivElement>();
 *
 * // For canvas elements
 * const [canvasRef, canvasBounds] = useMeasure<HTMLCanvasElement>();
 *
 * // For svg elements
 * const [svgRef, svgBounds] = useMeasure<SVGSVGElement>();
 *
 * return (
 *   <>
 *     <div ref={divRef}>
 *       Width: {bounds.width}, Height: {bounds.height}
 *     </div>
 *     <canvas
 *       ref={canvasRef}
 *       width={canvasBounds.width}
 *       height={canvasBounds.height}
 *     />
 *     <svg ref={svgRef} width={svgBounds.width} height={svgBounds.height} />
 *   </>
 * )
 * ```
 */
export const useMeasure = <T extends Element>(): UseMeasureResult<T> => {
    const ref = useRef<T>(null);
    const [bounds, setBounds] = useState<DOMRectReadOnly>({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    });

    const updateBounds = useCallback((entries: ResizeObserverEntry[]) => {
        if (entries.length > 0) {
            const entry = entries[0];
            const newBounds = entry.contentRect;
            setBounds({
                x: newBounds.x,
                y: newBounds.y,
                width: newBounds.width,
                height: newBounds.height,
                top: newBounds.top,
                right: newBounds.right,
                bottom: newBounds.bottom,
                left: newBounds.left,
            });
        }
    }, []);

    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;
        if (typeof ResizeObserver === 'undefined') {
            console.warn('ResizeObserver is not supported in this environment');
            return;
        }
        const observer = new ResizeObserver(updateBounds);
        try {
            observer.observe(element);
        } catch (error) {
            console.error('Failed to observe element:', error);
            return;
        }
        return () => {
            try {
                observer.disconnect();
            } catch (error) {
                console.error('Failed to disconnect observer:', error);
            }
        };
    }, [updateBounds]);

    return [ref, bounds];
};
