import { useRef } from "react";
import { eachDayOfInterval, endOfDay, format, isSameDay, parseISO, startOfDay } from "date-fns";
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
        { date: parseISO("2025-08-11T19:04:56.728Z"), estimatedMax: 195 },
        { date: parseISO("2025-08-12T04:25:37.916Z"), estimatedMax: 185 },
        { date: parseISO("2025-08-12T16:00:12.292Z"), estimatedMax: 205 },
        { date: parseISO("2025-08-12T17:08:53.024Z"), estimatedMax: 200 },
        { date: parseISO("2025-08-12T21:26:29.660Z"), estimatedMax: 210 },
        { date: parseISO("2025-08-13T10:00:00.000Z"), estimatedMax: 200 },
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

    // Use exact first/last timestamps so first point is far-left and last is far-right
    const [xMin, xMax] = d3.extent(data, (d) => d.date) as [Date, Date];

    // Day boundaries for grid/labels
    const startDay = startOfDay(xMin);
    const endDay = endOfDay(xMax);
    const days = eachDayOfInterval({ start: startDay, end: endDay });

    const leftEdge = dimensions.margin;
    const rightEdge = dimensions.width - dimensions.margin;

    // Equal-width day bands via band scale
    const DAY_MS = 24 * 60 * 60 * 1000;
    const dayKeys = days.map((d) => +d); // numeric keys for band scale
    const bandX = d3
        .scaleBand<number>()
        .domain(dayKeys)
        .range([leftEdge, rightEdge])
        .paddingInner(0)
        .paddingOuter(0);
    const bandW = bandX.bandwidth();

    // Position within a day (0..1) based on time-of-day
    const xPos = (date: Date) => {
        const dayKey = +startOfDay(date);
        const bandLeft = bandX(dayKey);
        if (bandLeft == null) return leftEdge;
        const frac = (date.getTime() - dayKey) / DAY_MS;
        return bandLeft + frac * bandW;
    };

    // Y scale
    const yData = data.map((d) => d.estimatedMax);
    const yMinMax = d3.extent(yData) as [number, number];
    const yScale = d3
        .scaleLinear()
        .domain(yMinMax)
        .range([dimensions.height - dimensions.margin, dimensions.margin]);

    const line = d3
        .line<{ date: Date; estimatedMax: number }>()
        .x((d) => xPos(d.date))
        .y((d) => yScale(d.estimatedMax));

    const result = line(data);

    return (
        <svg
            ref={svgRef}
            className="overflow-visible bg-neutral-200 text-red-500"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        >
            {/* X axis (equal-width day bands + labels) */}
            {days.map((day, i) => {
                const key = +day;
                const x = bandX(key);
                if (x == null) return null;
                return (
                    <g
                        key={`${day.toISOString()}_${i}`}
                        className="text-gray-400"
                        transform={`translate(${x},0)`}
                    >
                        {i % 2 === 1 && (
                            <rect
                                width={bandW}
                                height={dimensions.height - dimensions.margin}
                                fill="currentColor"
                                className="text-gray-100"
                            />
                        )}
                        <text
                            x={bandW / 2}
                            y={dimensions.height - 5}
                            textAnchor="middle"
                            fill="currentColor"
                            className="text-[10px]"
                        >
                            {format(day, "M/dd/yyyy")}
                        </text>
                    </g>
                );
            })}

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
            {data.map((d, idx) => (
                <circle
                    key={idx}
                    fill="currentColor"
                    r="10"
                    cx={xPos(d.date)}
                    cy={yScale(d.estimatedMax)}
                    stroke={
                        days.findIndex((day) => isSameDay(day, d.date)) % 2 === 1
                            ? "#f5f5f4"
                            : "white"
                    }
                    strokeWidth={4}
                />
            ))}
        </svg>
    );
}
