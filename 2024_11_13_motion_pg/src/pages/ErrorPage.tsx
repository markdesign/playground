import { Link } from "react-router-dom";

function ErrorPage() {
    return (
        <div data-id="ErrorPage" className="bg-blue-900 text-white font-mono h-screen flex flex-col justify-center items-center">
            <h1>404</h1>
            <p>Page not found</p>
            <Link to="/">Home</Link>
        </div>
    );
}

export { ErrorPage };
