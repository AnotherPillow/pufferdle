import React from "react"
import ReactDOM from "react-dom/client"

import {
    createBrowserRouter,
    RouterProvider,
    useNavigate,
    Outlet,
} from "react-router-dom";

import './App.css';
import Pufferdle from "./Pufferdle";
import FishTank from "./Components/FishTank";
import ErrorPage from "./ErrorPage";

const pufferfish_src = require("./Art/pufferfish.png")
const mutant_src = require("./Art/mutant_carp.png")
const fishtank_src = require("./Art/fishtank.png")

const warptotem_src = require("./Art/farmtotem.png")
const journal_src = require("./Art/journal.png")
const notes_src = require("./Art/notes.png")
const cog_src = require("./Art/cog.png")

function RootLayout() {
    const navigate = useNavigate();

    return (
        <div className="Page">
            <header>
                <div onClick={() => {navigate("/")}}>
                    <img src={warptotem_src} alt="Home"/>
                </div>
                {Array.from(Array(8)).map(() => (<div></div>))}
                <div>
                    <img src={journal_src} alt="How to Play"/>
                </div>
                <div>
                    <img src={notes_src} alt="Statistics"/>
                </div>
                <div>
                    <img src={cog_src} alt="Settings"/>
                </div>
            </header>
            <div className="App">
                <Outlet />
            </div>
        </div>
    )
}

function HomeElem() {
    const navigate = useNavigate();
    return (
        <div className="menuButtons">
            <div className="menuButton"> 
                <img src={pufferfish_src} alt=""/> 
                <h1>Daily</h1>
            </div>
            <div className="menuButton" onClick={() => navigate("/random")}> 
                <img src={mutant_src} alt=""/> 
                <h1>Random</h1>
            </div>
            <div className="menuButton" onClick={() => navigate("/fishtank")}> 
                <img src={fishtank_src} alt=""/> 
                <h1>Fish Tank</h1>
            </div>                
        </div>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <HomeElem />
            },
            {
                path: "/daily",
                element: <Pufferdle daily={true} />,
            },
            {
                path: "/random",
                element: <Pufferdle daily={false}/>,
            },
            {
                path: "/fishtank",
                element: <FishTank />,
            },
        ],
        errorElement: <ErrorPage />,
    },
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
