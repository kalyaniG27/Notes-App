const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Note = require("./models/Note");
const noteRoutes = require("./routes/noteRoutes");


const app = express();
app.use(cors());
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);



app.use(express.json());
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
  res.send("Notes API Running");
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected");

    // REMINDER CHECKER
    setInterval(async () => {
      const now = new Date();

      const notes = await Note.find({
        reminderAt: { $lte: now },
        isReminderSent: false
      });

      for (let note of notes) {
        console.log(`🔔 Reminder: ${note.title}`);
        note.isReminderSent = true;
        await note.save();
      }
    }, 60000);

    app.listen(5000, () => {
      console.log("🚀 Server running on port 5000");
    });
  })
  .catch(err => {
    console.log("❌ MongoDB error:", err);
  });
