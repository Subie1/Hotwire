import { useContext, useEffect } from "react";
import Icon from "./Icon";
import { context } from "../../lib/Context";
import { MdLoop } from "react-icons/md";
import useIsPlaying from "../../hooks/useIsPlaying";
import AddSong from "./AddSong";
import PeekBar from "./PeekBar";
import Volume from "./Volume";

export default function MusicPlayer() {
const {
		song,
		player,
	} = useContext(context);
	const isPlaying = useIsPlaying();

	function ToggleSong() {
		if (!player) return;
		if (isPlaying) return player.pause();
		player.play();
	}

	useEffect(() => {
		if (!player) return;
		
		player.pause();
		player.load();
		player.play();

		if ("mediaSession" in navigator) {
			navigator.mediaSession.metadata = new MediaMetadata({
				title: song.name,
				artist: song.artist,
				artwork: [{ src: song.thumbnail }],
			});
		}
	}, [song]);

	return (
		<div className="w-full h-fit flex flex-col items-start justify-center py-2 pe-2">
			<div className="w-full flex items-center justify-between">
				<div className="flex gap-1 items-center justify-center">
					<div className="flex h-fit gap-2 bg-secondary p-2 rounded-xl w-fit">
						<span className="text-xs opacity-70 bg-gradient-to-br from-primary to-accent text-transparent bg-clip-text">
							{song.artist ? song.artist : "Nothing playing"}
						</span>
					</div>
					<div className="flex h-fit gap-2 bg-secondary p-2 rounded-xl w-fit">
						<span className="text-xs opacity-70 bg-gradient-to-br from-primary to-accent text-transparent bg-clip-text">
							{song.name ? song.name : "Nothing playing"}
						</span>
					</div>
				</div>
				<div className="flex gap-1 items-center justify-center p-1">
					<div
						onClick={() => ToggleSong()}
						className="transition-all w-fit h-fit duration-200 group hover:scale-95 flex relative items-center justify-center cursor-pointer rounded-full text-lg bg-gradient-to-br from-primary to-accent text-secondary p-2"
					>
						<Icon
							name={isPlaying ? "TbPlayerPause" : "TbPlayerPlay"}
							className="opacity-80 fill-background"
						/>
					</div>
					<div
						onClick={() => (player ? player.loop != player.loop : "")}
						className={`transition-all w-fit h-fit duration-200 group hover:scale-95 flex relative items-center justify-center cursor-pointer rounded-full text-lg ${
							player
								? player.loop != player.loop
									? "bg-gradient-to-br from-primary to-accent text-secondary"
									: "bg-secondary text-text"
								: "bg-secondary text-text"
						} p-2`}
					>
						<MdLoop className="opacity-80 fill-background" />
					</div>
				</div>
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<div className="w-full h-fit rounded-xl bg-secondary p-2 flex flex-col items-center justify-center">
					<PeekBar videoId="music_player" />
				</div>
				<Volume player={document.getElementById("music_player")} />
				<AddSong />
			</div>
		</div>
	);
}
