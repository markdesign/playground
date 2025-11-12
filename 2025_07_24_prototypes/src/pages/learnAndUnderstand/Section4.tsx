import { useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";

// Define interface for weather data
interface WeatherData {
    latitude: number;
    longitude: number;
    timezone: string;
    currently: {
        time: number;
        summary: string;
        icon: string;
        precipIntensity: number;
        precipProbability: number;
        temperature: number;
        apparentTemperature: number;
        dewPoint: number;
        humidity: number;
        pressure: number;
        windSpeed: number;
        windGust: number;
        windBearing: number;
        cloudCover: number;
    };
}

// add margin using <g> and transform (not used in current export but available for future use)
function SubSection1() {
    const ref = useRef(null);

    // dimensions
    const dimensions = {
        width: 800,
        height: 800,
        margin: {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50,
        },
    };

    useEffect(() => {
        if (!ref.current) return;

        async function draw() {
            // data
            await d3.json("./weatherData.json");

            // draw image
            const svg = d3
                .select(ref.current)
                .attr("width", dimensions.width)
                .attr("height", dimensions.height);

            svg.select("circle").attr("r", 15);
        }

        draw();
    }, [dimensions.width, dimensions.height]);

    return (
        <svg
            ref={ref}
            className="relative mx-auto my-6 h-[800px] w-[800px] bg-gray-100"
        >
            {/* you can use style here instead of transform */}
            <g
                transform={`translate(${dimensions.margin.left}, ${dimensions.margin.top})`}
            >
                <circle cx="0" cy="0" r="50"></circle>
            </g>
        </svg>
    );
}

// scale
// domain : smallest number to the largest.
// range : out put range or the viewing area
function SubSection2() {
    const svgRef = useRef(null);
    const chartRef = useRef(null);
    const xAxisRef = useRef(null);
    const yAxisRef = useRef(null);

    // dimensions
    const dimensions = useMemo(() => {
        const data = {
            width: 800,
            height: 600,
            margin: {
                top: 40,
                right: 40,
                bottom: 40,
                left: 40,
            },
            containerWidth: 0,
            containerHeight: 0,
        };
        data.containerWidth = data.width - data.margin.left - data.margin.right;
        data.containerHeight =
            data.height - data.margin.top - data.margin.bottom;
        return data;
    }, []);

    useEffect(() => {
        if (!svgRef.current) return;

        const xAccessor = (d: WeatherData) => d.currently.humidity;
        const yAccessor = (d: WeatherData) => d.currently.apparentTemperature;

        async function draw() {
            // const slices = [100, 200, 300, 400, 500];
            // const min = d3.min(slices) ?? 0;
            // const max = d3.max(slices) ?? 0;
            // const extent = d3.extent(slices) as [number, number];
            // const scale = d3.scaleLinear().domain(extent).range([10, 350]);
            // console.log(scale(500));

            // data
            const dataSet = (await d3.json(
                "./weatherData.json",
            )) as WeatherData[];

            // draw image
            d3.select(svgRef.current)
                .attr("width", dimensions.width)
                .attr("height", dimensions.height);

            const svgG = d3.select(chartRef.current);

            // scales
            const extentX = d3.extent(dataSet, xAccessor) as [number, number];
            const extentY = d3.extent(dataSet, yAccessor) as [number, number];

            const xScale = d3
                .scaleLinear()
                .domain(extentX)
                .rangeRound([0, dimensions.containerWidth])
                .nice()
                .clamp(true);

            const yScale = d3
                .scaleLinear()
                .domain(extentY)
                .rangeRound([dimensions.containerHeight, 0])
                .nice()
                .clamp(true);

            svgG.selectAll("circle")
                .data(dataSet)
                .join("circle")
                .attr("cx", (d) => xScale(xAccessor(d)))
                .attr("cy", (d) => yScale(yAccessor(d)))
                .attr("r", 5)
                .attr("fill", "red")
                .attr("data-temp", yAccessor);

            // axis
            const xAxis = d3
                .axisBottom(xScale)
                .tickValues([0.4, 0.5, 0.8])
                .tickFormat((d) => d * 100 + "%");
            const yAxis = d3.axisLeft(yScale);

            if (xAxisRef.current) {
                d3.select(xAxisRef.current as SVGGElement)
                    .attr(
                        "transform",
                        `translate(40, ${dimensions.containerHeight})`,
                    )
                    .call(xAxis);
            }

            if (yAxisRef.current) {
                d3.select(yAxisRef.current as SVGGElement).call(yAxis);
            }
        }

        draw();
    }, [dimensions]);

    return (
        <svg
            ref={svgRef}
            className={`relative w-[${dimensions.width}px] h-[${dimensions.height}px] bg-gray-100`}
        >
            <g
                ref={chartRef}
                transform={`translate(${dimensions.margin.left}, ${dimensions.margin.top})`}
            ></g>
            <g
                ref={xAxisRef}
                transform={`translate(${dimensions.margin.left}, ${dimensions.margin.top})`}
            >
                <text
                    className="text-base"
                    x={dimensions.containerWidth / 2}
                    y={dimensions.margin.bottom}
                    fill="black"
                    style={{ shapeRendering: "geometricPrecision" }}
                >
                    Humidity2
                </text>
            </g>
            <g
                ref={yAxisRef}
                transform={`translate(${dimensions.margin.left}, ${dimensions.margin.top})`}
            >
                <text
                    className="text-base"
                    x={-dimensions.containerHeight / 2}
                    y={-dimensions.margin.left + 15}
                    fill="black"
                    style={{
                        shapeRendering: "geometricPrecision",
                        transform: "rotate(270deg)",
                        textAnchor: "middle",
                    }}
                >
                    Temperature &deg; F
                </text>
            </g>
        </svg>
    );
}

export default function Section3() {
    return (
        <div className="flex h-full flex-col">
            <h1>section 3</h1>
            <SubSection2 />
        </div>
    );
}
