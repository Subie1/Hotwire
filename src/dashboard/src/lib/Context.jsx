import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

import Layout from "../layout/Layout";
import axios from "axios";
export const context = createContext();

axios.defaults.withCredentials = true;

export function ContextProvider() {
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

	useEffect(() => {
		if (page === 1) return;
		if (page < 0) return;

		axios
			.get(`${host}/api/auth/ping`)
			.then(({ status }) => {
				if (status === 200) return;
				return setPage(-1);
			})
			.catch(() => setPage(-1));
	}, [page]);

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
			<Layout />
		</context.Provider>
	);
}
