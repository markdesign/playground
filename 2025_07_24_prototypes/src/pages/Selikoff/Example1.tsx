// @ts-ignore
import { useRef } from "react";
import {
    eachMonthOfInterval,
    endOfMonth,
    format,
    isSameMonth,
    parseISO,
    startOfMonth,
} from "date-fns";
import * as d3 from "d3";
import useMeasure from "./useMeasure";

type MyChartProps = {
    data: {
        date: Date;
        estimatedMax: number;
    }[];
    width?: number;
    height?: number;
};

export default function Example() {
    const [ref, bounds] = useMeasure<HTMLDivElement>();

    const mockEntries = [
        { date: parseISO("2024-01-01"), estimatedMax: 185 },
        { date: parseISO("2024-02-15"), estimatedMax: 200 },
        { date: parseISO("2024-03-22"), estimatedMax: 195 },
        { date: parseISO("2024-04-25"), estimatedMax: 205 },
        { date: parseISO("2024-05-01"), estimatedMax: 200 },
        { date: parseISO("2024-06-29"), estimatedMax: 210 },
    ];

    return (
        <div className="relative h-full w-full border-2 p-10" ref={ref}>
            {bounds.width > 0 && (
                <ChartInner data={mockEntries} width={bounds.width} height={bounds.height} />
            )}
        </div>
    );
}

function ChartInner({ data, width, height }: MyChartProps) {
    const svgRef = useRef(null);

    const dimensions = {
        width: width ?? 800,
        height: height ?? 400,
        margin: 40,
    };

    const startDay = startOfMonth(data.at(0)?.date ?? new Date());
    const endDay = endOfMonth(data.at(-1)?.date ?? new Date());
    const months = eachMonthOfInterval({ start: startDay, end: endDay });

    // X scale
    const xScale = d3
        .scaleTime()
        .domain([startDay, endDay])
        .range([0 + dimensions.margin, dimensions.width - dimensions.margin]);

    // Y scalec
    const yData = data.map((d) => d.estimatedMax);
    const yMinMax = d3.extent(yData) as [number, number];
    const yScale = d3
        .scaleLinear()
        .domain(yMinMax)
        .range([dimensions.height - dimensions.margin, 0 + dimensions.margin]);

    const line = d3
        .line<{ date: Date; estimatedMax: number }>()
        .x((d) => {
            const result = xScale(d.date);
            return result;
        })
        .y((d) => yScale(d.estimatedMax)); // reverse y coordinate to start from bottom
    const result = line(data);

    return (
        <svg
            ref={svgRef}
            className="overflow-visible bg-neutral-200 text-red-500"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        >
            {/* X axis */}
            {months.map((month, i) => (
                <g
                    key={`${month}_${i}`}
                    className="text-gray-400"
                    transform={`translate(${xScale(month)},0)`}
                >
                    {i % 2 === 1 && (
                        <rect
                            width={xScale(endOfMonth(month)) - xScale(month)}
                            height={dimensions.height - dimensions.margin}
                            fill="currentColor"
                            className="text-gray-100"
                        />
                    )}
                    <text
                        x={(xScale(endOfMonth(month)) - xScale(month)) / 2}
                        y={dimensions.height - 5}
                        textAnchor="middle"
                        fill="currentColor"
                        className="text-[10px]"
                    >
                        {format(month, "MMM")}
                    </text>
                </g>
            ))}

            {/* Y axis */}
            {yScale.ticks(5).map((max) => (
                <g
                    fill="red"
                    transform={`translate(10,${yScale(max)})`}
                    className="text-gray-400"
                    key={max}
                >
                    <line
                        x1={0}
                        x2={dimensions.width - dimensions.margin}
                        stroke="currentColor"
                        strokeDasharray="1,3"
                    />
                    <text alignmentBaseline="middle" className="text-[10px]" fill="currentColor">
                        {max}
                    </text>
                </g>
            ))}

            {/* Line Chart */}
            <path d={result || ""} fill="none" stroke="currentColor" strokeWidth={4} />

            {/* Circles */}
            {data.map((d) => {
                return (
                    <circle
                        fill="currentColor"
                        r="10"
                        cx={xScale(d.date)}
                        cy={yScale(d.estimatedMax)}
                        stroke={
                            months.findIndex((m) => isSameMonth(m, d.date)) % 2 === 1
                                ? "#f5f5f4"
                                : "white"
                        }
                        strokeWidth={4}
                    />
                );
            })}
        </svg>
    );
}
