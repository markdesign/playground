import { useState } from "react";

export default function Example1() {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative flex h-screen overflow-hidden">
            {/* Main Content */}
            <div
                className={`flex-1 bg-gray-100 p-6 transition-all duration-300 ${
                    open ? "mr-[300px]" : "mr-0"
                }`}
            >
                <button
                    onClick={() => setOpen(!open)}
                    className="mb-4 rounded-2xl bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700"
                >
                    {open ? "Close Sidebar" : "Open Sidebar"}
                </button>
                <h1 className="mb-4 text-2xl font-bold">Responsive Demo</h1>
                <p className="mb-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet
                    ligula quis sapien pretium, at pretium erat ornare.
                </p>
                <p>
                    Resize the window and toggle the sidebar to see the responsive layout in action.
                </p>
            </div>

            {/* Sidebar (fixed width, slides in/out) */}
            <div
                className={`absolute top-0 right-0 h-full w-[300px] bg-white p-6 shadow-xl transition-transform duration-300 ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <h2 className="mb-4 text-xl font-semibold">Sidebar</h2>
                <p className="text-gray-600">
                    This is the sidebar content. You can place navigation, settings, or anything
                    here.
                </p>
            </div>
        </div>
    );
}
