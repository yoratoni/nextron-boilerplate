/**
 * The options passed to the incoming ipc request.
 * @param method The method to use (optional, defaults to `GET`).
 * @param headers The headers of the request (optional, defaults to `{}`).
 * @param body The body of the request (optional, defaults to `{}`).
 * @param silent Whether to suppress the backend log or not (optional, defaults to `false`).
 */
export type IpcRequestOptions = {
	method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT"
	headers?: object
	body?: object
	silent?: boolean
}

/**
 * Incoming ipc request.
 * @param url The ipc route url.
 * @param options The options to pass to the ipc bridge (optional, see `IpcRequestOptions` for default values).
 */
export type IpcRequest = {
	url: string
	options?: IpcRequestOptions
}

/**
 * Parsed ipc request with mandatory options merged with url.
 * @param url The ipc route url.
 * @param method The method to use (optional, defaults to `GET`).
 * @param headers The headers of the request (optional, defaults to `{}`).
 * @param query The query of the request (optional, defaults to `{}`).
 * @param body The body of the request (optional, defaults to `{}`).
 * @param silent Whether to suppress the backend log or not (optional, defaults to `false`).
 */
export type ParsedIpcRequest = {
	url: string
	method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT"
	headers?: object
	query?: object
	body?: object
	silent?: boolean
}

/**
 * Response from the ipc router.
 * @param success Whether the request was successful or not.
 * @param message The message of the response.
 * @param data The data of the response.
 */
export type IpcResponse = {
	success: boolean
	message: string
	data: object | null
}

/**
 * An allowed `any` for IPC-related functions.
 */
// biome-ignore lint/suspicious/noExplicitAny: This is an allowed `any` for IPC-related functions.
export type IpcAny = any
