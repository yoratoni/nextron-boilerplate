import { storage } from "@main/background";
import defaultPreferences from "@main/lib/defaults/preferences.default";
import ERRORS from "@main/lib/utils/errors";
import type { IpcResponse, ParsedIpcRequest } from "@sharedTypes/ipc";
import type { PreferencesObj } from "@sharedTypes/storage";


/**
 * `GET` `/api/preferences` route handler.
 * @returns The current and the default preferences.
 */
async function get(): Promise<IpcResponse> {
    return {
        success: true,
        message: "Successfully retrieved preferences.",
        data: {
            current: storage.get("preferences") as PreferencesObj,
            default: defaultPreferences
        }
    };
}

/**
 * `PUT` `/api/preferences` route handler.
 * @returns The preferences.
 */
async function put(req: ParsedIpcRequest): Promise<IpcResponse> {
    const preferences = storage.get("preferences") as { [key: string]: any };
    const update = req.body as { [key: string]: any };

    for (const key in req.body) {
        if (key in preferences) preferences[key] = update[key];
    }

    return {
        success: true,
        message: "Successfully updated preferences.",
        data: preferences
    };
}

/**
 * Handler for the `/api/preferences` route.
 * @param req The parsed ipc request.
 * @returns The ipc response.
 */
export default async function handler(req: ParsedIpcRequest): Promise<IpcResponse> {
    if (req.method === "GET") return await get();
    if (req.method === "PUT") return await put(req);

    return {
        success: false,
        message: "This route only supports 'GET' requests.",
        data: ERRORS.METHOD_NOT_ALLOWED
    };
}