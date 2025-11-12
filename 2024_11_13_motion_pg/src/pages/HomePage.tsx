import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div data-id="HomePage" className="w-dvw h-dvh bg-gray-900 flex items-center justify-center">
            <div className="flex flex-col gap-6 p-8 bg-gray-800 rounded-lg shadow-xl">
                <Link 
                    to="/DemoOne" 
                    className="text-gray-100 hover:text-blue-400 transition-colors text-xl font-medium px-6 py-3 rounded-md hover:bg-gray-700"
                >
                    Demo One
                </Link>
                <Link 
                    to="/DemoTwo"
                    className="text-gray-100 hover:text-blue-400 transition-colors text-xl font-medium px-6 py-3 rounded-md hover:bg-gray-700"
                >
                    Demo Two
                </Link>
                {/* <Link 
                    to="/demothree"
                    className="text-gray-100 hover:text-blue-400 transition-colors text-xl font-medium px-6 py-3 rounded-md hover:bg-gray-700"
                >
                    Demo Three
                </Link> */}
            </div>
        </div>
    );
}

export { HomePage };