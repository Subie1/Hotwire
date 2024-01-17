import { useContext } from "react";
import Icon from "./Icon";
import { context } from "../../lib/Context";

export default function AddSong() {
	const { setDownloadOpened } = useContext(context);

	return (
		<div
			onClick={() => setDownloadOpened(true)}
			className="flex transition-all duration-200 hover:scale-105 cursor-pointer items-center justify-center rounded-full bg-secondary p-3 text-xl"
		>
			<Icon name="TbPlus" />
		</div>
	);
}
