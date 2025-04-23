import express from "express";

import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

const Data = mongoose.model("Data", {
  data: String,
  code: Number,
});

app.post("/postdata", async (req, res) => {
  try {
    const body = req.body.data;
    const code = Math.floor(10000 + Math.random() * 90000);
    const data = new Data({ data: body, code: code });
    await data.save();
    res.status(201).send(code);

    setTimeout(async () => {
      await Data.deleteOne({ _id: id });
      console.log("Data deleted after 10 seconds");
    }, 60000);
  } catch {
    console.log(err);
    res.status(500).send("Error saving data");
  }
});

app.get("/getData/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const data = await Data.find({ code: code });
    const toreturn = data[0].data;
    if (!data) {
      return res.status(404).send("Data not found");
    } else {
      res.status(200).send(toreturn);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching data");
  }
});
