import { useContext } from "react";
import { context } from "../lib/Context";

import Home from "../pages/Home";
import Sidebar from "./components/Sidebar";
import MusicPlayer from "./components/MusicPlayer";
import AddModel from "./components/AddModel";
import Settings from "../pages/Settings";
import PlaylistModel from "./components/PlaylistModel";
import AddToPlaylistModel from "./components/AddToPlaylistModel";

const CurrentPage = () => {
	const { page } = useContext(context);
	if (page === 0) return <Home />;
	if (page === 1) return <Settings />;
	return <Home />;
};

export default function Layout() {
	const { isDownloadOpen, isPlaylistsOpen, isAddOpen } = useContext(context);

	return (
		<main className="dark w-full overflow-hidden flex h-full bg-background text-text">
			{isDownloadOpen ? <AddModel /> : ""}
			{isPlaylistsOpen ? <PlaylistModel /> : ""}
			{isAddOpen ? <AddToPlaylistModel /> : ""}
			<Sidebar />
			<div className="flex w-full h-full flex-col items-start justify-between">
				<CurrentPage />
				<MusicPlayer />
			</div>
		</main>
	);
}
