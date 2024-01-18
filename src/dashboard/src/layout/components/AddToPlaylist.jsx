import { useContext } from "react";
import { context } from "../../lib/Context";
import Icon from "./Icon";

export default function AddToPlaylist() {
	const { setAddOpen } = useContext(context);

	return (
		<div
			onClick={() => setAddOpen(true)}
			className="p-2 cursor-pointer transition-all duration-300 hover:scale-95 sticky w-fit h-fit rounded-lg flex items-center justify-center text-lg bg-secondary"
		>
			<Icon name="TbPlus" />
		</div>
	);
}
