import type { Preferences } from "@sharedTypes/storage";


/**
 * Retrieves the preferences.
 * @returns The current and the default preferences.
 */
export async function getPreferences(): Promise<Preferences | null> {
    const response = await window.ipcBridge("/api/preferences");

    if (response.success) return response.data as Preferences;
    console.error(`Failed to get the preferences: ${response.data}`);
    return null;
}

/**
 * Updates the preferences (`PUT`).
 * @param update The update to apply.
 * @returns The updated preferences.
 */
export async function updatePreferences(update: { [key: string]: any }): Promise<Preferences | null> {
    const response = await window.ipcBridge("/api/preferences", {
        method: "PUT",
        body: update
    });

    if (response.success) return response.data as Preferences;
    console.error(`Failed to update the preferences: ${response.data}`);
    return null;
}