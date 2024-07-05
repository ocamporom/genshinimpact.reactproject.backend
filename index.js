import express from "express";
import process from "node:process";
import { readFile, writeFile, stat } from "node:fs/promises";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("port", PORT);

app.use(cors()); // For simplicity
app.use(bodyParser.json()); // To parse JSON body

// GET Request localhost:3000
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World!",
  });
});

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
  } = req.body;

  const product = new Product({
    name,
    title,
    vision,
    weapon,
    nation,
    affiliation,
    rarity,
    constellation,
    description,
  });

  // 💡 Use try...catch block to be able to catch any errors during saving
  await product.save();

  // Do not forget to always response a happy face :)
  // 💡 The property status code for creation is 201 Created
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
  res.status(201).json({
    message: "Successfully created Characters",
    data: product,
  });
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
