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
	const {
		setSong,
		currentPlaylist,
		player,
		host,
		setSongs,
		setContextElements,
	} = useContext(context);
	const isPlaying = useIsPlaying();
	const [blob, setBlob] = useState("");

	async function ToggleSong() {
		if (player.getAttribute("data-name") === file && isPlaying) return player.pause();

		const { data } = await axios.get(url, { responseType: "blob" });
		
		const newBlob = (window.URL || window.webkitURL).createObjectURL(
			new Blob([data])
		);

		setBlob(newBlob);
		setSong({ url: newBlob, artist, name, thumbnail, file });
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
		<div
			onContextMenu={() =>
				currentPlaylist
					? setContextElements([
							{ name: "Delete", icon: "TbTrash", action: RemoveSong },
					  ])
					: ""
			}
			className="rounded-lg z-10 m-1 left bg-primary/10 w-fit h-fit p-4 space-y-2 inline-block"
		>
			<div className="w-full md:w-32 md:h-32 rounded-lg flex items-center justify-center bg-background overflow-hidden">
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
					<h1 className="text-text/80">{truncate(name, 8)}</h1>
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
					className="w-fit cursor-pointer h-fit rounded-lg p-2 bg-gradient-to-br from-primary to-accent text-background/40 fill-current"
				>
					<Icon
						name={
							player.getAttribute("data-name") === file && isPlaying
								? "TbPlayerPauseFilled"
								: "TbPlayerPlayFilled"
						}
					/>
				</a>
			</div>
		</div>
	);
}
