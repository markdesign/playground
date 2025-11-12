import { useRef, useEffect, useState } from "react";

import { select, axisBottom, axisRight, scaleLinear, scaleBand } from "d3";

function Section1() {
    const [data, setData] = useState([10, 30, 45, 60, 20, 65, 140]);
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = select(svgRef.current);

        // scales
        const incrementingArray = [...data.keys()].map(String);
        const xScale = scaleBand().domain(incrementingArray).range([0, 300]).padding(0.5);
        const xAxis = axisBottom(xScale).ticks(data.length);
        svg.select<SVGGElement>(".x-axis").style("transform", "translateY(150px)").call(xAxis);

        const yScale = scaleLinear().domain([0, 150]).range([150, 0]);
        const yAxis = axisRight(yScale);
        svg.select<SVGGElement>(".y-axis").style("transform", "translateX(300px)").call(yAxis);

        const colorScale = scaleLinear<string>().domain([75, 100, 150]).range(["green", "orange", "red"]).clamp(true);

        // draw the bars
        svg.selectAll(".bar")
            .data(data)
            .join("rect")
            .attr("class", "bar")
            .style("transform", "scale(1, -1)")
            .attr("x", (_, index) => xScale(index.toString()) ?? 0)
            .attr("y", -150)
            .attr("width", xScale.bandwidth())
            .on("mouseenter", (event, value) => {
                // events have changed in d3 v6:
                // https://observablehq.com/@d3/d3v6-migration-guide#events
                const index = svg.selectAll(".bar").nodes().indexOf(event.target);
                svg.selectAll(".tooltip")
                    .data([value])
                    .join((enter) => enter.append("text").attr("y", yScale(value) - 4))
                    .attr("class", "tooltip")
                    .text(value)
                    .attr("x", (xScale(index.toString()) ?? 0) + xScale.bandwidth() / 2)
                    .attr("text-anchor", "middle")
                    .transition()
                    .attr("y", yScale(value) - 8)
                    .attr("opacity", 1);
            })
            .on("mouseleave", () => svg.select(".tooltip").remove())
            .transition()
            .attr("fill", colorScale)
            .attr("height", (value) => 150 - yScale(value));
    }, [data]);

    return (
        <div className="m-4">
            <svg ref={svgRef} className="overflow-visible border-1 bg-neutral-200">
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
            <br />
            <div>
                <button className="m-2 border-1 p-2" onClick={() => setData(data.map((value) => value + 5))}>
                    Update data
                </button>
                <button className="m-2 border-1 p-2" onClick={() => setData(data.filter((value) => value < 50))}>
                    Filter data
                </button>
                <button
                    className="m-2 border-1 p-2"
                    onClick={() => setData([...data, Math.round(Math.random() * 100)])}
                >
                    Add data
                </button>
            </div>
        </div>
    );
}

export default function Example5() {
    return (
        <div>
            <Section1 />
        </div>
    );
}
