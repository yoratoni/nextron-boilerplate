import {
    BrowserWindow,
    BrowserWindowConstructorOptions,
    Rectangle,
    screen
} from "electron";
import Store from "electron-store";


type IsWindow = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export const createWindow = (
    windowName: string,
    options: BrowserWindowConstructorOptions
): BrowserWindow => {
    const key = "window-state";
    const name = `window-state-${windowName}`;
    const store = new Store<Rectangle>({ name });

    const defaultSize = {
        x: options.x || 0,
        y: options.y || 0,
        width: options.width || 800,
        height: options.height || 600
    };

    let state: IsWindow = {
        ...defaultSize
    };

    const restore = () => store.get(key, defaultSize);

    const getCurrentPosition = (): IsWindow => {
        const position = win.getPosition();
        const size = win.getSize();

        return {
            x: position[0],
            y: position[1],
            width: size[0],
            height: size[1]
        };
    };

    const windowWithinBounds = (windowState: IsWindow, bounds: IsWindow) => (
        windowState.x >= bounds.x &&
            windowState.y >= bounds.y &&
            windowState.x + windowState.width <= bounds.x + bounds.width &&
            windowState.y + windowState.height <= bounds.y + bounds.height
    );

    const resetToDefaults = () => {
        const bounds = screen.getPrimaryDisplay().bounds;

        return Object.assign({}, defaultSize, {
            x: (bounds.width - defaultSize.width) / 2,
            y: (bounds.height - defaultSize.height) / 2
        });
    };

    const ensureVisibleOnSomeDisplay = (windowState: IsWindow) => {
        const visible = screen.getAllDisplays().some((display) => windowWithinBounds(windowState, display.bounds));

        if (!visible) {
            // Window is partially or fully not visible now.
            // Reset it to safe defaults.
            return resetToDefaults();
        }

        return windowState;
    };

    const saveState = () => {
        if (!win.isMinimized() && !win.isMaximized()) {
            Object.assign(state, getCurrentPosition());
        }

        store.set(key, state);
    };

    state = ensureVisibleOnSomeDisplay(restore());

    console.log(restore());

    const win = new BrowserWindow({
        ...state,
        ...options,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            ...options.webPreferences
        }
    });

    // Center window if x and y set to 0
    if (state.x === 0 && state.y === 0) {
        win.center();
    }

    win.on("close", saveState);

    return win;
};
