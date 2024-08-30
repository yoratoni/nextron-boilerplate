import IpcDemo from "@/components/general/IpcDemo"

export default function Home() {
	return (
		<div className="w-full min-h-screen flex justify-center items-center flex-col">
			<h1 className="text-5xl font-bold">Nextron Boilerplate</h1>
			<h4 className="text-xl font-semibold">by Yoratoni.</h4>

			<p className="pt-4 max-w-sm text-center font-medium text-sm text-gray-400">
				Here&apos;s a quick demo of the IPC bridge & router system in action.
			</p>

			<div className="p-4 mt-6 flex flex-col justify-center items-center gap-8">
				<IpcDemo />
			</div>
		</div>
	)
}
