// POST /api/new-meetup

import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_DB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    await client.connect();

    const db = client.db();
    const meetupCollection = db.collection("meetups");

    await meetupCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
