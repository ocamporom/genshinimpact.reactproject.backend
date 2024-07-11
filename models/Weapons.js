// 💡 You can now do destructuring
import { Schema, SchemaTypes, model } from 'mongoose';

const weaponSchema = Schema({
  weaponUrl: String,
  name: String,
  type: String,
  rarity: String,
  substat: String,
  location: String,
  ascensionMaterial: String
  
 
  // 💡 Added an optional brand
  // brandId: {
  //   type: SchemaTypes.ObjectId,
  //   ref: Brand,
  // },
});

// 2️⃣ Assigning schema to a model

const Weapon = model('Weapon', weaponSchema);

// 3️⃣ Export default
export default Weapon;
