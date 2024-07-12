import { Schema, SchemaTypes, model } from 'mongoose';



const artifactSchema = Schema({
  artifactUrl1: String,
  artifactUrl2: String,
  artifactUrl3: String,
  artifactUrl4: String,
  artifactUrl5: String,
  fourPieceBonus:String,
   twoPieceBonus: String,
   maxRarity: Number

  // 💡 Added an optional brand
  // brandId: {
  //   type: SchemaTypes.ObjectId,
  //   ref: Brand,
  // },
});

// 2️⃣ Assigning schema to a model

const Artifact = model('Artifact', artifactSchema);

// 3️⃣ Export default
export default Artifact;
