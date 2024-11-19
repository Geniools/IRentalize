import {createRoot} from "react-dom/client";
import {StrictMode} from "react";

import JSONEditor from "./JSONEditor.tsx";


class JSONWidget {
    render(id: string) {
        createRoot(document.getElementById(id)!).render(
            <StrictMode>
                <JSONEditor/>
            </StrictMode>,
        )
    }
}

window.JSONWidget = JSONWidget;



