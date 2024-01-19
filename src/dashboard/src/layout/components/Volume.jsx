import { context } from "../../lib/Context";
import { useContext } from "react";
import Icon from "./Icon";

export default function Volume({ player }) {
	const { volume, setVolume } = useContext(context);
	const { muted, setMuted } = useContext(context);
	let icon = "TbVolume2";

	function Mute() {
		setMuted(!muted);
		if (!muted) player.volume = 0;
		else player.volume = volume / 100;
	}

	function ChangeVolume(volume) {
		setVolume(volume);
		player.volume = volume / 100;
		if (player.volume == 0 && !muted) icon = "TbVolume3";
		if (player.volume < 0.5 && player.volume > 0 && !muted) icon = "TbVolume2";
		if (player.volume > 0.5 && !muted) icon = "TbVolume";
	}

	return (
		<div className="flex gap-3 justify-center items-center">
			<button onClick={() => Mute()}>
				<Icon name={muted ? "TbVolumeOff" : icon} />
			</button>
			<input
				type="range"
				min="0"
				max="100"
				value={volume}
				onChange={(e) => ChangeVolume(e.target.value, 10)}
                                className="accent-accent h-2"
			/>
		</div>
	);
}
