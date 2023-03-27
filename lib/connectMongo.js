import mongoose from "mongoose";

const uri = process.env.MONGODB

export const connectMongo = async () => mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})