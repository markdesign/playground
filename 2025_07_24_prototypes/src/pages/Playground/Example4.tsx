// https://www.react-graph-gallery.com/network-chart

import { useRef, useEffect } from "react";
import * as d3 from "d3";

interface Node extends d3.SimulationNodeDatum {
    id: string;
    group: string;
}

interface Link extends d3.SimulationLinkDatum<Node> {
    source: string | Node;
    target: string | Node;
}

export const NetworkDiagram = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const width = 800;
    const height = 400;

    useEffect(() => {
        const RADIUS = 10;

        const data = {
            nodes: [
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
                { id: "Napoleon", group: "team3" },
                { id: "Toto", group: "team4" },
                { id: "Tutu", group: "team4" },
                { id: "Titi", group: "team4" },
                { id: "Tata", group: "team4" },
                { id: "Turlututu", group: "team4" },
                { id: "Tita", group: "team4" },
            ],
            links: [
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
                { source: "Tata", target: "Tutu" },
                { source: "Tata", target: "Titi" },
                { source: "Tata", target: "Toto" },
                { source: "Tata", target: "Tita" },
                { source: "Tita", target: "Toto" },
                { source: "Tita", target: "Titi" },
                { source: "Tita", target: "Turlututu" },
                { source: "Rob", target: "Turlututu" },
            ],
        };

        const links: Link[] = data.links.map((d) => ({ ...d }));
        const nodes: Node[] = data.nodes.map((d) => ({ ...d }));

        const drawNetwork = (
            context: CanvasRenderingContext2D,
            width: number,
            height: number,
            nodes: Node[],
            links: Link[],
        ) => {
            context.clearRect(0, 0, width, height);

            // Draw the links first
            links.forEach((link) => {
                // D3 mutates link.source and link.target to be Node objects
                const source =
                    typeof link.source === "object"
                        ? link.source
                        : nodes.find((n) => n.id === link.source);
                const target =
                    typeof link.target === "object"
                        ? link.target
                        : nodes.find((n) => n.id === link.target);
                if (
                    !source ||
                    !target ||
                    source.x === undefined ||
                    source.y === undefined ||
                    target.x === undefined ||
                    target.y === undefined
                )
                    return;
                context.beginPath();
                context.moveTo(source.x, source.y);
                context.lineTo(target.x, target.y);
                context.stroke();
            });

            // Draw the nodes
            nodes.forEach((node) => {
                if (!node.x || !node.y) {
                    return;
                }

                context.beginPath();
                context.moveTo(node.x + RADIUS, node.y);
                context.arc(node.x, node.y, RADIUS, 0, 2 * Math.PI);
                context.fillStyle = "#cb1dd1";
                context.fill();
            });
        };

        // set dimension of the canvas element
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        if (!context) {
            return;
        }

        // run d3-force to find the position of nodes on the canvas
        d3.forceSimulation(nodes)

            // list of forces we apply to get node positions
            .force(
                "link",
                d3.forceLink<Node, Link>(links).id((d) => d.id),
            )
            .force("collide", d3.forceCollide().radius(RADIUS))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2))

            // at each iteration of the simulation, draw the network diagram with the new node positions
            .on("tick", () => {
                drawNetwork(context, width, height, nodes, links);
            });
    }, []);

    return (
        <div className="flex items-center justify-center">
            <canvas
                ref={canvasRef}
                className="h-[400px] w-[800px] bg-neutral-200"
                width={width}
                height={height}
            />
        </div>
    );
};

export default function Example() {
    return <NetworkDiagram />;
}
