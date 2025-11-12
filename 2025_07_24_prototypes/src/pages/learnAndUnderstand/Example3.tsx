import { useEffect, useRef } from "react";
import * as d3 from "d3";

type BarChartProps = {
    data: number[];
    width?: number;
    height?: number;
};

function Section({ data, width = 300, height = 150 }: BarChartProps) {
    const ref = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!ref.current) return;

        const svg = d3.select(ref.current);
        svg.selectAll("*").remove();

        const x = d3
            .scaleBand()
            .domain(data.map((_, i) => i.toString()))
            .range([0, width])
            .padding(0.1);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data) ?? 0])
            .nice()
            .range([height, 0]);

        svg.append("g")
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", (_, i) => x(i.toString())!)
            .attr("y", (d) => y(d))
            .attr("width", x.bandwidth())
            .attr("height", (d) => height - y(d))
            .attr("fill", "#3b82f6"); // Tailwind blue-500
    }, [data, width, height]);

    return <svg ref={ref} width={width} height={height} className="mx-auto my-4 shadow" />;
}

export default function Example3() {
    return (
        <div>
            <Section data={[10, 25, 30, 45, 20, 35, 50, 40, 60, 55]} />
        </div>
    );
}
