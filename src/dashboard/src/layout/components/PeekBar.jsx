import { useRef, useState, useEffect } from "react";

function PeekBar({ videoId }) {
	const videoRef = useRef(null);
	const [currentTime, setCurrentTime] = useState(0);
	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		if (!videoRef.current) videoRef.current = document.getElementById(videoId);

		const video = videoRef.current;
		setCurrentTime(video.currentTime);

		const handleTimeUpdate = () => {
			setCurrentTime(video.currentTime);
		};

		const handleMouseDown = () => {
			setIsDragging(true);
		};

		const handleMouseUp = () => {
			setIsDragging(false);
		};

		video.addEventListener("timeupdate", handleTimeUpdate);
		document.addEventListener("mousedown", handleMouseDown);
		document.addEventListener("mouseup", handleMouseUp);

		return () => {
			video.removeEventListener("timeupdate", handleTimeUpdate);
			document.removeEventListener("mousedown", handleMouseDown);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [videoRef, currentTime]);

	const handleSeek = (event) => {
		if (!videoRef.current || !videoRef.current.duration) return;

		const seekPosition =
			event.nativeEvent.offsetX / seekBarRef.current.offsetWidth;
		const newTime = videoRef.current.duration * seekPosition;
		videoRef.current.currentTime = newTime;
	};

	const handleDrag = (event) => {
		if (!isDragging) return;
		handleSeek(event);
	};

	const seekBarRef = useRef(null);

	return (
		<div className="flex w-full items-center justify-center gap-4 px-7">
			<span className="text-xs opacity-40">{formatTime(currentTime)}</span>
			<div
				ref={seekBarRef}
				className="w-full h-1 flex items-center bg-background rounded-full relative cursor-pointer"
				onClick={handleSeek}
				onMouseMove={handleDrag}
			>
				<div
					style={{
						left: videoRef.current
							? videoRef.current.duration
								? `${Math.floor(
										(currentTime / videoRef.current.duration) * 100
								  )}%`
								: "0"
							: "0",
					}}
					className="absolute w-2 h-2 rounded-full bg-background"
				/>
			</div>
			<span className="text-xs opacity-40">
				{formatTime(
					videoRef.current
						? videoRef.current.duration
							? videoRef.current.duration
							: 0
						: 0
				)}
			</span>
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

export default PeekBar;
