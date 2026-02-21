import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!CONVEX_URL) {
  console.warn(
    "[Convex] NEXT_PUBLIC_CONVEX_URL is not set. " +
    "Run `npx convex dev` in apps/web to configure your Convex project, " +
    "then add the URL to .env"
  );
}

const convex = new ConvexHttpClient(CONVEX_URL || "https://placeholder.convex.cloud");

export { convex, api };
