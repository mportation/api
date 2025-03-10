import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect("mongodb+srv://mfeel:K4xtYIlb2ooHwB7x@cluster0.3wbhd.mongodb.net/mfeel?retryWrites=true&w=majority");

    console.log(`MongoDb connected: ${connect.connection.host}`);
  } catch (error: any) {
    console.log(`error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
