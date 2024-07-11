import { Schema, SchemaTypes, model } from 'mongoose';

const videoSchema = Schema({
  name: String,
  videoUrl: String,
  
 
  // 💡 Added an optional brand
  // brandId: {
  //   type: SchemaTypes.ObjectId,
  //   ref: Brand,
  // },
});

// 2️⃣ Assigning schema to a model

const Video = model('Video', videoSchema);

// 3️⃣ Export default
export default Video;