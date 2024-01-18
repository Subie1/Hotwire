import { useContext, useEffect } from "react";
import axios from "axios";
import Song from "../layout/components/Song";
import { context } from "../lib/Context";
import AddToPlaylist from "../layout/components/AddToPlaylist";

export default function HomePage() {
	const { songs, setSongs, host, currentPlaylist } = useContext(context);

	useEffect(() => {
		if (currentPlaylist) {
			setSongs([]);
			axios
				.get(`${host}/api/playlists/${currentPlaylist}`)
				.then(({ data, status }) => {
					if (status !== 200) return setSongs([]);
					if (!data) return setSongs([]);
					if (!data.songs) return setSongs([]);

					axios
						.get(`${host}/api/songs`)
						.then(({ data: d, status }) => {
							if (status !== 200) return setSongs([]);
							if (!d.length) return setSongs([]);
							if (!d[0].name) return setSongs([]);

							const res = [];

							for (const song of d) {
								if (data.songs.includes(song.file)) res.push(song);
							}

							setSongs(res);
						})
						.catch(() => setSongs([]));
				})
				.catch(() => setSongs([]));

			return;
		}

		try {
			axios
				.get(`${host}/api/songs`)
				.then(({ data, status }) => {
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
	}, [currentPlaylist]);

	return (
		<main className="w-full z-10 h-full m-1 p-3 overflow-y-auto relative">
			{songs.map((song) => {
				if (!song.file) return "";
				return (
					<Song
						key={song.file}
						artist={song.artist ?? "Anonymous"}
						name={song.name ?? "No Name"}
						file={song.file}
						url={`${host}/api/songs/${song.file}`}
						thumbnail={song.thumbnail ? song.thumbnail.url : false}
					/>
				);
			})}
			{currentPlaylist ? <AddToPlaylist /> : ""}
		</main>
	);
}
