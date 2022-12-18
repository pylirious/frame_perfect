import {WithId} from "mongodb";
import {Speedrun, SpeedrunWithUserAndGame} from "./Speedrun"
import {Game} from "./Game";

export interface SpeedrunId{
    message?: string
    speedRun?: SpeedrunWithUserAndGame
}

export interface SpeedrunGameId{
    message?: string
    speedRuns?: Speedrun[]
}
export interface SpeedRunsAPI {
    message?: string
    speedRuns?: Speedrun[]
}
export interface GameId{
    message?: string
    game?: Game
}
export interface GamesAPI {
    message?: string
    games?: Game[]
}
