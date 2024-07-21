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



// import mongoose from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

// const videoSchema = new mongoose.Schema({
//   // Define your schema fields here
//   title: String,
//   description: String,
//   // Add more fields as needed
// });

// // Apply the plugin to your schema
// videoSchema.plugin(mongoosePaginate);

// // Create a model based on the schema
// const Video = mongoose.model('Video', videoSchema);

// export default Video;
// // import { Schema, SchemaTypes, model } from 'mongoose';

// const mongoose = require('mongoose');
// const mongoosePaginate = require('mongoose-paginate-v2');

// const videoSchema = new mongoose.Schema({
//   name: String,
//   videoUrl: String,
  
 
//   // 💡 Added an optional brand
//   // brandId: {
//   //   type: SchemaTypes.ObjectId,
//   //   ref: Brand,
//   // },
// });
// videoSchema.plugin(mongoosePaginate);

// // 2️⃣ Assigning schema to a model

// const Video = mongoose.model('Video', videoSchema);

// Video.paginate().then({}); // Usage

// // 3️⃣ Export default
// export default Video;