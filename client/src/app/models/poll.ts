import { Week } from "app/models/week";

export class Poll {
    public name: string;
    public month: string;
    public year: string;
    public shifts: Week[]
    public _id;
}
