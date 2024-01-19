import { useRef, useState, useEffect } from "react";

export default function Slider({
	value,
	minimum,
	maximum,
	onChange,
	onRelease,
	className,
}) {
	const sliderRef = useRef(null);
	const [isDragging, setIsDragging] = useState(false);
	const [sliderValue, setSliderValue] = useState(value);

	const handleSeek = (event) => {
		if (!sliderRef.current) return;

		const sliderRect = sliderRef.current.getBoundingClientRect();
		let seekPosition = (event.clientX - sliderRect.left) / sliderRect.width;

		seekPosition = Math.max(0, Math.min(1, seekPosition));

		const newValue = minimum + (maximum - minimum) * seekPosition;
		setSliderValue(newValue);
		if (onChange) onChange(newValue);
	};

	const isWithinSlider = (event) => {
		if (!sliderRef.current) return false;

		const sliderRect = sliderRef.current.getBoundingClientRect();
		return (
			event.clientX >= sliderRect.left &&
			event.clientX <= sliderRect.right &&
			event.clientY >= sliderRect.top &&
			event.clientY <= sliderRect.bottom
		);
	};

	const handleMouseDown = (event) => {
		if (!isWithinSlider(event)) return;
		setIsDragging(true);
		handleSeek(event);
	};

	const handleMouseUp = () => {
		if (isDragging) {
			setIsDragging(false);
			if (onRelease) onRelease(sliderValue);
		}
	};

	const handleMouseMove = (event) => {
		if (isDragging) handleSeek(event);
	};

	useEffect(() => {
		setSliderValue(value);
	}, [value]);

	useEffect(() => {
		document.addEventListener("mousedown", handleMouseDown);
		document.addEventListener("mouseup", handleMouseUp);
		document.addEventListener("mousemove", handleMouseMove);

		return () => {
			document.removeEventListener("mousedown", handleMouseDown);
			document.removeEventListener("mouseup", handleMouseUp);
			document.removeEventListener("mousemove", handleMouseMove);
		};
	}, [isDragging, sliderValue]);

	return (
		<div
			ref={sliderRef}
			className={`h-1 flex items-center bg-background rounded-full relative cursor-pointer ${className ?? ""}`}
			onMouseDown={handleMouseDown}
		>
			<div
				style={{
					left: `${
						((sliderValue - minimum) / (maximum - minimum)) * 100 || 0
					}%`,
				}}
				className="absolute w-2 h-2 rounded-full bg-background"
			/>
		</div>
	);
}
