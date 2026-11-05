import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const mongoUrl = process.env.MONGODB_URL;
if (!mongoUrl) {
  throw new Error("MONGO_URL environment variable is required");
}

const client = new MongoClient(mongoUrl);
const db = client.db('studiospaceDB');

export const auth = betterAuth({
      emailAndPassword: { 
    enabled: true, 
  }, 
  plugins:[jwt()],
  session:{
    cookieCache:{
      enabled:true,
      strategy:'jwt',
      maxAge:7*24*60*60
    }
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