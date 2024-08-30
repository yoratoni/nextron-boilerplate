/**
 * Error Codes.
 */
export type ErrorCode = {
	status: number // HTTP Status Code
	code: string // Error Code (status + variant)
	log: string // Log message
	// biome-ignore lint/suspicious/noExplicitAny: Can't infer the type of `data` here.
	data: any // Additional data
}
