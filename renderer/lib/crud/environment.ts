import type { Environment } from "@sharedTypes/api"

/**
 * Get the app environment.
 * @returns The app environment.
 */
export async function getEnvironment() {
	const response = await window.ipcBridge("/api/environment")

	if (response.success) return response.data as Environment
	console.error(`Failed to get the environment: ${response.data}`)
	return null
}
