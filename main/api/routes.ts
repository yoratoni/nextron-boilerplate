import type { IpcMainInvokeEvent } from "electron";

import apiEnvironmentHandler from "@main/api/environment";
import apiPreferencesHandler from "@main/api/preferences";
import apiSysInfoHandler from "@main/api/sys-info";
import { parseQueryFromUrl, removeQueryFromUrl } from "@main/lib/utils/api";
import ERRORS from "@main/lib/utils/errors";
import logger from "@main/lib/utils/logger";
import type { IpcRequest, IpcResponse, ParsedIpcRequest } from "@sharedTypes/ipc";


/**
 * The ipc router redirects the incoming requests
 * to the appropriate handler (route) based on the request URL.
 * @param event The ipc event.
 * @param req The ipc request.
 * @returns The response from the handler.
 */
export default async function ipcRouter(
    event: IpcMainInvokeEvent,
    req: IpcRequest
): Promise<IpcResponse> {
    event.preventDefault();

    // Removes all query parameters from the URL.
    const url = removeQueryFromUrl(req.url);

    // Parse the ipc request, making it easier to work with in the handlers.
    // ex: `req.options?.url` query parameters goes into `req.query`
    // ex: `req.options?.body` becomes `req.body`
    // etc..
    const parsedIpcRequest: ParsedIpcRequest = {
        url: url,
        method: req.options?.method || "GET",
        headers: req.options?.headers || {},
        query: parseQueryFromUrl(req.url),
        body: req.options?.body,
        silent: req.options?.silent || false
    };

    let res: IpcResponse;

    switch (url) {
        case "/api/environment": {
            res = await apiEnvironmentHandler(parsedIpcRequest);
            break;
        }
        case "/api/sys-info": {
            res = await apiSysInfoHandler(parsedIpcRequest);
            break;
        }
        case "/api/preferences": {
            res = await apiPreferencesHandler(parsedIpcRequest);
            break;
        }
        default: {
            return {
                success: false,
                message: "Ipc route not found.",
                data: ERRORS.NOT_FOUND
            };
        }
    }

    if (!parsedIpcRequest.silent) {
        logger.info(`IPC request sent to '${req.url}': ${JSON.stringify(res.data, null, 4)}`);
    }

    return res;
}