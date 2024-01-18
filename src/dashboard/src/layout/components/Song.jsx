import { useContext, useState } from "react";
import Icon from "./Icon";
import axios from "axios";
import { context } from "../../lib/Context";
import useIsPlaying from "../../hooks/useIsPlaying";

function truncate(input, length) {
	if (input.length > length) {
		return input.substring(0, length) + "...";
	}
	return input;
}

export default function Song({ name, artist, url, thumbnail, file }) {
	const { song, setSong, currentPlaylist, host, setSongs } =
		useContext(context);
	const isPlaying = useIsPlaying();
	const [blob, setBlob] = useState("");

	async function ToggleSong() {
		const player = document.getElementById("music_player");
		if (song.url === blob && isPlaying) return player.pause();

		axios.get(url, { responseType: "blob" }).then(({ data }) => {
			const newBlob = (window.URL || window.webkitURL).createObjectURL(
				new Blob([data])
			);

			setBlob(newBlob);
			setSong({ url: newBlob, artist, name, thumbnail });
		});
	}

	async function RemoveSong() {
		await axios.delete(
			`${host}/api/playlists/${currentPlaylist}/delete/${file}`
		);

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
	}

	return (
		<div className="rounded-lg z-10 m-1 left bg-secondary shadow-lg shadow-black w-fit h-fit p-4 gap-2 inline-block">
			<div className="w-full md:w-32 md:h-32 rounded-lg shadow-lg shadow-black flex items-center justify-center bg-background overflow-hidden">
				{thumbnail ? (
					<img
						src={thumbnail}
						className="w-full object-fill h-full min-h-full min-w-full max-h-full max-w-full"
					></img>
				) : (
					<video
						src={blob}
						className="w-full object-fill h-full min-h-full min-w-full max-h-full max-w-full"
					></video>
				)}
			</div>
			<div className="flex w-full justify-between items-center">
				<div className="flex flex-col w-fit h-fit">
					<h1 className="text-white">{truncate(name, 8)}</h1>
					<span className="text-xs text-gray-500">{truncate(artist, 12)}</span>
					{currentPlaylist ? (
						<a
							onClick={() => RemoveSong()}
							className="w-fit h-fit p-2 bg-background opacity-40 rounded-lg cursor-pointer text-xs"
						>
							<Icon name="TbTrash" />
						</a>
					) : (
						""
					)}
				</div>
				<a
					onClick={() => ToggleSong()}
					className="w-fit cursor-pointer h-fit rounded-lg p-2 bg-gradient-to-br from-primary to-accent text-secondary"
				>
					<Icon
						name={
							song.url === blob && isPlaying
								? "TbPlayerPauseFilled"
								: "TbPlayerPlayFilled"
						}
					/>
				</a>
			</div>
		</div>
	);
}
