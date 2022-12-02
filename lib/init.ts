import {getMongoClient} from "./mongodb";

export const initGames = async () => {
    const db = await getMongoClient()
    await db.db("FramePerfect").collection("games").insertMany([{
        name: "Minecraft",
        id: "minecraft",
        image: "https://store-images.s-microsoft.com/image/apps.17382.13510798885735219.9735d495-578c-4a4c-b892-3eb3a780b3a0.d3792486-cf98-40c0-a2c1-d6443f0e2b70?q=90&w=177&h=265",
    },{
        name: "Super Mario 64",
        id: "mario64",
        image: "https://www.speedrun.com/gameasset/o1y9wo6q/cover?v=82fa0a4",
    },{
        name: "Subway Surfers",
        id: "subwaysurf",
        image: "https://www.speedrun.com/gameasset/y65797de/cover?v=1fbce28",
    }])

}
