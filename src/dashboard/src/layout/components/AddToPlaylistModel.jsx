import { useContext, useEffect, useState } from "react";
import { context } from "../../lib/Context";
import axios from "axios";
import Icon from "./Icon";

export default function AddToPlaylistModel() {
	const [queries, setQueries] = useState([]);
	const { setAddOpen, host, isAddOpen, currentPlaylist, songs, setSongs } =
		useContext(context);

	useEffect(() => {
		try {
			axios
				.get(`${host}/api/songs`)
				.then(({ data, status }) => {
					if (status !== 200) return setQueries([]);
					if (!data) return setQueries([]);
					if (!data.length) return setQueries([]);
					if (!data[0].name) return setQueries([]);

					const res = [];

					for (const song of data) {
						if (songs.map((song) => song.file).includes(song.file)) continue;
						res.push(song);
					}

					setQueries(res);
				})
				.catch(() => setQueries([]));
		} catch {
			setQueries([]);
		}
	}, [isAddOpen]);

	function AddSong(song) {
		axios
			.put(`${host}/api/playlists/${currentPlaylist}/add`, {
				songId: song.file,
			})
			.then(() => {
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
									if (!data.songs.includes(song.file)) continue;
									res.push(song);
									setQueries((queries) =>
										queries.filter((query) => query.file !== song.file)
									);
								}

								setSongs(res);
							})
							.catch(() => setSongs([]));
					})
					.catch(() => setSongs([]));
			});
	}

	function CloseModel(event) {
		if (event.target !== event.currentTarget) return;
		setAddOpen(false);
	}

	return (
		<div
			onClick={CloseModel}
			className="bg-black bg-opacity-40 z-50 flex-col gap-2 fixed w-full h-full overflow-hidden flex items-center justify-center top-0 left-0"
		>
			<header className="text-xs p-2 bg-background rounded-xl">
				Choose a song to add to the AddPlaylist
			</header>
			<div className="w-fit bg-secondary rounded-2xl flex flex-col p-2 gap-1">
				<div>
					{queries.map((query) => (
						<div
							key={query.file}
							className="w-fit h-fit flex gap-2 items-center justify-center"
						>
							<span>{query.name}</span>
							<a
								onClick={() => AddSong(query)}
								className="p-2 flex items-center justify-center rounded-lg bg-background cursor-pointer"
							>
								<Icon name="TbThumbUp" />
							</a>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
