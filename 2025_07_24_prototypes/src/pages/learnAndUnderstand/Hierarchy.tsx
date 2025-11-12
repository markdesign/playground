import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { hierarchy, tree } from "d3-hierarchy";

type TreeNode = {
    name: string;
    children?: TreeNode[];
};

const data: TreeNode = {
    name: "Themes",
    children: [
        { name: "Pete Hegseth" },
        {
            name: "Military",
            children: [{ name: "Mentions 1" }, { name: "Mentions 2" }],
        },
    ],
};

export const TreeDiagram: React.FC = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const margin = { top: 10, right: 10, bottom: 10, left: 10 };
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3
            .select(svgRef.current)
            .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const root = hierarchy(data);
        const treeLayout = tree<TreeNode>().size([height, width]);
        treeLayout(root);

        // Links
        svg.selectAll(".link")
            .data(root.links())
            .enter()
            .append("path")
            .attr("class", "stroke-gray-400 fill-none")
            .attr(
                "d",
                d3
                    .linkHorizontal<HierarchyNode<TreeNode>, HierarchyNode<TreeNode>>()
                    .x((d) => d.y)
                    .y((d) => d.x),
            );

        // Nodes
        const node = svg
            .selectAll(".node")
            .data(root.descendants())
            .enter()
            .append("g")
            .attr("transform", (d) => `translate(${d.y},${d.x})`);

        node.append("circle").attr("r", 6).attr("class", "fill-blue-500");

        node.append("text")
            .attr("dy", ".35em")
            .attr("x", (d) => (d.children ? -10 : 10))
            .attr("text-anchor", (d) => (d.children ? "end" : "start"))
            .attr("class", "text-sm text-gray-700")
            .text((d) => d.data.name);
    }, []);

    return (
        <div className="h-full w-full border-2 p-2">
            <svg ref={svgRef} className="h-full w-full" />
        </div>
    );
};

export default function Hierarchy() {
    return (
        <div className="h-full w-full p-4">
            <TreeDiagram />
        </div>
    );
}
