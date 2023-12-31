import Square from "../layout/components/Square";

export default function SquarePage() {
    return (
        <main className="w-full h-full gap-2 flex items-center justify-center">
            <Square />
            <p>This is a square. (Click It)</p>
        </main>
    )
}