import { Icon } from "@iconify/react";
import { useState } from "react";

import useInterval from "@/hooks/useInterval";
import { SHR__SysInfo } from "@sharedTypes/shared";


export default function SysInfo() {
    const [sysInfo, setSysInfo] = useState<SHR__SysInfo>();

    useInterval(async () => {
        const res = await window.ipcBridge("/api/sys-info");
        setSysInfo(res.data as SHR__SysInfo);
    }, 1500);

    return (
        <div className="">
            <span key={0} title="System CPU usage" className="flex justify-center items-center">
                <Icon icon="material-symbols:speed-outline-rounded" inline className="text-lg mr-1.5" />
                {sysInfo ? sysInfo.cpu.str : "..."} (CPU usage)
            </span>
            <span key={1} title="System memory usage" className="flex justify-center items-center min-w-[8em]">
                <Icon icon="material-symbols:memory-outline-rounded" inline className="text-lg mr-1" />
                {sysInfo ? sysInfo.memory.str : "..."} (Memory usage)
            </span>
        </div>
    );
}