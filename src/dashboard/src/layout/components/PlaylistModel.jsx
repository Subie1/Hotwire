import { useContext, useRef } from "react";
import { context } from "../../lib/Context";
import axios from "axios";
import Icon from "./Icon";

export default function PlaylistModel() {
	const input = useRef(null);
	const { setPlaylistsOpen, host, setPlaylists, playlists } =
		useContext(context);

	function AddPlaylist() {
		setPlaylistsOpen(false);
		if (!input.current.value.trim().length) return;
		axios
			.post(`${host}/api/playlists/create`, {
				name: input.current.value.trim(),
			})
			.then(({ data }) => {
				const previous = [...playlists, data.id];
				setPlaylists(previous);
			});
		input.current.value = "";
	}

	function CloseModel(event) {
		if (event.target !== event.currentTarget) return;
		setPlaylistsOpen(false);
	}

	return (
		<div
			onClick={CloseModel}
			className="bg-black bg-opacity-40 z-50 flex-col gap-2 fixed w-full h-full overflow-hidden flex items-center justify-center top-0 left-0"
		>
			<header className="text-xs p-2 bg-background rounded-xl">
				Name your playlist
			</header>
			<div className="w-3/5 h-16 bg-secondary rounded-2xl flex p-2 gap-1">
				<input
					ref={input}
					type="text"
					className="w-full h-full outline-none bg-background rounded-2xl p-4"
				/>
				<div
					onClick={() => AddPlaylist()}
					className="flex cursor-pointer items-center justify-center rounded-2xl bg-background p-4"
				>
					<Icon name="TbThumbUp" className="fill-text" />
				</div>
			</div>
		</div>
	);
}
