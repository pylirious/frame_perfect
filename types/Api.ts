import {WithId} from "mongodb";
import {Speedrun, SpeedRunWithUserGameAndApproval, SpeedrunWithUserAndGame, SpeedrunWithUserNameAndApproval} from "./Speedrun"
import {Game} from "./Game";
import {User} from "@prisma/client";

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
    speedRuns?: SpeedrunWithUserNameAndApproval[]
}
export interface UsersApi {
    message?: string
    users?: User[]
}
export interface GameId{
    message?: string
    game?: Game
}
export interface GamesAPI {
    message?: string
    games?: Game[]
}
