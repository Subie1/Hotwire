import { useRef, useState, useEffect } from "react";

export default function PeekBar({ videoId }) {
	const videoRef = useRef(null);
	const [currentTime, setCurrentTime] = useState(0);
	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		if (!videoRef.current) videoRef.current = document.getElementById(videoId);

		const video = videoRef.current;

		const handleTimeUpdate = () => {
			if (!isDragging) {
				setCurrentTime(video.currentTime);
			}
		};

		const handleMouseDown = () => {
			setIsDragging(true);
		};

		const handleMouseUp = () => {
			if (isDragging) {
				video.currentTime = currentTime;
				setIsDragging(false);
			}
		};

		const handleMouseMove = (event) => {
			if (isDragging) {
				handleSeek(event);
			}
		};

		video.addEventListener("timeupdate", handleTimeUpdate);
		document.addEventListener("mousedown", handleMouseDown);
		document.addEventListener("mouseup", handleMouseUp);
		document.addEventListener("mousemove", handleMouseMove);

		return () => {
			video.removeEventListener("timeupdate", handleTimeUpdate);
			document.removeEventListener("mousedown", handleMouseDown);
			document.removeEventListener("mouseup", handleMouseUp);
			document.removeEventListener("mousemove", handleMouseMove);
		};
	}, [videoRef, currentTime, isDragging, videoId]);

	const handleSeek = (event) => {
		if (!videoRef.current || !videoRef.current.duration) return;

		const seekBarRect = seekBarRef.current.getBoundingClientRect();
		let seekPosition = (event.clientX - seekBarRect.left) / seekBarRect.width;

		// Ensure seekPosition is within the valid range
		seekPosition = Math.max(0, Math.min(1, seekPosition));

		const newTime = videoRef.current.duration * seekPosition;
		setCurrentTime(newTime);
	};

	const seekBarRef = useRef(null);

	return (
		<div className="flex w-full items-center justify-center gap-4 px-7">
			<span className="text-xs opacity-40">{formatTime(currentTime)}</span>
			<div
				ref={seekBarRef}
				className="w-full h-1 flex items-center bg-background rounded-full relative cursor-pointer"
				onMouseDown={handleSeek}
			>
				<div
					style={{
						left: `${(currentTime / videoRef.current?.duration) * 100 || 0}%`,
					}}
					className="absolute w-2 h-2 rounded-full bg-background"
				/>
			</div>
			<span className="text-xs opacity-40">
				{formatTime(videoRef.current?.duration || 0)}
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
