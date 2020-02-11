import { development } from "./development";
import { production } from "./production";

export const environment =
  process.env.NODE_ENV === "production" ? production : development;
