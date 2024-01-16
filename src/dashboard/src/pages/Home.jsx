import { useContext, useEffect } from "react";
import axios from "axios";
import Song from "../layout/components/Song";
import { context } from "../lib/Context";

export default function HomePage() {
	const { songs, setSongs, host } = useContext(context);

	useEffect(() => {
		try {
			axios.get(`${host}/api/songs`).then(({ data, status }) => {
				if (status !== 200) return setSongs([]);
				if (!data) return setSongs([]);
				if (!data.length) return setSongs([]);
				if (!data[0].name) return setSongs([]);

				setSongs(data);
			})
			.catch(() => setSongs([]));
		} catch {
			setSongs([]);
		}
	}, []);

	return (
		<main className="w-full h-full m-1 p-3 gap-2 space-y-0 items-start justify-start flex flex-wrap overflow-auto">
			{songs.map((song) => (
				<Song
					key={song.file}
					artist={song.artist ?? "Anonymous"}
					name={song.name ?? "No Name"}
					url={`${host}/api/songs/${song.file}`}
					thumbnail={song.thumbnail ? song.thumbnail.url : false}
				/>
			))}
		</main>
	);
}
