import { createContext, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Command } from "@tauri-apps/api/shell";

async function Main() {
	try {
		const command = new Command("server-software");
		await command.execute();
	} catch (err) {
		return;
	}
}

import Layout from "../layout/Layout";
import axios from "axios";
export const context = createContext();

const source = axios.CancelToken.source();
axios.defaults.cancelToken = source.token;

export function ContextProvider() {
	const [local, setLocal] = useState(false);

	const player = useRef(null);
	const [songs, setSongs] = useState([]);
	const [playlists, setPlaylists] = useLocalStorage("playlists", []);
	const [song, setSong] = useState({
		url: "",
		artist: "",
		name: "",
		thumbnail: "",
	});

	useEffect(() => {
		if (local) return;
		setLocal(true);
		Main();
	}, [local]);

	const [theme, setTheme] = useLocalStorage("theme", {
		name: "Dark",
		value: "dark",
	});
	const [host, setHost] = useLocalStorage("host", `*`);

	useEffect(() => {
		if (host !== "*") return;
		setHost("http://localhost:6253");
	}, [host]);

	const [canLoad, setCanLoad] = useState(false);
	const [_token, _setToken] = useLocalStorage("_token", false);

	const [isDownloadOpen, setDownloadOpened] = useState(false);
	const [isPlaylistsOpen, setPlaylistsOpen] = useState(false);
	const [isAddOpen, setAddOpen] = useState(false);

	const [contextElements, setContextElements] = useState([]);

	const [page, setPage] = useState(-1);
	const [currentPlaylist, setCurrentPlaylist] = useState(false);

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
				player: player.current,
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
			<video
				ref={player}
				id="music_player"
				className="hidden"
				src={song.url}
				title={song.name ?? "Nothing playing"}
			></video>
			<Layout />
		</context.Provider>
	);
}
