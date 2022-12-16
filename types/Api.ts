import {WithId} from "mongodb";
import {Speedrun} from "./Speedrun";

export interface SpeedrunId{
    message?: string
    speedRun: WithId<Speedrun>
}

export interface SpeedrunGameId{
    message?: string
    speedRuns: WithId<Speedrun>[]
}
export interface SpeedRunsAPI {
    message?: string
    speedRuns: WithId<Speedrun>[]
}
