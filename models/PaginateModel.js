// import mongoose from 'mongoose';
// import paginate from 'mongoose-paginate-v2';

// // declare your schema
// export const institutionSchema = new mongoose.Schema({ name: String });

// // paginate with this plugin
// institutionSchema.plugin(paginate);

// // declare a mongoose document based on a Typescript interface representing your schema
// interface InstitutionDocument extends mongoose.Document, InstitutionData {}

// // create the paginated model
// const model = mongoose.model<
//   InstitutionDocument,
//   mongoose.PaginateModel<InstitutionDocument>
// ></InstitutionDocument>('Institutions', institutionSchema, 'institutions');