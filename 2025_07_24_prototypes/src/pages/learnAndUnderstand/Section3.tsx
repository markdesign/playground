import { useEffect, useRef } from "react";
import * as d3 from "d3";

// select, append, classed, attr, text, style, Join
function SubSection13() {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const el = d3
            .select(ref.current)
            .append("p")
            // .attr("class", "bg-neutral-500")
            .classed("bg-neutral-500", true)
            .classed("border-2", true)
            .text("hello  world 2")
            .style("color", "blue");

        return () => {
            el.remove();
        };
    }, []);

    return (
        <div className="flex h-full flex-col">
            <div ref={ref}></div>
        </div>
    );
}

// Enter selection
function SubSection15() {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const data = [10, 20, 30, 40, 50];

        const parent = d3.select(ref.current);
        const el = parent.selectAll("li").data(data).join("li").text("foobar");
        console.log("[Section3.tsx 14] el : ", el);
    }, []);

    return (
        <div className="flex h-full flex-col">
            <ul ref={ref}>
                <li>Hello</li>
                <li>Hello</li>
            </ul>
        </div>
    );
}

// Exit selection
function SubSection16() {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const data = [10, 20, 30, 40, 50];

        const parent = d3.select(ref.current);
        const el = parent.selectAll("li").data(data).join("li").text("world");
        console.log("[Section3.tsx 14] el : ", el);
    }, []);

    return (
        <div className="flex h-full flex-col">
            <ul ref={ref}>
                <li>Hello</li>
                <li>Hello</li>
                <li>Hello</li>
                <li>Hello</li>
                <li>Hello</li>
                <li>Hello</li>
                <li>Hello</li>
            </ul>
        </div>
    );
}

// Displaying Data
function SubSection17() {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const data = [10, 20, 30, 40, 50];

        const parent = d3.select(ref.current);
        const el = parent
            .selectAll("li")
            .data(data)
            .join("li")
            .text((d) => {
                return d;
            });
        console.log("[Section3.tsx 14] el : ", el);

        return () => {
            // el.remove();
        };
    }, []);

    return (
        <div className="flex h-full flex-col">
            <ul ref={ref}>
                <li>Hello</li>
                <li>Hello</li>
                <li>Hello</li>
                <li>Hello</li>
                <li>Hello</li>
                <li>Hello</li>
                <li>Hello</li>
            </ul>
        </div>
    );
}

// Enter, Update, and Exit
function SubSection18() {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const data = [10, 20, 30, 40, 50];

        const parent = d3.select(ref.current);
        const el = parent
            .selectAll("li")
            .data(data)
            .join(
                (enter) => {
                    return enter.append("li").style("color", "purple");
                },
                // (update) => update.attr("class", "text-blue-500"),
                (update) => update.style("color", "green"),
                (exit) => exit.remove(),
            )
            .text((d) => {
                return d;
            });
        console.log("[Section3.tsx 14] el : ", el);

        return () => {
            // el.remove();
        };
    }, []);

    return (
        <div className="flex h-full flex-col">
            <ul ref={ref}>
                <li>Hello</li>
                <li>Hello</li>
                <li>Hello</li>
                <li>Hello</li>
                <li>Hello</li>
                <li>Hello</li>
                <li>Hello</li>
                <li>Hello</li>
            </ul>
        </div>
    );
}

// The Update Pattern (the alternative solution for working with enter and exit selections) DEPRECATED !!! join is better/newer
function SubSection19() {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const data = [10, 20, 30, 40, 50];

        const parent = d3.select(ref.current);
        const el = parent
            .selectAll("li")
            .data(data)
            // .join(
            //     (enter) => {
            //         return enter.append("li").style("color", "purple");
            //     },
            //     // (update) => update.attr("class", "text-blue-500"),
            //     (update) => update.style("color", "green"),
            //     (exit) => exit.remove(),
            // )
            .text((d) => {
                return d;
            });
        console.log("[Section3.tsx 14] el : ", el);

        // only available after calling data()
        el.enter()
            .append("li")
            .text((d) => d);

        el.exit().remove();

        return () => {
            // el.remove();
        };
    }, []);

    return (
        <div className="flex h-full flex-col">
            <ul ref={ref}>
                <li>Hello</li>
                <li>Hello</li>
                <li>Hello</li>
            </ul>
        </div>
    );
}

// JSON request using d3-fetch (optional use what you like)
function SubSection20() {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        // d3.json('./data.json').then((data) => {
        //     console.log('Here', data);
        // });

        async function getData() {
            const data = await d3.json("./data.json");
            console.log("data", data);
        }

        getData();

        const data = [10, 20, 30, 40, 50];

        const parent = d3.select(ref.current);
        const el = parent
            .selectAll("li")
            .data(data)
            .join(
                (enter) => {
                    return enter.append("li").style("color", "purple");
                },
                (update) => update.attr("class", "text-blue-500"),
                (exit) => exit.remove(),
            )
            .text((d) => {
                return d;
            });
        console.log("[Section3.tsx 14] el : ", el);

        return () => {
            // el.remove();
        };
    }, []);

    return (
        <div className="flex h-full flex-col">
            <ul ref={ref}>
                <li>Hello</li>
                <li>Hello</li>
                <li>Hello</li>
            </ul>
        </div>
    );
}

export default function Section3() {
    return (
        <div className="flex h-full flex-col">
            <h1>section 3</h1>
            <SubSection20 />
        </div>
    );
}
