import { createBrowserRouter } from "react-router-dom"
import GuestLayout from "../layouts/GuestLayout"
import Home from "../pages/home"
import { HOME, REGISETR, LOGIN, FEEDS, UPLOADPROFILEPICTURE, CHAT } from "./routes"
import NotFound from "../pages/404";
import Register from "../pages/auth/register";
import Login from "../pages/auth/login";
import Authenticated from "../layouts/AuthLayout";
import path from "path";
import Feeds from "../pages/feeds";
import FileUpload from "../components/fileUpload";
import Chat from "../pages/chat";

const router = createBrowserRouter([
    {
        path: "/",
        Component: () => GuestLayout(),
        children: [
            {
                path: HOME,
                Component: () => Home()
            },
            {
                path: REGISETR,
                Component: () => Register()
            },
            {
                path: LOGIN,
                Component: () => Login(),
            }

        ]
    },

    {
        path: "/",
        Component: () => Authenticated(),
        children: [
            {
                path: FEEDS,
                Component: () => Feeds()
            },
            {
                path: UPLOADPROFILEPICTURE,
                Component: () => FileUpload()
            },
            {
                path: CHAT,
                Component: () => Chat()
            }
        ]
    },

    {
        path: "*",
        Component: () => NotFound()
    }
]);

export default router;