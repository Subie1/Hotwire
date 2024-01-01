import axios from "axios"
import { useEffect, useState } from "react"

export default function Footer() {
    const [text, setText] = useState(null);

    useEffect(() => {
        axios.get("/api/ping").then(({ data }) => {
            setText(data.message);
        })
    })

    return (
        <footer className={`w-full h-fit ${text ? "" : "animate-pulse" } fixed bottom-0 p-4 text-center border-t border-t-primary`}>
            <p>{text ?? "Connecting to API"}</p>
        </footer>
    )
}