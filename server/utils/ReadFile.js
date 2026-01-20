import fs from "fs";

export function readJSON(path) {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
}

export function writeJSON(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2), "utf-8");
}
