// importing from react
import { RouterProvider } from "react-router-dom";
// importing data
import router from "./config/router";
// importing stylesheet
import "./style/globals.css";
// importing providers
import { StoreProvider } from "./config/utils";

function App() {
    return (
        <>
            <StoreProvider>
                <RouterProvider router={router} />
            </StoreProvider>
        </>
    );
}

export default App;
