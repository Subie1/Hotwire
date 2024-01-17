import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const context = createContext();

export function ContextProvider({ children }) {
	const [songs, setSongs] = useState([]);
	const [host, setHost] = useLocalStorage(
		"host",
		`http://localhost:${import.meta.env.VITE_BACKEND_PORT ?? 3000}`
	);
	const [playlists, setPlaylists] = useLocalStorage("playlists", []);
	const [isDownloadOpen, setDownloadOpened] = useState(false);
	const [isPlaylistsOpen, setPlaylistsOpen] = useState(false);
	const [isAddOpen, setAddOpen] = useState(false);
	const [currentPlaylist, setCurrentPlaylist] = useState(false);
	const [song, setSong] = useState({
		url: "",
		artist: "",
		name: "",
		thumbnail: "",
	});
	const [page, setPage] = useState(0);

	return (
		<context.Provider
			value={{
				isAddOpen,
				setAddOpen,
				setCurrentPlaylist,
				currentPlaylist,
				page,
				isPlaylistsOpen,
				setPlaylistsOpen,
				setPage,
				song,
				setSong,
				isDownloadOpen,
				setDownloadOpened,
				songs,
				setSongs,
				host,
				setHost,
				playlists,
				setPlaylists,
			}}
		>
			{children}
		</context.Provider>
	);
}
