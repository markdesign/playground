// https://www.react-graph-gallery.com/arc-diagram

import * as d3 from "d3";

export const ArcDiagram = () => {
    const COLORS = ["#e0ac2b", "#e85252", "#6689c6", "#9a6fb0", "#a53253"];
    const MARGIN = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = 800;
    const height = 400;
    const data = {
        tags: [
            { id: "Myriel", group: "team1" },
            { id: "Anne", group: "team1" },
            { id: "Gabriel", group: "team1" },
            { id: "Mel", group: "team1" },
            { id: "Yan", group: "team2" },
            { id: "Tom", group: "team2" },
            { id: "Cyril", group: "team2" },
            { id: "Tuck", group: "team2" },
            { id: "Antoine", group: "team3" },
            { id: "Rob", group: "team3" },
        ],
        edges: [
            { source: "Anne", target: "Myriel" },
            { source: "Napoleon", target: "Myriel" },
            { source: "Gabriel", target: "Myriel" },
            { source: "Mel", target: "Myriel" },
            { source: "Yan", target: "Tom" },
            { source: "Tom", target: "Cyril" },
            { source: "Tuck", target: "Myriel" },
            { source: "Tuck", target: "Mel" },
            { source: "Tuck", target: "Myriel" },
            { source: "Mel", target: "Myriel" },
            { source: "Rob", target: "Antoine" },
        ],
    };
    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;

    //
    // Compute the nodes
    //
    const allNodeNames = data.tags.map((node) => node.id); // ['Myriel', 'Anne', 'Gabriel', 'Mel', 'Yan', 'Tom', 'Cyril', 'Tuck', 'Antoine', 'Rob']
    const allNodeGroups = [...new Set(data.tags.map((node) => node.group))]; // ['team1', 'team2', 'team3']

    const xScale = d3.scalePoint().range([0, boundsWidth]).domain(allNodeNames);
    const colorScale = d3.scaleOrdinal<string>().domain(allNodeGroups).range(COLORS);

    const allTags = data.tags.map((d) => {
        return (
            <circle
                key={d.id}
                cx={xScale(d.id)}
                cy={boundsHeight}
                r={8}
                fill={colorScale(d.group)}
            />
        );
    });

    //
    // Compute the links
    //
    const horizontalArcGenerator = (xStart: number, yStart: number, xEnd: number, yEnd: number) => {
        return [
            "M", // Move to the starting point (xStart, yStart).
            xStart,
            yStart,
            "A",
            (xStart - xEnd) / 2,
            (xStart - xEnd) / 2,
            0,
            1,
            xStart < xEnd ? 1 : 0,
            xEnd,
            ",",
            yEnd,
        ].join(" ");
    };

    const allLinks = data.edges.map((link, i) => {
        const xStart = xScale(link.source);
        const xEnd = xScale(link.target);
        if (typeof xStart === "undefined" || typeof xEnd === "undefined") {
            return;
        }
        return (
            <path
                key={i}
                d={horizontalArcGenerator(xStart, boundsHeight, xEnd, boundsHeight)}
                stroke="black"
                fill="none"
            />
        );
    });

    return (
        <svg width={width} height={height} className="bg-neutral-200">
            <g
                width={boundsWidth}
                height={boundsHeight}
                transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
            >
                {allTags}
                {allLinks}
            </g>
        </svg>
    );
};

export default function Example1() {
    return <ArcDiagram />;
}
