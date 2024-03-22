import { useEffect, useState } from "react";

import SysInfo from "@/components/general/SysInfo";
import { IpcResponse, SHR__AppInfo } from "@sharedTypes/shared";


export default function Home() {
    const [appInfo, setAppInfo] = useState<SHR__AppInfo | null>(null);

    useEffect(() => {
        const getAppInfo = async () => {
            const response = await window.ipcBridge("/api/app-info") as IpcResponse;
            setAppInfo(response.data as SHR__AppInfo);
        };

        getAppInfo();
    }, []);

    return (
        <div className="w-full min-h-screen flex justify-center items-center flex-col">
            <h1 className="text-4xl font-bold">Nextron Boilerplate</h1>
            <h4 className="text-lg font-semibold">by Yoratoni</h4>

            <div className="p-4 mt-6 flex flex-col justify-center items-center gap-8">
                {appInfo && (
                    <div className="text-base">
                        <p className="text-lg font-semibold">App Info:</p>
                        <p>Name: {appInfo.name}</p>
                        <p>Version: {appInfo.version}</p>
                        <p>Environment: {appInfo.environment}</p>
                    </div>
                )}

                <SysInfo />
            </div>
        </div>
    );
}