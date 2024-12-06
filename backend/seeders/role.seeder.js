import Role from "../models/role.model.js";
import { mongoose } from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const roles = [
    new Role({
        id: 1,
        name: "agency",
    }),
    new Role({
        id: 2,
        name: "model",
    }),
    new Role({
        id: 3,
        name: "manager",
    })
]

mongoose
    .connect(process.env.MONGO_URI)
    .catch(err => {
        console.log(err.stack);
        process.exit(1);
    })
    .then(() => {
        console.log("connected to db in development environment");
    });

Role.collection
    .drop()
    .then(() => console.log("Drop"))
    .catch((err) => console.error(err))

roles.map(async (r, index) => {
    await r.save();
    if (index === roles.length - 1) {
        console.log("DONE!");
        mongoose.disconnect();
    }
});
