import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const context = createContext();

export function ContextProvider({ children }) {
	const [songs, setSongs] = useState([]);
	const [host, setHost] = useLocalStorage("host", `http://localhost:${import.meta.env.VITE_BACKEND_PORT}`);
	const [playlists, setPlaylists] = useLocalStorage("playlists", []);
	const [isOpen, setOpened] = useState(false);
	const [song, setSong] = useState({ url: "", artist: "", name: "", thumbnail: "" });
	const [page, setPage] = useState(0);

	return (
		<context.Provider value={{ page, setPage, song, setSong, isOpen, setOpened, songs, setSongs, host, setHost, playlists, setPlaylists }}>
			{children}
		</context.Provider>
	);
}
