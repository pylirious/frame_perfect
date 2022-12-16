import {Game} from "./Game";
import {User} from "next-auth";
import {ObjectId} from "mongodb";

export interface Speedrun {
    game: ObjectId,
    time: number,
    name: string,
    user: User,
    link: string
}
