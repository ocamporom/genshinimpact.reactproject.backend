import express from "express";
import process from "node:process";
import { readFile, writeFile, stat } from "node:fs/promises";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import Character from "./models/Character.js";
import Weapons from "./models/Weapons.js"
import connectDb from "./connectDb.js";

await connectDb();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("port", PORT);

app.use(cors()); // For simplicity
app.use(helmet());
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
    imageUrl,
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

  await character.save();

  res.status(201).json({
    message: "Successfully created Characters",
    data: character,
  });
});

// All characters
app.get('/characters', async (req, res) => {
 
  const characters = await Character.find({}) // 1 model / null

  res.status(200).json(characters);
});

//get details na itttuuuu?
app.get("/characters/:id", async (req, res) => {
  const { id } = req.params;

  const character = await Character.findById(id);

  if (!character) {
    res.status(404).json({
      message: "Character cannot be found",
    });

    return;
  }

  res.status(200).json({
    message: "Character is found",
    data: character,
  });
});

app.put("/characters/:id", async (req, res) => {
  const { id } = req.params.id;

  let characters = await readFile("./genshindata/character.json", {
    encoding: "utf8",
  });
  characters = JSON.parse(characters);

  const charactersIndex = characters.findIndex(
    (character) => character.id === id
  );


  if (charactersIndex === -1) {
    /// mixed ung characters! so panow?

    //!/^[0-9a-fA-F]{24}$/.test(id) ito ung testing na tugma sa mongo de ponggol pano to? HAHAHAHAHH

    res.send("Character not found");
  }

  characters[charactersIndex] = {
    ...req.body,
    id: characters[charactersIndex]["id"],
  };

  await writeFile("./genshindata/characters.json", JSON.stringify(characters));

  res.send("this is an update");
});

////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/weapons', async (req, res) => {
 
  const weapons = await Weapons.find({}) // 1 model / null

  res.status(200).json(weapons);
});

app.post("/weapons", async (req, res) => {
  const {
   weaponUrl,
   name,
   type,
   rarity,
   substat,
   location,
   ascensionMaterial,
  } = req.body;

  const weapons = new Character({
    name: name,
    weaponUrl: weaponUrl,
    type: type,
    rarity: rarity,
    substat: substat,
    location: location,
    ascensionMaterial: ascensionMaterial,
  });

  await weapons.save();

  res.status(201).json({
    message: "Successfully created Characters",
    data: weapons,
  });

})

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
