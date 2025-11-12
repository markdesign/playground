import { useRef, useEffect, useState } from "react";

import { select, axisBottom, axisRight, scaleLinear, scaleBand } from "d3";

interface Dimensions {
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
    x: number;
    y: number;
}

const useResizeObserver = (ref: React.RefObject<HTMLElement | null>): Dimensions | null => {
    const [dimensions, setDimensions] = useState<Dimensions | null>(null);
    useEffect(() => {
        const observeTarget = ref.current;
        if (!observeTarget) return;

        const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
            entries.forEach((entry: ResizeObserverEntry) => {
                setDimensions(entry.contentRect as Dimensions);
            });
        });
        resizeObserver.observe(observeTarget);
        return () => {
            resizeObserver.unobserve(observeTarget);
        };
    }, [ref]);
    return dimensions;
};

function BarChart({ data }: { data: number[] }) {
    const svgRef = useRef(null);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const dimensions = useResizeObserver(wrapperRef);

    useEffect(() => {
        const svg = select(svgRef.current);

        if (!dimensions) return;

        console.log("[Example6.tsx 47] dimensions : ", dimensions);

        // scales
        const incrementingArray = [...data.keys()].map(String);
        const xScale = scaleBand().domain(incrementingArray).range([0, dimensions.width]).padding(0.5);
        const xAxis = axisBottom(xScale).ticks(data.length);
        svg.select<SVGGElement>(".x-axis").style("transform", `translateY(${dimensions.height}px)`).call(xAxis);

        const yScale = scaleLinear().domain([0, dimensions.height]).range([dimensions.height, 0]);
        const yAxis = axisRight(yScale);
        svg.select<SVGGElement>(".y-axis").style("transform", `translateX(${dimensions.width}px)`).call(yAxis);

        const colorScale = scaleLinear<string>().domain([75, 100, 150]).range(["green", "orange", "red"]).clamp(true);

        // draw the bars
        svg.selectAll(".bar")
            .data(data)
            .join("rect")
            .attr("class", "bar")
            .style("transform", "scale(1, -1)")
            .attr("x", (_, index) => xScale(index.toString()) ?? 0)
            .attr("y", -dimensions.height)
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
            .attr("height", (value) => dimensions.height - yScale(value));
    }, [data, dimensions]);

    return (
        <div ref={wrapperRef} className="h-full w-full">
            <svg ref={svgRef} className="block h-full w-full overflow-visible bg-neutral-300">
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
        </div>
    );
}

function Section1() {
    const [data, setData] = useState([25, 30, 45, 60, 10, 65, 75]);

    return (
        <div className="flex flex-col gap-8 p-10">
            <BarChart data={data} />
            <div>
                <button className="m-2 border-1 p-2" onClick={() => setData(data.map((value) => value + 5))}>
                    Update data
                </button>
                <button className="m-2 border-1 p-2" onClick={() => setData(data.filter((value) => value < 35))}>
                    Filter data
                </button>
                <button
                    className="m-2 border-1 p-2"
                    onClick={() => setData([...data, Math.round(Math.random() * 100)])}
                >
                    Add data
                </button>
                <a href="https://www.google.com/maps/@37.5650337,126.9783745,15z" title="Google Maps view of Seoul">
                    Hover me for tooltip
                </a>
            </div>
        </div>
    );
}

export default function Example() {
    return <Section1 />;
}
