import { execSync } from "node:child_process";

const targets = process.argv[2] ?? "";
const has = (t) => ("," + targets + ",").includes("," + t + ",");

const run = (cmd) => execSync(cmd, { stdio: "inherit" });

run("yarn nx reset");

if (has("cdk")) run("yarn nx build cdk --skip-nx-cache");
if (has("theme")) run("yarn nx build theme --skip-nx-cache");
if (has("icons")) run("yarn nx build icons --skip-nx-cache");
if (has("ui")) run("yarn nx build ui --skip-nx-cache");