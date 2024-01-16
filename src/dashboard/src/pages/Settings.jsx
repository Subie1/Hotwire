import { useContext, useRef } from "react";
import { context } from "../lib/Context";
import Icon from "../layout/components/Icon";

export default function Settings() {
    const input = useRef(null);
	const { host, setHost } = useContext(context);

    function ChangeHost() {
        if (!input.current) return;
        if (!input.current.value) return;
        if (!input.current.value.trim().length) return;

        let query = input.current.value.trim();
        if (query.endsWith("/")) query = query.slice(0, query.length - 1);
        setHost(query);

        input.current.value = "";
    }

	return (
		<main className="w-full h-full m-1 p-3 gap-2 space-y-0 items-start justify-start flex flex-wrap overflow-auto">
			<div className="w-full h-16 bg-secondary rounded-2xl flex p-2 gap-1">
				<input
                    placeholder={host}
					ref={input}
					type="text"
					className="w-full h-full outline-none bg-background rounded-2xl p-4"
				/>
				<div
					onClick={() => ChangeHost()}
					className="flex cursor-pointer items-center justify-center rounded-2xl bg-background p-4"
				>
					<Icon name="TbThumbUp" className="fill-text" />
				</div>
			</div>
		</main>
	);
}
