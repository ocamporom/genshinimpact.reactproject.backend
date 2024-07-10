import express from "express";
import process from "node:process";
import { readFile, writeFile, stat } from "node:fs/promises";
import cors from "cors";
import bodyParser from "body-parser";
import Character from "./models/Character.js";
import connectDb from './connectDb.js';

await connectDb();


const app = express();
const PORT = process.env.PORT || 3000;

app.set("port", PORT);

app.use(cors()); // For simplicity
app.use(bodyParser.json()); // To parse JSON body///

// GET Request localhost:3000
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World!",
  });
});

// get all characters
app.post("/characters", async (req, res) => {
  // 💡 Only get what information is needed
  const {
    name,
    title,
    vision,
    weapon,
    nation,
    affiliation,
    rarity,
    constellation,
    description,
    imageUrl
  } = req.body;

  const character = new Character({
    name: name,
    title: title,
    vision: vision,
    weapon: weapon,

    nation: nation,
    affiliation: affiliation,
    rarity: rarity,

    constellation: constellation,

    description: description,
    imageUrl: imageUrl,
  });

  // 💡 Use try...catch block to be able to catch any errors during saving
  await character.save();

  // Do not forget to always response a happy face :)
  // 💡 The property status code for creation is 201 Created
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
  res.status(201).json({
    message: "Successfully created Characters",
    data: character,
  });
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
