import "./index.css";

import ReactDOM from "react-dom/client";

import { ContextProvider } from "./lib/Context";

ReactDOM.createRoot(document.getElementById("root")).render(
	<ContextProvider />
);
