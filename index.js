
import express from 'express';
import mongoose from 'mongoose';
import dotrnv from 'dotenv';
dotrnv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("DB Connected..");
}).catch((err) => {
    console.log(err);
});
const app = express();

app.listen(3000, () => {
    console.log("Server is running on port 3000..");
});
