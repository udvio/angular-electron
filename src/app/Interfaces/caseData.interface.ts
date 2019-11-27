export interface ICaseData {
    "caseNumber": number;
    "caseType": string;
    "_caseID": string;
    "casePhases": {
        [key:string] : ICasePhase
    }
}

export interface ICasePhase {
    "name" : string;
    "status" : "done" | "ongoing" | "notStarted";
    "fileInfo" : {
        [key: string]: IFileInfo
    }
}

export interface IFileInfo {
    "name": string;
    "duration": number;
    "dependency": string; //f1 / f2 / fn or none
    "completed": boolean,
    "fileID"?: string
}