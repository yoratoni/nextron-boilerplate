import { createRoot } from "react-dom/client";

import App from "renderer/src/App";


const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Root element not found");
}

createRoot(rootElement).render(
    <App />
);