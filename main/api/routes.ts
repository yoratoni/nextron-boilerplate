import { IpcMainInvokeEvent } from "electron";

import apiAppInfoHandler from "@main/api/app-info";
import apiSysInfoHandler from "@main/api/sys-info";
import { ERRORS } from "@main/lib/errors";
import { parseQueryFromUrl } from "@main/lib/utils/api";

import { IpcRequest, IpcResponse, ParsedIpcRequest } from "../../types/shared";


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

    // Parse the ipc request, making it easier to work with in the handlers.
    // ex: `req.options?.url` query parameters goes into `req.query`
    // ex: `req.options?.body` becomes `req.body`
    // etc..
    const parsedIpcRequest: ParsedIpcRequest = {
        url: req.url,
        method: req.options?.method || "GET",
        headers: req.options?.headers || {},
        query: parseQueryFromUrl(req.url),
        body: req.options?.body
    };

    let res: IpcResponse;

    switch (req.url) {
        case "/api/app-info": {
            res = await apiAppInfoHandler(parsedIpcRequest);
            break;
        }
        case "/api/sys-info": {
            res = await apiSysInfoHandler(parsedIpcRequest);
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

    return res;
}