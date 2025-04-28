import { Elysia } from "elysia";
import FolderRoute from "./routers/v1/folder.route";
import FileRoute from "./routers/v1/file.route";
import cors from "@elysiajs/cors";

const app = new Elysia()
  .use(cors({
    origin: [process.env.CORS_ORIGIN || "http://localhost:5173"],
  }))
  .group('/api', (app) => app.use(FolderRoute))
  .group('/api', (app) => app.use(FileRoute))
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
