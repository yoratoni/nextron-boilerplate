export default function Home() {
    return (
        <div className="text-3xl">
            Hello, world!
            {process.env.NEXT_ELECTRON_SERVER_PORT}
        </div>
    );
}