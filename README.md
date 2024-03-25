# Nextron Boilerplate
A Nextron boilerplate with Next.js v14, Electron v26 and TypeScript.

Summary
-------
This boilerplate integrates:
- [EsLint](https://eslint.org/) - It is highly configured to suit how I write code, but you can change it to your liking.
- [Tailwind CSS](https://tailwindcss.com/) support.
- [Iconify](https://iconify.design/) support.
- [systeminformation](https://systeminformation.io/) support.
- Roboto Mono as a preset font so you don't have to configure Next.js with Tailwind CSS,
  just to change the font in `./renderer/lib/fonts/index.ts` if needed.
- Example IPC routes:
    - `/api/app-info` - Returns the application information.
    - `/api/sys-info` - Returns the CPU and memory usage.
- Hooks:
    - `useInterval` - A custom hook for setting a loop with an interval in the frontend.
    - `useMousePosition` - A custom hook for tracking the mouse position in the frontend.

It also integrates an IPC protocol with standardized error codes and shared types
between the main and renderer processes.

### Here's quick overview of the IPC protocol architecture:
The `window.ipcBridge()` exposed function is used to send a request to the main
process. The main process will then handle the request and return a response
depending on the route chosen.
```typescript
// main/preload.ts

/**
 * The ipc bridge function passes the request to the main process
 * via the ipc router and returns the response.
 * @param url The ipc route url.
 * @param method The method to use (optional, defaults to `GET`).
 * @param body The body of the request (optional, defaults to `undefined`).
 * @returns A promise that resolves to the response.
 */
async function ipcBridge(
    url: string,
    options?: IpcRequestOptions
): Promise<IpcResponse>
```

The `ipcBridge()` function treats the request, then use the `ipc::router` channel
to send the request to the main process where the `ipcRouter` function will decide
via the `url` parameter which route to take.
```typescript
// main/api/routes.ts

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
): Promise<IpcResponse>
```

The `ipcRouter()` function parses the potential queries from the url and converts the request
into a standardized format similar to a REST API request:
```typescript
// types/shared.d.ts

/**
 * Parsed ipc request with mandatory options merged with url.
 * @param url The ipc route url.
 * @param method The method to use (optional, defaults to `GET`).
 * @param headers The headers of the request (optional, defaults to `{}`).
 * @param query The query of the request (optional, defaults to `{}`).
 * @param body The body of the request (optional, defaults to `{}`).
 */
export type ParsedIpcRequest = {
    url: string;
    method: "GET" | "POST" | "PATCH" | "DELETE";
    headers?: object;
    query?: object;
    body?: object;
}
```

Then, the switch statement in the `ipcRouter()` function redirects to the different handlers,
which are represented by a folder with an `index.ts` file that exports the handler function.
Or returns a standard 404 error if the route is not found.
```typescript
// main/api/routes.ts

switch (req.url) {
    case "/api/app-info": {
        res = await apiAppInfoHandler(parsedIpcRequest);
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
```

In this example, the `apiAppInfoHandler()` function is called with the parsed request and returns
a response with the data or an error message.
```typescript
// main/api/app-info/index.ts

/**
 * `GET` /api/app-info route handler.
 * @returns The info of the application.
 */
async function getAppInfo() {
    return ({
        ...appConfig,
        applicationPath: __dirname
    });
}

/**
 * Handler for the /api/app-info route.
 */
export default async function handler(req: ParsedIpcRequest): Promise<IpcResponse> {
    if (req.method === "GET") {
        const data = await getAppInfo();

        return {
            success: true,
            message: "Successfully retrieved application information.",
            data: data
        };
    }

    return {
        success: false,
        message: "This route only supports GET requests.",
        data: ERRORS.METHOD_NOT_ALLOWED
    };
}
```
