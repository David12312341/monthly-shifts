import { Poll } from "app/models/poll";

export class User {
    public name: string;
    public preferences: Poll;
    public _id: string;
}
