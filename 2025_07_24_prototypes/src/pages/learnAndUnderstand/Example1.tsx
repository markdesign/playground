import { scaleLinear, extent, line } from "d3";

interface SectionProps {
    data?: number[];
}

function Section(props: SectionProps) {
    const { data = [] } = props;

    const width = 640;
    const height = 400;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 30;
    const marginLeft = 40;

    if (!data || data.length === 0) {
        return null;
    }

    const x = scaleLinear(
        [0, data.length - 1],
        [marginLeft, width - marginRight],
    );

    const extentData = extent(data);

    const y = scaleLinear(extentData, [height - marginBottom, marginTop]);

    const d3Line = line((_, i) => x(i), y);

    return (
        <svg width={width} height={height} className="border-2">
            <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                d={d3Line(data)}
            />
            <g fill="white" stroke="currentColor" strokeWidth="1.5">
                {data.map((d: number, i: number) => (
                    <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
                ))}
            </g>
        </svg>
    );
}

export default function Example1() {
    return (
        <div>
            <Section data={[10, 25, 30, 45, 20, 35, 50, 40, 60, 55]} />
        </div>
    );
}
