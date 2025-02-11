import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";

dotenv.config(); // without this, process.env.MONGO_URI will be undefined

const app = express();
const PORT = process.env.PORT || 5000;

// the below mainly is needed because we are using type as module in package.json
const __dirname = path.resolve(); // gives the current directory name. This is needed because ES6 modules don't have __dirname

app.use(express.json()); // allows us to accept JSON data in the body

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  // below is needed to serve static assets in production
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // below * is a wildcard. It means that for any route that is not the above api/products, 
  // we will load the index.html file
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
