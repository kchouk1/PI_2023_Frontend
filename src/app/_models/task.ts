import { Project } from "./project";

export class Task {
    id?: number;
    taskName?: "string";
    taskStatus?: "string"; 
    dateStart?: Date;
    deadline?: Date;   
    project?:number;
}
