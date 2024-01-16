import "./index.css";

import ReactDOM from "react-dom/client";

import Layout from "./layout/Layout";
import { ContextProvider } from "./lib/Context";

ReactDOM.createRoot(document.getElementById("root")).render(
	<ContextProvider>
		<Layout />
	</ContextProvider>
);
