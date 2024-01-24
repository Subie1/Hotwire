import { useContext, useEffect, useState } from "react";
import Icon from "./Icon";
import { context } from "../../lib/Context";
import { MdLoop } from "react-icons/md";
import useIsPlaying from "../../hooks/useIsPlaying";
import AddSong from "./AddSong";
import VolumeControl from "./VolumeControl";
import Slider from "./Slider";
import axios from "axios";

export default function MusicPlayer() {
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const { song, player, currentPlaylist, songs, setSong, host } = useContext(context);
	const isPlaying = useIsPlaying();

	function ToggleSong() {
		if (isPlaying) return player.pause();
		player.play();
	}

	useEffect(() => {
		if (!player) return;
		player.addEventListener("timeupdate", handleTimeUpdate);
		player.addEventListener("durationchange", handleDurationChange);
		player.addEventListener("ended", handleEnded);

		return () => {
			player.removeEventListener("timeupdate", handleTimeUpdate);
			player.removeEventListener("durationchange", handleDurationChange);
			player.removeEventListener("ended", handleEnded);
		};
	}, [player]);

	function NextSong() {
		if (!currentPlaylist) return;
		if (songs.length === 0) return;

		let queue = 0;
		const currentSong = songs
			.map((s) => s.file)
			.indexOf(player.getAttribute("data-name"));

		if (currentSong === -1) return;
		if (currentSong === songs.length - 1) queue = 0;
		else queue = currentSong + 1;

		const result = songs[queue];
		player.pause();

		axios
			.get(`${host}/api/songs/${result.file}`, { responseType: "blob" })
			.then(({ data }) => {
				const newBlob = (window.URL || window.webkitURL).createObjectURL(
					new Blob([data])
				);

				setSong({ url: newBlob, ...result });
				player.setAttribute("data-name", result.file);
			});
	}

	function PreviousSong() {
		if (!currentPlaylist) return;
		if (songs.length === 0) return;

		let queue = 0;
		const currentSong = songs
			.map((s) => s.file)
			.indexOf(player.getAttribute("data-name"));

		if (currentSong === -1) return;
		if (currentSong === 0) queue = songs.length - 1;
		else queue = currentSong - 1;

		const result = songs[queue];
		player.pause();

		axios
			.get(`${host}/api/songs/${result.file}`, { responseType: "blob" })
			.then(({ data }) => {
				const newBlob = (window.URL || window.webkitURL).createObjectURL(
					new Blob([data])
				);

				setSong({ url: newBlob, ...result });
				player.setAttribute("data-name", result.file);
			});
	}

	const handleEnded = () => {
		NextSong();
	};

	const handleTimeUpdate = () => {
		setCurrentTime(player.currentTime);
	};

	const handleDurationChange = () => {
		setDuration(player.duration);
	};

	useEffect(() => {
		if (!song) return;

		player.pause();
		player.load();
		player.play();

		try {
			if ("mediaSession" in navigator) {
				navigator.mediaSession.metadata = new MediaMetadata({
					title: song.name,
					artist: song.artist,
					artwork: [{ src: song.thumbnail }],
				});
			}
		} catch (err) {return;}
	}, [song]);

	return (
		<div className="w-[calc(100%-1rem)] h-fit flex flex-col items-start bg-text/5 rounded-xl p-2 justify-center m-2">
			<div className="w-full flex items-center justify-between">
				<div className="flex gap-1 items-center justify-center">
					{song.artist ? (
						<div className="flex h-fit gap-2 bg-accent/20 p-2 rounded-xl w-fit">
							<span className="text-xs opacity-70">{song.artist}</span>
						</div>
					) : (
						""
					)}
					<div className="flex h-fit gap-2 bg-accent/20 p-2 rounded-xl w-fit">
						<span className="text-xs opacity-70">
							{song.name ? song.name : "Nothing playing"}
						</span>
					</div>
				</div>
				<div className="flex gap-1 items-center justify-center p-1">
					<div
						onClick={() => ToggleSong()}
						className="group w-fit h-fit transition-all duration-200 hover:scale-95 flex relative items-center justify-center cursor-pointer rounded-full text-lg bg-gradient-to-br from-primary to-accent p-2"
					>
						<Icon
							name={isPlaying ? "TbPlayerPause" : "TbPlayerPlay"}
							className="opacity-80 fill-current text-background"
						/>
					</div>
					<div
						onClick={() => (player.loop = !player.loop)}
						className={`transition-all w-fit h-fit duration-200 group hover:scale-95 flex relative items-center justify-center cursor-pointer rounded-full text-lg ${
							player.loop == true
								? "bg-gradient-to-br from-primary to-accent"
								: "bg-secondary/20"
						} p-2`}
					>
						<MdLoop className="opacity-80 fill-current text-background" />
					</div>
				</div>
			</div>
			<div className="flex w-full items-center justify-center gap-2">
				<div className="flex w-full items-center justify-center">
					<div
						onClick={PreviousSong}
						className="cursor-pointer transition-all duration-200 hover:scale-95 p-2 bg-accent/20 flex rounded-xl items-center text-background justify-center w-fit h-fit"
					>
						<Icon name="TbPlayerSkipBack" className="fill-current" />
					</div>
					<div className="w-full h-fit rounded-xl bg-accent/20 p-2 gap-2 flex items-center justify-center">
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
					<div
						onClick={NextSong}
						className="cursor-pointer transition-all duration-200 hover:scale-95 p-2 bg-accent/20 flex rounded-xl items-center text-background justify-center w-fit h-fit"
					>
						<Icon name="TbPlayerSkipForward" className="fill-current" />
					</div>
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
