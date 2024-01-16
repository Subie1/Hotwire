import { useContext, useRef } from "react";
import { context } from "../../lib/Context";
import axios from "axios";
import Icon from "./Icon";

export default function AddModel() {
	const input = useRef(null);
	const { setOpened, setSongs, host } = useContext(context);

	function DownloadVideo() {
		setOpened(false);
		if (!input.current.value.trim().length) return;
		axios
			.post(`${host}/api/download/youtube`, { video: input.current.value.trim() })
			.then(() => {
				axios.get(`${host}/api/songs`).then(({ data }) => {
					setSongs(data);
				});
			});
		input.current.value = "";
	}

    function CloseModel(event) {
        if (event.target !== event.currentTarget) return;
        setOpened(false);
    }

	return (
		<div
			onClick={CloseModel}
			className="bg-black bg-opacity-40 z-50 flex-col gap-2 fixed w-full h-full overflow-hidden flex items-center justify-center top-0 left-0"
		>
			<header className="text-xs p-2 bg-background rounded-xl">Add a song from youtube</header>
			<div className="w-3/5 h-16 bg-secondary rounded-2xl flex p-2 gap-1">
				<input
					ref={input}
					type="text"
					className="w-full h-full outline-none bg-background rounded-2xl p-4"
				/>
				<div
					onClick={() => DownloadVideo()}
					className="flex cursor-pointer items-center justify-center rounded-2xl bg-background p-4"
				>
					<Icon name="TbThumbUp" className="fill-text" />
				</div>
			</div>
		</div>
	);
}
