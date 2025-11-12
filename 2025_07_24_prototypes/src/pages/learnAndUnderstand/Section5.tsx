import { useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";

/*
Continous vs Discrete
- Continous - Data that can be measured
- Discrete - Data that can be counted
*/

// Scales
function SubSection38() {
    const svgRef = useRef(null);
    const groupRef = useRef(null);

    const dataSet = [
        11002, 29017, 45793, 7000, 120040, 30138, 21699, 47058, 24001, 6000, 69007, 40000, 55001,
        30001, 61150, 12000, 85530, 83000, 23100, 96225, 45003, 34300, 43000, 63131, 52001, 36000,
        10001, 225786, 0, 75000, 195100, 33010, 5000, 31213, 79050, 40010, 37002, 50000, 60000,
        66529, 39048, 27276, 28007, 153420, 44500, 145443, 89550, 16024, 50, 25001, 300577, 102035,
        20581, 170240, 126101, 18001, 15000, 4000, 0, 100003, 35000, 14001, 72046, 30000, 0, 65006,
        56000, 42000, 17158, 135096, 70040, 114068, 22216, 60020, 2742, 35030, 25000, 76005, 40600,
        48335, 58000, 900, 8000, 19002, 92000, 13000, 50008, 20000, 15100, 108023, 50600, 26483,
        38002, 53440, 32007, 25654, 80130, 20000, 9500, 1968,
    ];
    dataSet.sort((a, b) => a - b);

    // dimensions
    const dimensions = useMemo(() => {
        const data = {
            width: 600,
            height: 150,
        };
        return data;
    }, []);

    useEffect(() => {
        if (!svgRef.current) return;

        async function draw() {
            // scales
            const domain = d3.extent(dataSet) as [number, number];
            const range = ["white", "red"];
            const colorScale = d3.scaleLinear<string>().domain(domain).range(range);

            const group = d3.select(groupRef.current);
            group
                .attr("transform", "translate(2,2)")
                .attr("stroke", "black")
                .selectAll("rect")
                .data(dataSet)
                .join("rect")
                .attr("width", 26)
                .attr("height", 26)
                .attr("x", (_, i) => 30 * (i % 20))
                .attr("y", (_, i) => 30 * ((i / 20) | 0))
                .attr("fill", colorScale);
        }

        draw();
    }, []);

    return (
        <svg
            className="bg-neutral-200"
            ref={svgRef}
            width={dimensions.width}
            height={dimensions.height}
        >
            <g ref={groupRef}></g>
        </svg>
    );
}

// The scaleQuantize Scale
function SubSection41() {
    const svgRef = useRef(null);
    const groupRef = useRef(null);

    // dimensions
    const dimensions = useMemo(() => {
        const data = {
            width: 600,
            height: 150,
        };
        return data;
    }, []);

    useEffect(() => {
        if (!svgRef.current) return;

        const dataSet = [
            11002, 29017, 45793, 7000, 120040, 30138, 21699, 47058, 24001, 6000, 69007, 40000,
            55001, 30001, 61150, 12000, 85530, 83000, 23100, 96225, 45003, 34300, 43000, 63131,
            52001, 36000, 10001, 225786, 0, 75000, 195100, 33010, 5000, 31213, 79050, 40010, 37002,
            50000, 60000, 66529, 39048, 27276, 28007, 153420, 44500, 145443, 89550, 16024, 50,
            25001, 300577, 102035, 20581, 170240, 126101, 18001, 15000, 4000, 0, 100003, 35000,
            14001, 72046, 30000, 0, 65006, 56000, 42000, 17158, 135096, 70040, 114068, 22216, 60020,
            2742, 35030, 25000, 76005, 40600, 48335, 58000, 900, 8000, 19002, 92000, 13000, 50008,
            20000, 15100, 108023, 50600, 26483, 38002, 53440, 32007, 25654, 80130, 20000, 9500,
            1968,
        ];
        dataSet.sort((a, b) => a - b);

        async function draw() {
            // scales
            const colorScale = d3

                // .scaleQuantize() // scaleQuantize
                // .domain(d3.extent(dataSet)) // scaleQuantize

                // .scaleQuantile() // scaleQuantile
                // .domain(dataSet) // scaleQuantile

                .scaleThreshold<number, string>() // scaleThreshold
                .domain([45200, 135600]) // scaleThreshold

                .range(["white", "pink", "red"]);

            const group = d3.select(groupRef.current);
            group
                .attr("transform", "translate(2,2)")
                .attr("stroke", "black")
                .selectAll("rect")
                .data(dataSet)
                .join("rect")
                .attr("width", 26)
                .attr("height", 26)
                .attr("x", (_, i) => 30 * (i % 20))
                .attr("y", (_, i) => 30 * ((i / 20) | 0))
                .attr("fill", colorScale);
        }

        draw();
    }, []);

    return (
        <svg
            className="bg-neutral-200"
            ref={svgRef}
            width={dimensions.width}
            height={dimensions.height}
        >
            <g ref={groupRef}></g>
        </svg>
    );
}

export default function Section3() {
    return (
        <div className="flex h-full flex-col">
            <h1>section 5</h1>
            <SubSection41 />
        </div>
    );
}
