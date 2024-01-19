import { useContext, useEffect, useState } from "react";
import { context } from "../lib/Context";

function useIsPlaying() {
	const { player } = useContext(context);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		if (!player) return;
		const handlePlaying = () => {
			setIsPlaying(true);
		};

		const handlePaused = () => {
			setIsPlaying(false);
		};

		player.addEventListener("playing", handlePlaying);
		player.addEventListener("pause", handlePaused);
		player.addEventListener("ended", handlePaused);

		return () => {
			player.removeEventListener("playing", handlePlaying);
			player.removeEventListener("pause", handlePaused);
			player.removeEventListener("ended", handlePaused);
		};
	}, []);

	return isPlaying;
}

export default useIsPlaying;
