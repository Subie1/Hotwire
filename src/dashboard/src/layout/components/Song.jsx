import { useContext } from "react";
import Icon from "./Icon";
import { context } from "../../lib/Context";
import useIsPlaying from "../../hooks/useIsPlaying";

function truncate(input, length) {
	if (input.length > length) {
		return input.substring(0, length) + "...";
	}
	return input;
}

export default function Song({ name, artist, url, thumbnail }) {
	const { song, setSong } = useContext(context);
	const isPlaying = useIsPlaying();

	function ToggleSong() {
		const player = document.getElementById("music_player");
		if (song.url === url && isPlaying) return player.pause();
		setSong({ url, artist, name, thumbnail });
	}

	return (
		<div className="rounded-lg w-full md:w-auto relative bg-secondary shadow-lg shadow-black w-fit h-fit p-4 gap-2 flex flex-col">
			<div className="w-full md:w-32 md:h-32 rounded-lg shadow-lg shadow-black flex items-center justify-center bg-background overflow-hidden">
				{thumbnail ? (
					<img
						src={thumbnail}
						className="w-full object-fill h-full min-h-full min-w-full max-h-full max-w-full"
					></img>
				) : (
					<video
						src={url}
						className="w-full object-fill h-full min-h-full min-w-full max-h-full max-w-full"
					></video>
				)}
			</div>
			<div className="flex w-full justify-between items-center">
				<div className="flex flex-col w-fit h-fit">
					<h1 className="text-white">{truncate(name, 8)}</h1>
					<span className="text-xs text-gray-500">{truncate(artist, 12)}</span>
				</div>
				<a
					onClick={() => ToggleSong()}
					className="w-fit cursor-pointer h-fit rounded-lg p-2 bg-gradient-to-br from-primary to-accent text-secondary"
				>
					<Icon
						name={
							song.url === url && isPlaying
								? "TbPlayerPauseFilled"
								: "TbPlayerPlayFilled"
						}
					/>
				</a>
			</div>
		</div>
	);
}
