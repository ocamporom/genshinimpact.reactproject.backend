import express from 'express';
import process from 'node:process';
import { readFile, writeFile, stat } from 'node:fs/promises';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import Character from './models/Character.js';
import Weapon from './models/Weapons.js';
import connectDb from './connectDb.js';
import Artifact from './models/Artifacts.js';
import Video from './models/Videos.js';
import 'dotenv/config';

// import mongoose from 'mongoose';
// import paginate from 'mongoose-paginate-v2';

await connectDb();

const app = express();
const PORT = process.env.PORT || 3000;


app.set('port', PORT);

app.use(cors()); // For simplicity
app.use(helmet());
app.use(bodyParser.json()); // To parse JSON body///

// GET Request localhost:3000
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World!',
  });
});

// app.get('/characters', paginatedResults(Character),  async (req, res) => {
//   const characters = await Character.find({}); // 1 model / null
//   res.status(200).json(paginatedResults);
// });

app.get('/characters', async (req, res) => {
  const characters = await Character.find({}); // 1 model / null
  res.status(200).json(characters);
});


// get all characters
app.post('/characters', async (req, res) => {
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
    iconUrl,
  } = req.body;

  const character = new Character({
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
    iconUrl,
  });

  await character.save();

  res.status(201).json({
    message: 'Successfully created Characters',
    data: character,
  });
});

// All characters


//get details na itttuuuu?
app.get('/characters/:id', async (req, res) => {
  const { id } = req.params;

  const character = await Character.findById(id);

  if (!character) {
    res.status(404).json({
      message: 'Character cannot be found',
    });

    return;
  }

  res.status(200).json({
    message: 'Character is found',
    data: character,
  });
});

app.put('/characters/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const characterFields = req.body;

    const character = await Character.findByIdAndUpdate(id, characterFields, {
      new: true,
    }); // 3 ya parameter, tang id, tahng  msmung object tpus itang new(bali magupdate ya tlga into new value)

    if (!character) {
      return res.status(404).json({
        message: 'Character not found',
      });
    }

    res.status(200).json({
      message: 'Character updated',
      data: character,
    });
  } catch (error) {
    console.error('Error updating character:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/characters/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const character = await Character.findByIdAndDelete(id);

    if (!character) {
      return res.status(404).json({
        message: 'Character not found',
      });
    }

    res.status(200).json({
      message: 'Character deleted',
      deletedCharacter: character,
    });
  } catch (error) {
    console.error('Error deleting character:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// get all weapons
// GET: /weapons
// GET: /weapons?type={WEAPON_TYPE}
app.get('/weapons', async (req, res) => {
  const { type } = req.query;
  const find = {};

  if (type) {
    find['type'] = type;
  }

  const weapons = await Weapon.find(find); // 1 model / null

  res.status(200).json(weapons);
});

// fetch the details
app.post('/weapons', async (req, res) => {
  const {
    weaponUrl,
    name,
    type,
    rarity,
    substat,
    location,
    ascensionMaterial,
  } = req.body;

  const weapons = new Weapon({
    weaponUrl,
    name,
    type,
    rarity,
    substat,
    location,
    ascensionMaterial,
  });

  await weapons.save();

  res.status(201).json({
    message: 'Successfully created Weapons',
    data: weapons,
  });
});

app.put('/weapons/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const weaponFields = req.body;

    const weapon = await Weapon.findByIdAndUpdate(id, weaponFields, {
      new: true,
    });

    if (!weapon) {
      return res.status(404).json({
        message: 'Weapon not found',
      });
    }

    res.status(200).json({
      message: 'Weapons updated',
      data: weapon,
    });
  } catch (error) {
    console.error('Error updating weapon:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/weapons/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const weapon = await Weapon.findByIdAndDelete(id);

    if (!weapon) {
      return res.status(404).json({
        message: 'Weapon not found',
      });
    }

    res.status(200).json({
      message: 'Weapons deleted',
      deletedWeapon: weapon,
    });
  } catch (error) {
    console.error('Error deleting weapon:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// get all artifacts!!!
app.get('/artifacts', async (req, res) => {
  const artifacts = await Artifact.find({}); // 1 model / null

  res.status(200).json(artifacts);
});

//get all artifacts details!!!

app.post('/artifacts', async (req, res) => {
  const {
    artifactUrl1,
    artifactUrl2,
    artifactUrl3,
    artifactUrl4,
    artifactUrl5,
    maxRarity,
    twoPieceBonus,
    fourPieceBonus,
  } = req.body;

  const artifact = new Artifact({
    artifactUrl1,
    artifactUrl2,
    artifactUrl3,
    artifactUrl4,
    artifactUrl5,
    maxRarity,
    twoPieceBonus,
    fourPieceBonus,
  });

  await artifact.save();

  res.status(200).json(artifact);
});

app.put('/artifacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const artifactFields = req.body;

    const artifact = await Artifact.findByIdAndUpdate(id, artifactFields, {
      new: true,
    });

    if (!artifact) {
      return res.status(404).json({
        message: 'Artifact not found',
      });
    }

    res.status(200).json({
      message: 'Artifact updated',
      data: artifact,
    });
  } catch (error) {
    console.error('Error updating artifact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/artifacts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const artifact = await Artifact.findByIdAndDelete(id);

    if (!artifact) {
      return res.status(404).json({
        message: 'Artifact not found',
      });
    }

    res.status(200).json({
      message: 'Artifact deleted',
      deletedArtifact: artifact,
    });
  } catch (error) {
    console.error('Error deleting artifact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

///////////////////////////////////////////////////////////

app.get('/videos', async (req, res) => { //papasok mo ung paginatedResults dito in between
  const videos = await Video.find({});
  res.status(200).json(videos); //  bali mailalagay ung res.json(paginatedResult)
});


// app.get('/videos', async (req, res) => { //papasok mo ung paginatedResults dito in between
//   const videos = await Video.find({}); // 1 model / null
// //   // const page = req.query.page
// //   // const limit = req.query.limit

// //   // const startIndex = (page - 1) * limit // need to minus 1 pra index 0
// //   // const endIndex = page * limit

// //   // const resultVideos = videos.slice(startIndex, endIndex)

// //   const options = {
// //     page: 1,
// //     limit: 10,
// //     collation: {
// //       locale: 'en',
// //     },
// //   };

// //   Model.paginate({}, options, function (err, result) {
// //     result.docs
// //     result.totalDocs = 88
// //     result.limit = 10
// //     result.page = 1
// //     result.totalPages = 10
// //     result.hasNextPage = true
// //     result.nextPage = 2
// //     result.hasPrevPage = false
// //     result.prevPage = null
// //     result.pagingCounter = 1
// //   });

// //   // res.status(200).json(resultVideos);
//   res.status(200).json(videos); //  bali mailalagay ung res.json(paginatedResult)
// });

// http://localhost:3000/api/v1/videos?page=1&limit=10 // front end

// app.get('/videos', async (req, res) => {
//   const page = req.query.page || 1
//   const limit = req.query.limit || 10
  

//   const paginatedVideos = await Video.paginate({}, {
//     page,
//     limit
//   })

//   res.status(200).json(paginatedVideos);
// });

app.post('/videos', async (req, res) => {
  const { name, videoUrl } = req.body;

  const video = new Video({
    name,
    videoUrl,
  });

  await video.save();

  res.status(200).json(video);
});

app.put('/videos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const videoFields = req.body;

    const video = await Video.findByIdAndUpdate(id, videoFields, {
      new: true,
    });

    if (!video) {
      return res.status(404).json({
        message: 'Video not found',
      });
    }

    res.status(200).json({
      message: 'Videos updated',
      data: video,
    });
  } catch (error) {
    console.error('Error updating video:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/videos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findByIdAndDelete(id);

    if (!video) {
      return res.status(404).json({
        message: 'Video not found',
      });
    }

    res.status(200).json({
      message: 'Videos deleted',
      deletedVideo: video,
    });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

////////////////////////////////////////////////////////////////////////////////

function paginatedResults(model) {  // middle ware?
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit; // need to minus 1 pra index 0
    const endIndex = page * limit;
    const results = {}

    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1, 
        limit: limit,
      };
    }
    // results.results = model.find().limit(limit)
    // results.results = model.slice(startIndex, endIndex);
    //  results.results = Video.slice(startIndex, endIndex);

   res.paginatedResults = results
  };
}

app.get('/search', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    res.status(400).json({ message: 'Must provide query on search' });
  }

  await Character.find({ name: query });

  // then do some response

  res.status(200).json(Video);
});

//
//
//
//
//

///
//
//

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
