import {ObjectId} from "mongodb";

export interface Game{
    name: string,
    id: string,
    identifier?: string
    image?: string|null,
}
