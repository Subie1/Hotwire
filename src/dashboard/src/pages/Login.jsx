import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { context } from "../lib/Context";

export default function Login() {
	const { host, setPage, _setToken } = useContext(context);
	const [error, setError] = useState("");

	async function LoggingIn(event) {
		event.preventDefault(true);

		const inputs = document.querySelectorAll("#form_data input");
		const data = {};
		for (const input of inputs) {
			data[input.name] = input.value;
		}

		try {
			const { data: user } = await axios.post(`${host}/api/auth/login`, data);
			_setToken(user.token);
		} catch (err) {
			setError(err.response.data);
		}
	}

	useEffect(() => {
		if (!error.length) return;
		setTimeout(() => {
			setError("");
		}, 2_000);
	}, [error]);

	return (
		<form
			onSubmit={LoggingIn}
			className="w-full h-full flex flex-col gap-4 items-center justify-between p-6"
		>
			<div></div>
			<div className="w-full h-full flex flex-col gap-4 items-center justify-center">
				<div className="flex flex-col gap-2 items-start justify-start">
					<header className="text-4xl font-bold bg-gradient-to-br py-1 from-primary to-accent text-transparent bg-clip-text">
						Login
					</header>
					<span className="text-xs opacity-40">Enter your details below</span>
				</div>
				<div id="form_data" className="w-5/12 flex flex-col gap-4">
					<input
						type="text"
						className="w-full py-2 transition-all duration-200 focus:opacity-50 placeholder-text bg-transparent border-b border-b-text opacity-30 outline-none"
						placeholder="Username"
						name="name"
					/>
					<input
						type="password"
						className="w-full py-2 transition-all duration-200 focus:opacity-50 placeholder-text bg-transparent border-b border-b-text opacity-30 outline-none"
						placeholder="Password"
						name="password"
					/>
					<span className="text-xs text-red-400">{error}</span>
					<button
						type="submit"
						className="w-full transition-all duration-200 hover:scale-105 text-md font-semibold p-2 rounded-lg text-background bg-gradient-to-r from-primary to-accent"
					>
						Login
					</button>
				</div>
			</div>
			<div className="w-full text-xs flex gap-6 items-center justify-center">
				<span className="opacity-30">Don&apos;t have an account?</span>
				<button
					onClick={() => setPage(-2)}
					className="bg-secondary transition-all duration-200 hover:scale-105 rounded-lg px-4 py-2"
				>
					Sign up
				</button>
			</div>
		</form>
	);
}
