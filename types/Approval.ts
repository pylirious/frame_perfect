import {ObjectId} from "mongodb";
import {User} from "next-auth";

export interface Approval {
    speedrun: ObjectId,
    time: number,
    name: string,
    user: User,
    link: string
}
