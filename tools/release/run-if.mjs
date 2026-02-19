import { execSync } from "node:child_process";

const targets = process.argv[2] ?? "";
const name = process.argv[3] ?? "";
const cmd = process.argv.slice(4).join(" ");

const has = (t) => ("," + targets + ",").includes("," + t + ",");

if (!has(name)) {
  console.log(`[skip] ${name}`);
  process.exit(0);
}

console.log(`[run] ${cmd}`);
execSync(cmd, { stdio: "inherit" });