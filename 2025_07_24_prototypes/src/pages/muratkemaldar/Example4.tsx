import { useRef, useEffect, useState } from "react";

import { select, axisBottom, axisRight, scaleLinear, scaleBand, scaleOrdinal } from "d3";

function Section1() {
    const [data, setData] = useState([0, 30, 45, 60, 20, 65, 150]);
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = select(svgRef.current);

        const dimensions = {
            width: 300,
            height: 150,
        };

        // X
        const incrementingArray = [...data.keys()].map(String); // ["0", "1", "2", "3", "4", "5", "6"]
        const xScale = scaleBand() // scaleBand is like a scaleLinear, but bands for bar charts
            .domain(incrementingArray)
            .range([0, 300])
            .padding(0.5);
        const xAxis = axisBottom(xScale).ticks(data.length);
        svg.select<SVGGElement>(".x-axis").style("transform", "translateY(150px)").call(xAxis);

        // Y
        const yScale = scaleLinear().domain([0, 150]).range([150, 0]);
        const yAxis = axisRight(yScale);
        svg.select<SVGGElement>(".y-axis").style("transform", "translateX(300px)").call(yAxis);

        //  scaleOrdinal give you direct colors, vs scaleLinear will give you in between colors
        const colorScale = scaleOrdinal().domain(["75", "100", "150"]).range(["green", "orange", "red"]);

        // Bart chart
        svg.selectAll(".bar") // d3 does not select .bar if it does not exist. it creates empty and used with join
            .data(data)
            .join("rect")
            .attr("class", "bar")
            .style("transform", "scale(1, -1)") // Here we are flipping the bar so the animation is right direction
            .attr("x", (_, index) => xScale(index.toString()) ?? 0)
            .attr("y", -150) // Here we are flipping the bar so the animation is right direction
            .attr("width", xScale.bandwidth()) // bandWidth gives you the width of the bar in the bar chart
            .transition()
            .attr("fill", (value) => colorScale(value.toString()) as string)
            .attr("height", (value) => dimensions.height - yScale(value));
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
            </div>
        </div>
    );
}

export default function Example4() {
    return (
        <div>
            <Section1 />
        </div>
    );
}
