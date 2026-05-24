import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 1. DATABASE CONNECTION (Replace with your local URI or Atlas URI)
const MONGO_URI = "mongodb://localhost:27017/graveyard";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("🪦 Connected to the Underworld Database"))
  .catch((err) => console.error("Database connection failed:", err));

// 2. THE TOMBSTONE SCHEMA & MODEL
const graveSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tagline: { type: String, default: "A brilliant mistake." },
    causeOfDeath: { type: String, required: true },
    learning: { type: String, required: true },
    tombstones: { type: Number, default: 0 },
    exhumedBy: { type: String, default: "" },
  },
  { timestamps: true },
);

const Grave = mongoose.model("Grave", graveSchema);

// 3. API ROUTES

// Route A: Fetch all dead ideas
app.get("/api/graves", async (req, res) => {
  try {
    const graves = await Grave.find().sort({ createdAt: -1 }); // Newest failures first
    res.json(graves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route B: Bury a new idea
app.post("/api/graves", async (req, res) => {
  try {
    const newGrave = new Grave(req.body);
    await newGrave.save();
    res.status(201).json(newGrave);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route C: Pay Respects (Increment 🪦 count)
app.patch("/api/graves/:id/respect", async (req, res) => {
  try {
    const grave = await Grave.findByIdAndUpdate(
      req.params.id,
      { $inc: { tombstones: 1 } },
      { new: true },
    );
    res.json(grave);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route D: Exhume/Resurrect an idea
app.patch("/api/graves/:id/exhume", async (req, res) => {
  try {
    const { hackerName } = req.body;
    const grave = await Grave.findByIdAndUpdate(
      req.params.id,
      { exhumedBy: hackerName },
      { new: true },
    );
    res.json(grave);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 4. START SERVER
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Graveyard server haunting port ${PORT}`),
);
