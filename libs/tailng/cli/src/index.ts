#!/usr/bin/env node
import type { RegistryFile, RegistryItem } from '@tailng-ui/registry';
import { access, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import * as path from 'node:path';

type AddCommand = Readonly<{
  componentNames: readonly string[];
  cwd: string;
  dryRun: boolean;
  force: boolean;
}>;

type ParsedArgs = Readonly<{
  options: Readonly<Record<string, string | true>>;
  positionals: readonly string[];
}>;

type ParsedCommand =
  | Readonly<{ kind: 'add'; value: AddCommand }>
  | Readonly<{ kind: 'help'; message: string | null }>
  | Readonly<{ kind: 'list'; json: boolean }>;

type WriteTarget = Readonly<{
  absolutePath: string;
  content: string;
  relativePath: string;
}>;

type RegistryModule = Readonly<{
  getRegistryItem: (name: string) => RegistryItem | undefined;
  listRegistryItemNames: () => readonly string[];
}>;

type CliDependencies = Readonly<{
  registry?: RegistryModule;
}>;

const usageText = [
  'tailng - TailNG CLI',
  '',
  'Shadcn-style source copy for TailNG components.',
  '',
  'Usage:',
  '  tailng --help | -h',
  '  tailng list [--json]',
  '  tailng add <component-name...> [--cwd <path>] [--dry-run|-n] [--force|-f]',
  '',
  'Examples:',
  '  tailng list',
  '  tailng add button',
  '  tailng add button --cwd apps/tailng-ui/playground-vanilla --dry-run',
].join('\n');

const shortOptionAliases: ReadonlyMap<string, string> = new Map([
  ['-f', 'force'],
  ['-h', 'help'],
  ['-n', 'dry-run'],
]);

function isOptionExpectingValue(name: string): boolean {
  return name === 'cwd';
}

const knownOptions: ReadonlySet<string> = new Set(['cwd', 'dry-run', 'force', 'help', 'json']);

function findUnknownOption(options: Readonly<Record<string, string | true>>): string | undefined {
  return Object.keys(options).find((name) => !knownOptions.has(name));
}

function parseArgs(argv: readonly string[]): ParsedArgs {
  const options: Record<string, string | true> = {};
  const positionals: string[] = [];
  let pendingOption: string | null = null;

  for (const token of argv) {
    if (pendingOption) {
      options[pendingOption] = token;
      pendingOption = null;
      continue;
    }

    const alias = shortOptionAliases.get(token);
    if (alias !== undefined) {
      options[alias] = true;
      continue;
    }

    if (!token.startsWith('--')) {
      positionals.push(token);
      continue;
    }

    const [name, inlineValue] = parseOptionToken(token);
    if (inlineValue !== null) {
      options[name] = inlineValue;
      continue;
    }

    if (isOptionExpectingValue(name)) {
      pendingOption = name;
      continue;
    }

    options[name] = true;
  }

  if (pendingOption) {
    options[pendingOption] = true;
  }

  return {
    options,
    positionals,
  };
}

function parseCommand(argv: readonly string[]): ParsedCommand {
  const parsed = parseArgs(argv);
  if (readBooleanOption(parsed.options, 'help')) {
    return { kind: 'help', message: null };
  }

  const unknownOption = findUnknownOption(parsed.options);
  if (unknownOption !== undefined) {
    return { kind: 'help', message: `Unknown option "--${unknownOption}".` };
  }

  const [command, ...componentNames] = parsed.positionals;
  if (command === undefined || command === 'help') {
    return { kind: 'help', message: null };
  }

  if (command === 'list') {
    return { kind: 'list', json: readBooleanOption(parsed.options, 'json') };
  }

  if (command !== 'add') {
    return { kind: 'help', message: `Unknown command "${command}".` };
  }

  return parseAddCommand(parsed, componentNames);
}

function parseAddCommand(
  parsed: ParsedArgs,
  componentNames: readonly string[],
): ParsedCommand {
  if (componentNames.length === 0) {
    return { kind: 'help', message: 'Missing component name for "add".' };
  }

  if (parsed.options['cwd'] === true) {
    return { kind: 'help', message: 'Missing value for "--cwd".' };
  }

  return {
    kind: 'add',
    value: {
      componentNames,
      cwd: readStringOption(parsed.options, 'cwd') ?? process.cwd(),
      dryRun: readBooleanOption(parsed.options, 'dry-run'),
      force: readBooleanOption(parsed.options, 'force'),
    },
  };
}

function parseOptionToken(token: string): readonly [string, string | null] {
  const withoutPrefix = token.slice(2);
  const equalsIndex = withoutPrefix.indexOf('=');
  if (equalsIndex < 0) {
    return [withoutPrefix, null] as const;
  }

  const name = withoutPrefix.slice(0, equalsIndex);
  const value = withoutPrefix.slice(equalsIndex + 1);
  return [name, value] as const;
}

function readBooleanOption(
  options: Readonly<Record<string, string | true>>,
  key: string,
): boolean {
  const value = options[key];
  if (value === undefined) {
    return false;
  }

  if (value === true) {
    return true;
  }

  const normalized = value.toLowerCase();
  return normalized === '1' || normalized === 'true' || normalized === 'yes';
}

function readStringOption(
  options: Readonly<Record<string, string | true>>,
  key: string,
): string | undefined {
  const value = options[key];
  if (value === undefined || value === true) {
    return undefined;
  }

  return value;
}

function writeInfo(message: string): void {
  process.stdout.write(`${message}\n`);
}

function writeError(message: string): void {
  process.stderr.write(`${message}\n`);
}

function writeHelp(message: string | null): void {
  if (message) {
    writeError(message);
    writeError('');
  }

  writeInfo(usageText);
}

function formatComponentNames(registry: RegistryModule): string {
  return registry.listRegistryItemNames().join(', ');
}

function formatDependencyInstallHint(item: RegistryItem): string | null {
  if (item.dependencies.length === 0) {
    return null;
  }

  const dependencies = item.dependencies.join(' ');
  return `Install dependencies: pnpm add ${dependencies}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isRegistryModule(value: unknown): value is RegistryModule {
  if (!isRecord(value)) {
    return false;
  }

  const getRegistryItem = value['getRegistryItem'];
  const listRegistryItemNames = value['listRegistryItemNames'];
  return typeof getRegistryItem === 'function' && typeof listRegistryItemNames === 'function';
}

async function loadRegistryFromSpecifier(specifier: string): Promise<RegistryModule | null> {
  try {
    const loadedModule = (await import(specifier)) as unknown;
    return isRegistryModule(loadedModule) ? loadedModule : null;
  } catch {
    return null;
  }
}

async function loadRegistryModule(): Promise<RegistryModule> {
  const packageRegistry = await loadRegistryFromSpecifier('@tailng-ui/registry');
  if (packageRegistry) {
    return packageRegistry;
  }

  const localRegistryPath = path.resolve(__dirname, '../../../tailng-ui/registry/src/index.js');
  const localRegistry = await loadRegistryFromSpecifier(localRegistryPath);
  if (localRegistry) {
    return localRegistry;
  }

  throw new Error('Unable to load registry module.');
}

function isPathWithinRoot(rootPath: string, candidatePath: string): boolean {
  const resolvedRoot = path.resolve(rootPath);
  const resolvedCandidate = path.resolve(candidatePath);
  if (resolvedRoot === resolvedCandidate) {
    return true;
  }

  const rootPrefix = `${resolvedRoot}${path.sep}`;
  return resolvedCandidate.startsWith(rootPrefix);
}

function toWriteTarget(rootPath: string, file: RegistryFile): WriteTarget | null {
  const absolutePath = path.resolve(rootPath, file.path);
  if (!isPathWithinRoot(rootPath, absolutePath)) {
    return null;
  }

  return {
    absolutePath,
    content: file.content,
    relativePath: file.path,
  };
}

async function pathExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function isDirectory(directoryPath: string): Promise<boolean> {
  try {
    const stats = await stat(directoryPath);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

async function detectExistingTargets(
  targets: readonly WriteTarget[],
): Promise<readonly WriteTarget[]> {
  const existingTargets: WriteTarget[] = [];

  for (const target of targets) {
    if (await pathExists(target.absolutePath)) {
      existingTargets.push(target);
    }
  }

  return existingTargets;
}

function printDryRunSummary(existingCount: number, force: boolean): void {
  if (existingCount === 0) {
    return;
  }

  if (force) {
    writeInfo('Dry run includes overwriting existing files because --force was provided.');
    return;
  }

  writeInfo('Existing files are skipped in dry-run. Use --force to preview overwrites.');
}

function printDryRunTarget(target: WriteTarget, exists: boolean, force: boolean): void {
  if (exists && !force) {
    writeInfo(`DRY-RUN SKIP ${target.relativePath} (already exists)`);
    return;
  }

  if (exists) {
    writeInfo(`DRY-RUN OVERWRITE ${target.relativePath}`);
    return;
  }

  writeInfo(`DRY-RUN CREATE ${target.relativePath}`);
}

function toExistingPathSet(targets: readonly WriteTarget[]): ReadonlySet<string> {
  return new Set(targets.map((target) => target.absolutePath));
}

function printDependencyHint(item: RegistryItem): void {
  const dependencyHint = formatDependencyInstallHint(item);
  if (dependencyHint) {
    writeInfo(dependencyHint);
  }
}

function formatImportHint(item: RegistryItem): string | null {
  if (item.name !== 'button') {
    return null;
  }

  return "Import with: import { TngButton } from './tailng-ui/button';";
}

function printImportHint(item: RegistryItem): void {
  const importHint = formatImportHint(item);
  if (importHint) {
    writeInfo(importHint);
  }
}

function printExistingTargetsError(existingTargets: readonly WriteTarget[]): void {
  writeError('The following files already exist:');
  for (const target of existingTargets) {
    writeError(`- ${target.relativePath}`);
  }

  writeError('Re-run with --force to overwrite.');
}

async function resolveTargetRoot(cwd: string): Promise<string | null> {
  const targetRoot = path.resolve(cwd);
  if (!(await isDirectory(targetRoot))) {
    writeError(`Target directory does not exist: ${targetRoot}`);
    return null;
  }

  return targetRoot;
}

function resolveWriteTargets(
  item: RegistryItem,
  targetRoot: string,
): readonly WriteTarget[] | null {
  const targets = item.files
    .map((file) => toWriteTarget(targetRoot, file))
    .filter((target): target is WriteTarget => target !== null);

  if (targets.length !== item.files.length) {
    writeError('One or more registry file paths resolve outside the target directory.');
    return null;
  }

  return targets;
}

function runDryRunPreview(
  targets: readonly WriteTarget[],
  existingTargets: readonly WriteTarget[],
  force: boolean,
): void {
  const existingPaths = toExistingPathSet(existingTargets);
  for (const target of targets) {
    printDryRunTarget(target, existingPaths.has(target.absolutePath), force);
  }

  printDryRunSummary(existingTargets.length, force);
}

async function writeTargets(targets: readonly WriteTarget[]): Promise<void> {
  for (const target of targets) {
    await mkdir(path.dirname(target.absolutePath), { recursive: true });
    await writeFile(target.absolutePath, target.content, 'utf8');
    writeInfo(`CREATE ${target.relativePath}`);
  }
}

function resolveItems(
  names: readonly string[],
  registry: RegistryModule,
): readonly RegistryItem[] | null {
  const items: RegistryItem[] = [];

  for (const name of names) {
    const item = registry.getRegistryItem(name);
    if (!item) {
      writeError(`Unknown component "${name}".`);
      writeError(`Available components: ${formatComponentNames(registry)}`);
      return null;
    }

    if (!items.includes(item)) {
      items.push(item);
    }
  }

  return items;
}

function resolveAllWriteTargets(
  items: readonly RegistryItem[],
  targetRoot: string,
): readonly WriteTarget[] | null {
  const targets: WriteTarget[] = [];

  for (const item of items) {
    const itemTargets = resolveWriteTargets(item, targetRoot);
    if (!itemTargets) {
      return null;
    }

    targets.push(...itemTargets);
  }

  return targets;
}

function printItemHints(items: readonly RegistryItem[]): void {
  for (const item of items) {
    printDependencyHint(item);
    printImportHint(item);
  }
}

async function hasSameContent(target: WriteTarget): Promise<boolean> {
  try {
    return (await readFile(target.absolutePath, 'utf8')) === target.content;
  } catch {
    return false;
  }
}

async function splitUnchangedTargets(
  targets: readonly WriteTarget[],
): Promise<Readonly<{ changed: readonly WriteTarget[]; unchanged: readonly WriteTarget[] }>> {
  const changed: WriteTarget[] = [];
  const unchanged: WriteTarget[] = [];

  for (const target of targets) {
    if (await hasSameContent(target)) {
      unchanged.push(target);
    } else {
      changed.push(target);
    }
  }

  return { changed, unchanged };
}

function printUnchangedTargets(targets: readonly WriteTarget[]): void {
  for (const target of targets) {
    writeInfo(`UNCHANGED ${target.relativePath}`);
  }
}

async function runAddCommand(
  command: AddCommand,
  registry: RegistryModule,
): Promise<number> {
  const items = resolveItems(command.componentNames, registry);
  if (!items) {
    return 1;
  }

  const targetRoot = await resolveTargetRoot(command.cwd);
  if (!targetRoot) {
    return 1;
  }

  const targets = resolveAllWriteTargets(items, targetRoot);
  if (!targets) {
    return 1;
  }

  const { changed, unchanged } = await splitUnchangedTargets(targets);
  printUnchangedTargets(unchanged);
  const existingTargets = await detectExistingTargets(changed);

  if (command.dryRun) {
    runDryRunPreview(changed, existingTargets, command.force);
    printItemHints(items);
    return 0;
  }

  if (!command.force && existingTargets.length > 0) {
    printExistingTargetsError(existingTargets);
    return 1;
  }

  await writeTargets(changed);
  printItemHints(items);
  return 0;
}

function runListCommand(registry: RegistryModule, json: boolean): number {
  if (json) {
    writeInfo(JSON.stringify(registry.listRegistryItemNames()));
    return 0;
  }

  writeInfo('Available components:');
  for (const name of registry.listRegistryItemNames()) {
    writeInfo(`- ${name}`);
  }

  return 0;
}

export async function runCli(
  argv: readonly string[],
  dependencies?: CliDependencies,
): Promise<number> {
  const parsedCommand = parseCommand(argv);
  if (parsedCommand.kind === 'help') {
    writeHelp(parsedCommand.message);
    return parsedCommand.message ? 1 : 0;
  }

  const registry = dependencies?.registry ?? (await loadRegistryModule());

  if (parsedCommand.kind === 'list') {
    return runListCommand(registry, parsedCommand.json);
  }

  return runAddCommand(parsedCommand.value, registry);
}

function normalizeUnknownError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

function isDirectExecution(): boolean {
  return require.main === module;
}

if (isDirectExecution()) {
  runCli(process.argv.slice(2))
    .then((exitCode) => {
      process.exitCode = exitCode;
    })
    .catch((error: unknown) => {
      writeError(`Unexpected error: ${normalizeUnknownError(error)}`);
      process.exitCode = 1;
    });
}
