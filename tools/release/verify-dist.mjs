import fs from "node:fs";

const targets = process.argv[2] ?? "";
const has = (t) => ("," + targets + ",").includes("," + t + ",");

const required = [
  ["cdk", "dist/libs/cdk"],
  ["theme", "dist/libs/theme"],
  ["icons", "dist/libs/icons"],
  ["ui", "dist/libs/ui"],
];

for (const [k, dir] of required) {
  if (!has(k)) continue;
  if (!fs.existsSync(dir)) {
    console.error(`ERROR: ${dir} does not exist`);
    process.exit(1);
  }
}
console.log("OK: dist directories exist");