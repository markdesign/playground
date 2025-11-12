import { useRef, useEffect, useState } from "react";

import { select, line, curveCardinal } from "d3";

function Section1() {
    const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = select(svgRef.current);

        svg.selectAll("circle")
            .data(data)
            .join("circle")
            .attr("r", (value) => value)
            .attr("cx", (value) => value * 2)
            .attr("cy", (value) => value * 2)
            .attr("stroke", "red");
    }, [data]);

    return (
        <div>
            <svg ref={svgRef}></svg>
            <br />
            <button
                onClick={() => setData(data.map((value) => value + 5))}
                className="bg-blue-500 px-4 py-2 text-white"
            >
                Update
            </button>
            <button
                onClick={() => setData(data.filter((value) => value < 50))}
                className="bg-red-500 px-4 py-2 text-white"
            >
                Filter
            </button>
        </div>
    );
}

function Section2() {
    const [data, setData] = useState([0, 30, 45, 60, 20, 65, 150]);
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = select(svgRef.current);

        const myLine = line<number>()
            .x((_, index) => index * 50)
            .y((value) => value)
            .curve(curveCardinal);

        svg.selectAll("path") // path is an svg element <path d="" fill="" stroke="" />
            .data([data]) //  The array wrapper [data] is D3's way of saying "create one thing that contains everything" rather than "create many things from everything."
            .join("path")
            // .attr("d", (value) => myLine(value)) // here you can just pass in line
            .attr("d", myLine) // here you can just pass in line
            .attr("fill", "none")
            .attr("stroke", "red");
    }, [data]);

    return (
        <div>
            <svg ref={svgRef} className="bg-neutral-200"></svg>

            <br />

            <button
                onClick={() => setData(data.map((value) => value + 5))}
                className="bg-blue-500 px-4 py-2 text-white"
            >
                Update
            </button>
            <button
                onClick={() => setData(data.filter((value) => value < 50))}
                className="bg-red-500 px-4 py-2 text-white"
            >
                Filter
            </button>
        </div>
    );
}

export default function Example2() {
    return (
        <div className="m-4 flex flex-col">
            <Section1 />
            <br />
            <Section2 />
        </div>
    );
}
