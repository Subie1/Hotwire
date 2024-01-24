import { context } from "../../lib/Context";
import { useContext, useEffect } from "react";
import Icon from "./Icon";
import { useLocalStorage } from "@uidotdev/usehooks";
import Slider from "./Slider";

export default function Volume() {
	const { player } = useContext(context);

	const [volume, setVolume] = useLocalStorage("volume", 0);
	const [muted, setMuted] = useLocalStorage("muted", false);

	useEffect(() => {
		if (muted) player.volume = 0;
		else player.volume = volume;
	}, []);

	useEffect(() => {
		if (muted) player.volume = 0;
		else player.volume = volume;
	}, [muted]);

	useEffect(() => {
		if (muted) player.volume = 0;
		else player.volume = volume;
	}, [volume]);

	return (
		<div className="flex gap-3 p-2 rounded-xl bg-accent/20 justify-center items-center">
			<button onClick={() => setMuted(!muted)}>
				<Icon
					className="opacity-30"
					name={
						muted
							? "TbVolumeOff"
							: volume > 0.5
							? "TbVolume"
							: volume == 0
							? "TbVolume3"
							: volume <= 0.5
							? "TbVolume2"
							: "TbVolumeOff"
					}
				/>
			</button>
			<Slider
				className="w-12"
				minimum={0}
				maximum={100}
				value={volume * 100}
				onChange={(query) => { setVolume(query / 100); if (muted) setMuted(false); }}
			/>
		</div>
	);
}
