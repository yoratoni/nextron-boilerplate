import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"

import useInterval from "@/hooks/useInterval"
import { getEnvironment } from "@/lib/crud/environment"
import { getPreferences } from "@/lib/crud/preferences"
import { getSysInfo } from "@/lib/crud/sysInfo"
import type { Environment, SysInfo } from "@sharedTypes/api"
import type { Preferences } from "@sharedTypes/storage"

export default function IpcDemo() {
	const [environment, setEnvironment] = useState<Environment>()
	const [preferences, setPreferences] = useState<Preferences>()
	const [sysInfo, setSysInfo] = useState<SysInfo>()

	useEffect(() => {
		// Get all initial data from APIs (ipc bridge)
		const getInitialData = async () => {
			const env = await getEnvironment()
			const prefs = await getPreferences()

			if (env) setEnvironment(env)
			if (prefs) setPreferences(prefs)
		}

		getInitialData()
	}, [])

	// Get system information (by preference interval, defaults to 1500ms)
	useInterval(async () => {
		const info = await getSysInfo()
		if (info) setSysInfo(info)
	}, preferences?.current.sysInfo.refreshInterval || 1500)

	return (
		<div className="flex flex-col gap-6 justify-center items-center">
			<div className="w-full max-w-sm">
				<h3 className="font-medium">Environment:</h3>
				<pre className="text-sm leading-5">{environment ? JSON.stringify(environment, null, 4) : "..."}</pre>
			</div>

			<div className="w-full max-w-sm">
				<h3 className="font-medium">Preferences:</h3>
				<pre className="text-sm leading-5">{preferences ? JSON.stringify(preferences, null, 4) : "..."}</pre>
			</div>

			<div className="w-full max-w-sm gap-2 flex flex-col text-left items-start">
				<h3 className="font-medium">
					System information ({preferences?.current.sysInfo.refreshInterval || 1500}ms interval):
				</h3>

				<span key={0} title="System CPU usage" className="flex justify-center items-center text-sm font-normal">
					&gt;&nbsp;
					<Icon icon="material-symbols:speed-outline-rounded" inline className="text-lg mr-1.5" />
					{sysInfo ? sysInfo.cpu.str : "..."} (CPU usage)
				</span>

				<span
					key={1}
					title="System memory usage"
					className="flex justify-center items-center text-sm font-normal"
				>
					&gt;&nbsp;
					<Icon icon="material-symbols:memory-outline-rounded" inline className="text-lg mr-1" />
					{sysInfo ? sysInfo.memory.str : "..."} (Memory usage)
				</span>
			</div>
		</div>
	)
}
