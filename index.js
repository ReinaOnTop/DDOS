
const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.static("public"));

app.post("/launch", (req, res) => {
  const { target, duration, method } = req.body;
  if (!target || !duration || !method) {
    return res.status(400).json({ error: "Missing target, duration or method" });
  }

  const methodPath = path.join(__dirname, "methods", method.toLowerCase() + ".js");
  try {
    require(methodPath)(target, parseInt(duration));
    res.json({ message: `✅ ${method.toUpperCase()} attack launched\n${duration}s duration` });
  } catch (err) {
    res.status(500).json({ error: `❌ Method '${method}' failed` });
  }
});

app.get("/", (req, res) => {
  res.send("✅ Launcher server is alive");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
