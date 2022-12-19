import {WithId} from "mongodb";
import {Speedrun, SpeedRunWithUserGameAndApproval, SpeedrunWithUserAndGame} from "./Speedrun"
import {Game} from "./Game";

export interface SpeedrunId{
    message?: string
    speedRun?: SpeedRunWithUserGameAndApproval
}

export interface SpeedrunGameId{
    message?: string
    speedRuns?: SpeedRunWithUserGameAndApproval[]
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
