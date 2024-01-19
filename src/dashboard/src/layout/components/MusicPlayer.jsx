import { useContext, useEffect, useState } from "react";
import Icon from "./Icon";
import { context } from "../../lib/Context";
import { MdLoop } from "react-icons/md";
import useIsPlaying from "../../hooks/useIsPlaying";
import AddSong from "./AddSong";
import VolumeControl from "./VolumeControl";
import Slider from "./Slider";

export default function MusicPlayer() {
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const { song, player } = useContext(context);
	const isPlaying = useIsPlaying();

	function ToggleSong() {
		if (isPlaying) return player.pause();
		player.play();
	}

	useEffect(() => {
		if (!player) return;
		player.addEventListener("timeupdate", handleTimeUpdate);
		player.addEventListener("durationchange", handleDurationChange);

		return () => {
			player.removeEventListener("timeupdate", handleTimeUpdate);
			player.removeEventListener("durationchange", handleDurationChange);
		}
	}, [player])

	const handleTimeUpdate = () => {
		setCurrentTime(player.currentTime);
	};

	const handleDurationChange = () => {
		setDuration(player.duration);
	};

	useEffect(() => {
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
				<div className="w-full h-fit rounded-xl bg-secondary p-2 gap-2 flex items-center justify-center">
					<span className="text-xs opacity-40">
						{formatTime(player.currentTime)}
					</span>
					<Slider
						className="w-full"
						value={currentTime}
						minimum={0}
						maximum={duration}
						onRelease={(query) => (player.currentTime = query)}
					/>
					<span className="text-xs opacity-40">
						{formatTime(player.duration || 0)}
					</span>
				</div>
				<VolumeControl />
				<AddSong />
			</div>
		</div>
	);
}

function formatTime(time) {
	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time % 60);
	return `${minutes.toString().padStart(2, "0")}:${seconds
		.toString()
		.padStart(2, "0")}`;
}
