import { useRef, useEffect } from "react";

import { select } from "d3";

function Section2() {
    const svgRef = useRef(null);

    useEffect(() => {
        const data = [25, 20, 10, 12, 15];

        const svg = select(svgRef.current);

        svg.selectAll("circle")
            .data(data)
            .join("circle")
            .attr("cx", (d, i) => {
                console.log("item" + d, "index" + i);
                return i * 100;
            })
            .attr("cy", 250)
            .attr("r", 20)
            .attr("fill", "red");
    }, []);

    return (
        <div>
            <svg ref={svgRef} className="h-[400px] w-[400px] bg-neutral-200"></svg>
        </div>
    );
}

export default function Example2() {
    return (
        <div className="m-4 flex flex-col">
            <Section2 />
        </div>
    );
}
