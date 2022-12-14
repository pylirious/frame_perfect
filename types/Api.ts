import {WithId} from "mongodb";
import {Speedrun} from "./Speedrun";

export interface SpeedrunId{
    message?: string
    game?: WithId<Speedrun>
}
