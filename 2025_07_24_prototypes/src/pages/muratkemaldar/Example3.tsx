import React, { useRef, useEffect, useState } from "react";

import { select, line, curveCardinal, axisBottom, axisRight, scaleLinear } from "d3";

/*
- default dimensions are always 300 x 150
*/
function Section1() {
    const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
    const svgRef = useRef(null);

    // will be called initially and on every data change
    useEffect(() => {
        const svg = select(svgRef.current);

        // SCALE:  this takes 1 - 6 and maps it over 0px - 300px
        const xScale = scaleLinear()
            .domain([0, data.length - 1])
            .range([0, 300]);

        // SCALE: this takes 0 - 150 and maps it over 150px - 0px
        const yScale = scaleLinear().domain([0, 150]).range([150, 0]);

        // AxisBottom visual
        const xAxis = axisBottom(xScale)
            .ticks(data.length) // control how many ticks
            .tickFormat((index) => String(Number(index) + 1)); // control formatting of label

        // put it inside the <g> jsx element. same as xAxis(".x-axis")
        svg.select<SVGGElement>(".x-axis").style("transform", "translateY(150px)").call(xAxis);

        const yAxis = axisRight(yScale);

        svg.select<SVGGElement>(".y-axis").style("transform", "translateX(300px)").call(yAxis);

        // line function used for .attr('d', () => {});
        const myLine = line<number>()
            .x((_, index) => xScale(index))
            .y((d) => yScale(d));
        // .curve(curveCardinal);

        svg.selectAll(".line") // this will create element with class .line, if you use "path" it will create it inside the <g className="x-axis" />
            .data([data])
            .join("path")
            .attr("class", "line") // select the exisiting line or d3 will end up recreating it. weird.
            .attr("d", myLine)
            .attr("fill", "none")
            .attr("stroke", "blue");
    }, [data]);

    return (
        <div className="m-4">
            <svg ref={svgRef} className="overflow-visible border-1 bg-neutral-200">
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
            <br />
            <button className="m-2 border-1 p-2" onClick={() => setData(data.map((value) => value + 5))}>
                Update data
            </button>
            <button className="m-2 border-1 p-2" onClick={() => setData(data.filter((value) => value < 35))}>
                Filter data
            </button>
        </div>
    );
}

export default function Example3() {
    return (
        <div>
            <Section1 />
        </div>
    );
}
