/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { scaleLinear, extent, line } from "d3";

export default function Section2() {
    return (
        <div className="flex h-full flex-col p-4">
            <h1>1 section 2</h1>
            <div>
                <svg className="block bg-neutral-200" width="500" height="500">
                    {/* <rect
            width="100"
            height="100"
            fill="#f44336"
            stroke="#8bc34a"
            strokeWidth="10"
            x="25"
            y="25"
          ></rect> */}
                    {/* <circle r="100" cx="200" cy="200" fill="#9c27b0"></circle> */}
                    {/* <line
            x1="50"
            y1="300"
            x2="400"
            y2="300"
            stroke="blue"
            strokeWidth="2"
          ></line> */}
                    <path d="M100,100 L300,150" fill="none" stroke="#000" strokeWidth="10"></path>
                </svg>
            </div>
        </div>
    );
}
