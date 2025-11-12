import { useRef } from "react";

function SubSection60() {
    const svgRef = useRef(null);

    const dimensions = {
        width: 800,
        height: 600,
    };
    return (
        <svg
            className="bg-neutral-200"
            ref={svgRef}
            width={dimensions.width}
            height={dimensions.height}
        ></svg>
    );
}

export default function Example7() {
    return (
        <div className="flex h-full flex-col">
            <h1>section 7</h1>
            <SubSection60 />
        </div>
    );
}
