import {WithId} from "mongodb";
import {Speedrun} from "./Speedrun";
import {Game} from "./Game";

export interface SpeedrunId{
    message?: string
    speedRun?: WithId<Speedrun>
}

export interface SpeedrunGameId{
    message?: string
    speedRuns?: WithId<Speedrun>[]
}
export interface SpeedRunsAPI {
    message?: string
    speedRuns?: WithId<Speedrun>[]
}
export interface GameId{
    message?: string
    game?: WithId<Game>
}
export interface GamesAPI {
    message?: string
    games?: WithId<Game>[]
}
