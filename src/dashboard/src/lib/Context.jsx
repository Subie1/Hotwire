import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

import Layout from "../layout/Layout";
import axios from "axios";
export const context = createContext();

const source = axios.CancelToken.source();
axios.defaults.cancelToken = source.token;

export function ContextProvider() {
	const [songs, setSongs] = useState([]);
	const [host, setHost] = useLocalStorage(
		"host",
		`http://localhost:${import.meta.env.VITE_BACKEND_PORT ?? 3000}`
	);
	const [canLoad, setCanLoad] = useState(false);
	const [_token, _setToken] = useLocalStorage("_token", false);
	const [playlists, setPlaylists] = useLocalStorage("playlists", []);
	const [isDownloadOpen, setDownloadOpened] = useState(false);
	const [isPlaylistsOpen, setPlaylistsOpen] = useState(false);
	const [isAddOpen, setAddOpen] = useState(false);
	const [currentPlaylist, setCurrentPlaylist] = useState(false);
	const [contextElements, setContextElements] = useState([]);
	const [song, setSong] = useState({
		url: "",
		artist: "",
		name: "",
		thumbnail: "",
	});
	const [page, setPage] = useState(-1);
	const [theme, setTheme] = useState("light");
	useEffect(() => {
		if (!_token) return;

		axios.interceptors.request.use((config) => {
			if (typeof config.headers.Authorization === "string") return config;
			config.headers.Authorization = _token;
			return config;
		});
	}, [_token]);

	useEffect(() => {
		if (page < 0 && _token) setPage(0);
	}, [_token]);

	useEffect(() => {
		if (page === 1) return;
		if (page < 0) return;

		axios
			.get(`${host}/api/auth/ping`)
			.then(({ status }) => {
				if (status === 200) return setCanLoad(true);
				setCanLoad(false);
				return setPage(-1);
			})
			.catch(() => setPage(-1));
	}, [page]);

	return (
		<context.Provider
			value={{
				contextElements,
				setContextElements,
				canLoad,
				_token,
				_setToken,
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
				theme,
				setTheme,
			}}
		>
			<Layout />
		</context.Provider>
	);
}
