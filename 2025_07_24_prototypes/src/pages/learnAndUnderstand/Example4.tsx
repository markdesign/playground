import { useEffect, useRef } from "react";
import * as d3 from "d3";

function AxisTop() {
    const axisRef = useRef(null);

    const width = 300;
    const height = 50;

    const marginRight = 20;
    const marginLeft = 20;

    useEffect(() => {
        if (!axisRef.current) return;
        const scale = d3
            .scaleLinear()
            .domain([0, 100])
            .range([marginLeft, width - marginRight]);
        const axis = d3.axisTop(scale);
        d3.select(axisRef.current).call(axis);
    }, [marginLeft, marginRight, width]);

    return (
        <div className="w-fit border-2">
            <svg width={width} height={height}>
                <g ref={axisRef} transform="translate(0,30)" />
            </svg>
        </div>
    );
}

export default function Example4() {
    return (
        <div>
            <AxisTop />
        </div>
    );
}
