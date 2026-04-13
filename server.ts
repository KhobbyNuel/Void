import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Anonymity Proxy: Create Post
  // This endpoint takes the post content and space_id, 
  // and uses the session token to find the member_id server-side.
  // It then writes to Firestore.
  // NOTE: In this environment, we use the client-side SDK for Firestore usually,
  // but to strictly enforce anonymity, we can do it here.
  // However, for simplicity and to follow the "Real-Time" requirement, 
  // we'll mostly use Firestore on the client but hide the member_id field.
  // The blueprint says: "The system knows who posted internally but never exposes that to anyone".
  // To achieve this with Firestore:
  // 1. Client writes to a 'pending_posts' collection.
  // 2. A server-side function (or this Express server) moves it to 'posts' and strips the UID.
  // Since I don't have Cloud Functions, I'll use this Express server as a proxy.

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
