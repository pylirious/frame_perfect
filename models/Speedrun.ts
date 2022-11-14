import {Game} from "./Game";

export interface Speedrun {
    id: string,
    game: Game,
    time: number,
    name: string,
}
