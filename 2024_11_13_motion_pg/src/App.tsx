import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { DemoOne } from "./pages/DemoOne";
import { DemoTwo } from "./pages/DemoTwo";
import { ErrorPage } from "./pages/ErrorPage";
import "./App.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/DemoOne",
        element: <DemoOne />,
    },
    {
        path: "/DemoTwo",
        element: <DemoTwo />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
