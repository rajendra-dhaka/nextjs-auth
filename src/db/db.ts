import mongoose from "mongoose";

export async function connectDB() {
  try {
    // const connectionInstance = await mongoose.connect(process.env.MONGO_URI!);
    const connectionInstance = await mongoose.connect(
      process.env.MONGO_URI || ""
    );
    // console.log(
    //   `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    // );
    connectionInstance.connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    connectionInstance.connection.on("error", (err) => {
      console.log("MongoDB error: " + err);
      process.exit(1);
    });
  } catch (err) {
    console.log("Something went wrong in connecting to DB!", err);
    process.exit(1);
  }
}
