import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ac-php7rd4-shard-00-00.8bihj8d.mongodb.net:27017,ac-php7rd4-shard-00-01.8bihj8d.mongodb.net:27017,ac-php7rd4-shard-00-02.8bihj8d.mongodb.net:27017/?ssl=true&replicaSet=atlas-fmvmrf-shard-0&authSource=admin`);
const db = client.db('studiospaceDB');

export const auth = betterAuth({
      emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
  database: mongodbAdapter(db, {
    client,
  }),
});