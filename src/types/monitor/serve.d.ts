namespace TsServe {
    interface Cpu {
        cpuNum: number;
        used: number;
        sys: number;
        free: number;
    }
    interface Mem {
        total: number;
        used: number;
        free: number;
        usage: number;
    }
    interface Jvm {
        total: number;
        used: number;
        free: number;
        usage: number;
        name: string;
        version: string;
        startTime: string;
        runTime: string;
        home: string;
        inputArgs: string;
    }

    interface Sys {
        computerName: string;
        osName: string;
        computerIp: string;
        osArch: string;
        userDir: string;
    }
    interface sysFile {
        "dirName": string,
        "sysTypeName": string,
        "typeName": string,
        "total": string,
        "free": string,
        "used": string,
        "usage": number
    }
    interface FormData {
        cpu: Cpu,
        mem: Mem,
        jvm: Jvm;
        sys: Sys;
        sysFiles: sysFile[];
    }

    interface DataJava extends Jvm, Sys {}
}