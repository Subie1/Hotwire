import { useEffect, useState } from "react";

function useIsPlaying() {
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		const videoElement = document.getElementById("music_player");

		if (videoElement) {
			const handlePlaying = () => {
				setIsPlaying(true);
			};

			const handlePaused = () => {
				setIsPlaying(false);
			};

			videoElement.addEventListener("playing", handlePlaying);
			videoElement.addEventListener("pause", handlePaused);
			videoElement.addEventListener("ended", handlePaused);

			// Cleanup function to remove event listeners
			return () => {
				videoElement.removeEventListener("playing", handlePlaying);
				videoElement.removeEventListener("pause", handlePaused);
				videoElement.removeEventListener("ended", handlePaused);
			};
		}
	}, []); // Empty dependency array to run the effect only once

	return isPlaying;
}

export default useIsPlaying;
