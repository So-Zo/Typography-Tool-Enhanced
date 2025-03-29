import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static files from the public directory
  const publicPath = path.resolve(__dirname, "..", "public");
  app.use(express.static(publicPath));
  
  // Serve the Font Pair application at the root route
  app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });

  // Fallback route for any other requests
  app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });

  const httpServer = createServer(app);

  return httpServer;
}
