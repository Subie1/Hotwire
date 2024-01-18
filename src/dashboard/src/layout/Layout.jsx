import { useContext, useState } from "react";
import { context } from "../lib/Context";

import Home from "../pages/Home";
import Sidebar from "./components/Sidebar";
import MusicPlayer from "./components/MusicPlayer";
import AddModel from "./components/AddModel";
import Settings from "../pages/Settings";
import PlaylistModel from "./components/PlaylistModel";
import AddToPlaylistModel from "./components/AddToPlaylistModel";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ContextMenu from "./components/ContextMenu";

const CurrentPage = () => {
	const { page } = useContext(context);
	if (page === 0) return <Home />;
	if (page === 1) return <Settings />;
	if (page === -1) return <Login />
	if (page === -2) return <Register />;
	return <Home />;
};

export default function Layout() {
	const {
		isDownloadOpen,
		isPlaylistsOpen,
		isAddOpen,
		canLoad,
		contextElements,
		setContextElements,
	} = useContext(context);

	const [isContext, setIsContext] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	function HandleContextMenu(event) {
		event.preventDefault();

		const x = event.pageX - 10 + "px";
		const y = event.pageY - 10 + "px";

		setPosition({ x, y });
		setIsContext(true);
	}

	return (
		<main
			onContextMenu={(event) => HandleContextMenu(event)}
			className="dark w-full overflow-hidden flex h-full bg-background text-text"
		>
			{isContext ? (
				<ContextMenu
					elements={contextElements}
					exit={() => {
						setIsContext(false);
						setContextElements([]);
					}}
					x={position.x}
					y={position.y}
				/>
			) : (
				""
			)}
			{isDownloadOpen ? <AddModel /> : ""}
			{isPlaylistsOpen ? <PlaylistModel /> : ""}
			{isAddOpen ? <AddToPlaylistModel /> : ""}
			{canLoad ? <Sidebar /> : ""}
			<div className="flex w-full h-full flex-col items-start justify-between">
				<CurrentPage />
				{canLoad ? <MusicPlayer /> : ""}
			</div>
		</main>
	);
}
