import express from "express";
import { createServer as createViteServer } from "vite";
import mongoose from "mongoose";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mongoose Models
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  bcBalance: { type: Number, default: 1500 },
  arsenal: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  date: String,
  duration: Number,
  status: String,
  exercises: Array
});
const Workout = mongoose.model('Workout', workoutSchema);

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  app.use(express.json());

  // MongoDB Connection
  const MONGODB_URI = process.env.MONGODB_URI;
  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('✅ Connected to MongoDB Atlas');
    } catch (err) {
      console.error('❌ MongoDB Connection Error:', err);
    }
  } else {
    console.warn('⚠️ MONGODB_URI missing from environment. API calls to DB will fail. Please append MONGODB_URI in settings.');
  }

  // --- API ROUTES ---
  
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Auth: Login / Register
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ error: "Email required" });
      
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Operator not found. Please register." });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });

  app.post('/api/auth/register', async (req, res) => {
    try {
      const { email, name } = req.body;
      if (!email) return res.status(400).json({ error: "Email required" });
      
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: "Operator already synchronized." });
      }
      
      user = await User.create({ email, name: name || "Operator", bcBalance: 1500, arsenal: [] });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });

  // User: Get Data
  app.get('/api/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });

  // Workouts: Save and trigger BC Economy algorithm
  app.post('/api/workouts', async (req, res) => {
    try {
      const { userId, name, duration, date, status, exercises } = req.body;
      
      // Save Deployment Log
      const workout = await Workout.create({ userId, name, duration, date, status, exercises });
      
      // Economy Logic: Reward BC based on duration (10 BC per minute)
      const reward = duration * 10;
      const updatedUser = await User.findByIdAndUpdate(
         userId, 
         { $inc: { bcBalance: reward } },
         { new: true }
      );
      
      res.json({ workout, updatedUser, reward });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });

  // Workouts: Fetch User Logs
  app.get('/api/workouts', async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) return res.status(400).json({ error: "No userId provided" });
      const workouts = await Workout.find({ userId: new mongoose.Types.ObjectId(userId) }).sort({ date: -1 });
      res.json(workouts);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
