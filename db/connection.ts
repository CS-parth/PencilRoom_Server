
import mongoose, { ConnectOptions } from "mongoose";

export const stablishConnection = ()=>{
    const mongodUri:string = process.env.MONGODB_URI!; 
    mongoose.connect(mongodUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions)
  .then(() => {
    process.stdout.write('MongoDB connected successfully\n');
  })
  .catch((err:Error) => {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  });
}