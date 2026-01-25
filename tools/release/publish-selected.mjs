import { execSync } from "node:child_process";

const targets = process.argv[2] ?? "";
const npmTag = process.argv[3] ?? "latest";
const has = (t) => ("," + targets + ",").includes("," + t + ",");

const run = (cmd, cwd) =>
  execSync(cmd, { stdio: "inherit", cwd, env: { ...process.env } });

const publish = (dir) => run(`npm publish --access public --tag ${npmTag}`, dir);

// Publish in dependency order
if (has("cdk")) publish("dist/libs/cdk");
if (has("theme")) publish("dist/libs/theme");
if (has("icons")) publish("dist/libs/icons");
if (has("ui")) publish("dist/libs/ui");