// https://www.pluralsight.com/resources/blog/guides/using-d3js-inside-a-react-app

import { useRef } from "react";

import * as d3 from "d3";

type DataItem = {
    year: number;
    efficiency: number;
    sales: number;
};

const data: DataItem[] = [
    { year: 1980, efficiency: 24.3, sales: 8949000 },
    { year: 1985, efficiency: 27.6, sales: 10979000 },
    { year: 1990, efficiency: 28, sales: 9303000 },
    { year: 1991, efficiency: 28.4, sales: 8185000 },
    { year: 1992, efficiency: 27.9, sales: 8213000 },
    { year: 1993, efficiency: 28.4, sales: 8518000 },
    { year: 1994, efficiency: 28.3, sales: 8991000 },
    { year: 1995, efficiency: 28.6, sales: 8620000 },
    { year: 1996, efficiency: 28.5, sales: 8479000 },
    { year: 1997, efficiency: 28.7, sales: 8217000 },
    { year: 1998, efficiency: 28.8, sales: 8085000 },
    { year: 1999, efficiency: 28.3, sales: 8638000 },
    { year: 2000, efficiency: 28.5, sales: 8778000 },
    { year: 2001, efficiency: 28.8, sales: 8352000 },
    { year: 2002, efficiency: 29, sales: 8042000 },
    { year: 2003, efficiency: 29.5, sales: 7556000 },
    { year: 2004, efficiency: 29.5, sales: 7483000 },
    { year: 2005, efficiency: 30.3, sales: 7660000 },
    { year: 2006, efficiency: 30.1, sales: 7762000 },
    { year: 2007, efficiency: 31.2, sales: 7562000 },
    { year: 2008, efficiency: 31.5, sales: 6769000 },
    { year: 2009, efficiency: 32.9, sales: 5402000 },
    { year: 2010, efficiency: 33.9, sales: 5636000 },
    { year: 2011, efficiency: 33.1, sales: 6093000 },
    { year: 2012, efficiency: 35.3, sales: 7245000 },
    { year: 2013, efficiency: 36.4, sales: 7586000 },
    { year: 2014, efficiency: 36.5, sales: 7708000 },
    { year: 2015, efficiency: 37.2, sales: 7517000 },
    { year: 2016, efficiency: 37.7, sales: 6873000 },
    { year: 2017, efficiency: 39.4, sales: 6081000 },
];

interface BarChartProps {
    data: DataItem[];
}

function BarChart({ data }: BarChartProps) {
    const ref = useRef<SVGSVGElement | null>(null);

    const height = 500;
    const width = 800;
    const margin = { top: 100, right: 0, bottom: 30, left: 100 };

    const svg = d3.select(ref.current);

    //----------------------------
    // X Scale
    //----------------------------
    const xDomain = data.map((d: DataItem) => d.year); // [ 1980, 1985, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]
    const x = d3
        .scaleBand<number>()
        .domain(xDomain)
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);
    const xExtent = d3.extent(xDomain); // [ 1980, 2017 ]
    // This code creates a set of axis tick values that are evenly spaced and only includes those that actually exist in your data and x scale. This keeps your axis clean and readable.
    const xTickValues =
        xExtent[0] !== undefined && xExtent[1] !== undefined
            ? d3.ticks(xExtent[0], xExtent[1], Math.floor(width / 40)).filter((v) => x(v) !== undefined) // d3.ticks(xExtent[0], xExtent[1], Math.floor(width / 40)) generates a sub section
            : xDomain; // [ 1980, 1990, 1992, 1994, 1996, 1998, 2000, 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016 ]
            //logb
    const xAxis = (g: d3.Selection<SVGGElement, unknown, null, undefined>) => {
        return g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickValues(xTickValues)); // xTickValues gets subset of data based on x, so you have to filter((v) => x(v) !== undefined)
    };
    svg.select<SVGGElement>(".x-axis").call(xAxis);

    //----------------------------
    // Y Scale
    //----------------------------
    const yMax = d3.max(data, (d: DataItem) => d.sales) ?? 0; // 10979000
    const yDomain = [0, yMax]; //  [ 0, 10979000 ]
    const y = d3
        .scaleLinear()
        .domain(yDomain)
        .rangeRound([height - margin.bottom, margin.top]);
    const yAxis = (g: d3.Selection<SVGGElement, unknown, null, undefined>) => {
        return g
            .attr("transform", `translate(${margin.left},0)`) // Moves the y-axis group to the left margin of the chart.
            .style("color", "steelblue") // Sets the color of the axis and its ticks to steel blue.
            .call(d3.axisLeft(y).ticks(undefined, "s")) // Draws the y-axis using the D3 scale y. The ticks are formatted with SI-prefixes (e.g., "k" for thousands, "m" for million). undefined will choose resonable default.
            .call((g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
                g.select(".domain").remove(),
            ) // Removes the axis line ("domain") for a cleaner look.
            .call((g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
                g
                    .append("text")
                    .attr("x", -margin.left)
                    .attr("y", (_, i) => i * 10)
                    .attr("fill", "currentColor")
                    .attr("text-anchor", "start")
                    .text("Sales"),
            ); //  Adds a label "Sales" to the y-axis. Positions the label at the top left of the axis, with some padding.
    };
    svg.select<SVGGElement>(".y-axis").call(yAxis);

    //----------------------------
    // Bar
    //----------------------------
    svg.select<SVGGElement>(".plot-area")
        .attr("fill", "steelblue")
        .selectAll<SVGRectElement, DataItem>(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d: DataItem) => x(d.year) ?? 0)
        .attr("width", x.bandwidth())
        .attr("y", (d: DataItem) => y(d.sales))
        .attr("height", (d: DataItem) => y(0) - y(d.sales));

    return (
        <svg ref={ref as React.RefObject<SVGSVGElement>} className="mr-0 ml-0 h-[500px] w-full">
            <g className="plot-area" />
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
    );
}

/*
<text>
*/
export default function Example2() {
    return (
        <div>
            <BarChart data={data} />
        </div>
    );
}
