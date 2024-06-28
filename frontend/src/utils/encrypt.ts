import { createHash } from "node:crypto";
export const saltAndHash = (str: string): string => {
  const salt = process.env.AUTH_SECRET;
  const hash = createHash("sha256");
  hash.update(str + salt);
  return hash.digest("hex");
};
