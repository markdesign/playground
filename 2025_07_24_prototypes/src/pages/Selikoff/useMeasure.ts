import { useRef, useState, useLayoutEffect } from "react";

type UseMeasureResult<T extends HTMLElement> = [React.RefObject<T | null>, DOMRectReadOnly];

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

export default function useMeasure<T extends HTMLElement>(): UseMeasureResult<T> {
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
    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;
        const observer = new ResizeObserver((entries) => {
            if (entries.length > 0) {
                const newBounds = entries[0].contentRect;
                setBounds(newBounds);
            }
        });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    return [ref, bounds];
}
