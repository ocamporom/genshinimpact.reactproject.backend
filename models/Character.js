// 💡 You can now do destructuring
import { Schema, SchemaTypes, model } from 'mongoose';

const characterSchema = Schema({
  name: String,
  title: String,
  vision: String,
  weapon: Number,
  nation: String,
  affiliation: String,
  rarity: Number,
  constellation: String,
  description: String,
  
 
  // 💡 Added an optional brand
  // brandId: {
  //   type: SchemaTypes.ObjectId,
  //   ref: Brand,
  // },
});

// 2️⃣ Assigning schema to a model

const Character = model('Character', characterSchema);

// 3️⃣ Export default
export default Character;
