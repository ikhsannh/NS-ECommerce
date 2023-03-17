import mongoose from "mongoose";

// const dbConnect = () => {
//     if (mongoose.connection.readyState >= 1) {
//         console.log("All Connected and You're ready to Go :)");
//         return;
//     }

//     mongoose.set("strictQuery", true);
//     mongoose.connect(process.env.MONGODB_URI_1);
// }

// export default dbConnect;


export default async function dbConnect() {
    // if (mongoose.connections[0].readyState) {
    //     // Use current db connection
    //     return;
    // }
    await mongoose.connect(process.env.MONGODB_URI_1, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    }