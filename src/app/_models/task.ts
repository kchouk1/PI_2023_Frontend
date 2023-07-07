import { Project } from "./project";

export class Task {
    id?: number;
    taskName?: "string";
    taskStatus?: "string"; 
    startDate?: Date;
    deadline?: Date;   
    project?:number;
}
