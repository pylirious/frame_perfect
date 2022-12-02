import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI

let mongoClient: MongoClient;

// Singleton pattern for MongoClient
export async function getMongoClient(): Promise<MongoClient> {
    if (!mongoClient) {
        if (!uri) {
            throw new Error("Please add your Mongo URI to .env.local")
        }

        mongoClient = new MongoClient(uri);
        await mongoClient.connect();
    }
    return mongoClient;
}
