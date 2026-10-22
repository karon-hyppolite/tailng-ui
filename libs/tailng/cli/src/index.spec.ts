import { getRegistryItem, listRegistryItemNames } from '@tailng-ui/registry';
import { access, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import * as path from 'node:path';
import { afterEach, expect, it, vi } from 'vitest';
import { runCli } from './index';

type CliRegistryModule = Readonly<{
  getRegistryItem: typeof getRegistryItem;
  listRegistryItemNames: typeof listRegistryItemNames;
}>;

const registryModule: CliRegistryModule = {
  getRegistryItem,
  listRegistryItemNames,
};

const createdRoots: string[] = [];

async function createTargetRoot(): Promise<string> {
  const targetRoot = await mkdtemp(path.join(tmpdir(), 'tailng-cli-'));
  createdRoots.push(targetRoot);
  return targetRoot;
}

async function pathExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

afterEach(async (): Promise<void> => {
  for (const root of createdRoots) {
    await rm(root, { recursive: true, force: true });
  }

  createdRoots.length = 0;
});

it('tailng cli integration: dry-run does not write files to disk', async (): Promise<void> => {
  const targetRoot = await createTargetRoot();

  const exitCode = await runCli(['add', 'button', '--cwd', targetRoot, '--dry-run'], {
    registry: registryModule,
  });

  expect(exitCode).toBe(0);
  expect(await pathExists(path.join(targetRoot, 'src/app/tailng-ui/button/tng-button.ts'))).toBe(
    false,
  );
});

it('tailng cli integration: add writes all button source files', async (): Promise<void> => {
  const targetRoot = await createTargetRoot();

  const exitCode = await runCli(['add', 'button', '--cwd', targetRoot], {
    registry: registryModule,
  });

  expect(exitCode).toBe(0);

  const buttonTsPath = path.join(targetRoot, 'src/app/tailng-ui/button/tng-button.ts');
  const primitivePath = path.join(targetRoot, 'src/app/tailng-ui/button/tng-button-primitive.ts');
  const indexPath = path.join(targetRoot, 'src/app/tailng-ui/button/index.ts');

  expect(await pathExists(buttonTsPath)).toBe(true);
  expect(await pathExists(primitivePath)).toBe(true);
  expect(await pathExists(indexPath)).toBe(true);

  const buttonTsContent = await readFile(buttonTsPath, 'utf8');
  expect(buttonTsContent).toContain("selector: 'tng-button'");

  const indexContent = await readFile(indexPath, 'utf8');
  expect(indexContent).toContain("export * from './tng-button';");
  expect(indexContent).toContain("export * from './tng-button-primitive';");
});

it(
  'tailng cli integration: returns non-zero when files already exist without --force',
  async (): Promise<void> => {
    const targetRoot = await createTargetRoot();

    const firstRunExitCode = await runCli(['add', 'button', '--cwd', targetRoot], {
      registry: registryModule,
    });
    expect(firstRunExitCode).toBe(0);

    await writeFile(
      path.join(targetRoot, 'src/app/tailng-ui/button/index.ts'),
      '// local change\n',
      'utf8',
    );

    const secondRunExitCode = await runCli(['add', 'button', '--cwd', targetRoot], {
      registry: registryModule,
    });
    expect(secondRunExitCode).toBe(1);
  },
);

it('tailng cli integration: overwrites files when --force is provided', async (): Promise<void> => {
  const targetRoot = await createTargetRoot();

  const firstRunExitCode = await runCli(['add', 'button', '--cwd', targetRoot], {
    registry: registryModule,
  });
  expect(firstRunExitCode).toBe(0);

  const buttonTsPath = path.join(targetRoot, 'src/app/tailng-ui/button/tng-button.ts');
  await writeFile(buttonTsPath, '// stale content\n', 'utf8');

  const overwriteExitCode = await runCli(['add', 'button', '--cwd', targetRoot, '--force'], {
    registry: registryModule,
  });
  expect(overwriteExitCode).toBe(0);

  const overwrittenContent = await readFile(buttonTsPath, 'utf8');
  expect(overwrittenContent).toContain('export class TngButton');
  expect(overwrittenContent).not.toContain('// stale content');
});

it('tailng cli: short flags map to long options', async (): Promise<void> => {
  const targetRoot = await createTargetRoot();

  expect(await runCli(['-h'], { registry: registryModule })).toBe(0);
  expect(
    await runCli(['add', 'button', '--cwd', targetRoot, '-n'], { registry: registryModule }),
  ).toBe(0);
  expect(await pathExists(path.join(targetRoot, 'src/app/tailng-ui/button/index.ts'))).toBe(false);
});

it('tailng cli: fails when --cwd has no value', async (): Promise<void> => {
  expect(await runCli(['add', 'button', '--cwd'], { registry: registryModule })).toBe(1);
});

it('tailng cli: add accepts several names and validates all of them first', async (): Promise<void> => {
  const targetRoot = await createTargetRoot();
  const indexPath = path.join(targetRoot, 'src/app/tailng-ui/button/index.ts');

  expect(
    await runCli(['add', 'button', 'not-a-component', '--cwd', targetRoot], {
      registry: registryModule,
    }),
  ).toBe(1);
  expect(await pathExists(indexPath)).toBe(false);

  expect(
    await runCli(['add', 'button', 'button', '--cwd', targetRoot], { registry: registryModule }),
  ).toBe(0);
  expect(await pathExists(indexPath)).toBe(true);
});

it('tailng cli: rejects unknown options', async (): Promise<void> => {
  const targetRoot = await createTargetRoot();

  expect(
    await runCli(['add', 'button', '--cwd', targetRoot, '--forse'], { registry: registryModule }),
  ).toBe(1);
  expect(await pathExists(path.join(targetRoot, 'src/app/tailng-ui/button/index.ts'))).toBe(false);
});

type CapturedRun = Readonly<{
  exitCode: number;
  stderr: string;
  stdout: string;
}>;

async function captureOutput(run: () => Promise<number>): Promise<CapturedRun> {
  const stdout: string[] = [];
  const stderr: string[] = [];
  const stdoutSpy = vi
    .spyOn(process.stdout, 'write')
    .mockImplementation(((chunk: unknown): boolean =>
      stdout.push(String(chunk)) > 0) as typeof process.stdout.write);
  const stderrSpy = vi
    .spyOn(process.stderr, 'write')
    .mockImplementation(((chunk: unknown): boolean =>
      stderr.push(String(chunk)) > 0) as typeof process.stderr.write);

  try {
    const exitCode = await run();
    return { exitCode, stderr: stderr.join(''), stdout: stdout.join('') };
  } finally {
    stdoutSpy.mockRestore();
    stderrSpy.mockRestore();
  }
}

it('tailng cli: list --json prints component names as JSON', async (): Promise<void> => {
  const result = await captureOutput(() => runCli(['list', '--json'], { registry: registryModule }));

  expect(result.exitCode).toBe(0);
  expect(JSON.parse(result.stdout)).toContain('button');
});

it('tailng cli: re-running add with identical files succeeds without --force', async (): Promise<void> => {
  const targetRoot = await createTargetRoot();
  expect(await runCli(['add', 'button', '--cwd', targetRoot], { registry: registryModule })).toBe(0);

  const result = await captureOutput(() =>
    runCli(['add', 'button', '--cwd', targetRoot], { registry: registryModule }),
  );

  expect(result.exitCode).toBe(0);
  expect(result.stdout).toContain('UNCHANGED src/app/tailng-ui/button/index.ts');
});

it('tailng cli: prints an import hint derived from the component name', async (): Promise<void> => {
  const targetRoot = await createTargetRoot();
  const datePicker = {
    dependencies: [],
    description: 'Test item',
    files: [{ content: 'export {};\n', path: 'src/app/tailng-ui/date-picker/index.ts' }],
    name: 'date-picker',
  };
  const fakeRegistry: CliRegistryModule = {
    getRegistryItem: (name: string) => (name === 'date-picker' ? datePicker : undefined),
    listRegistryItemNames: () => ['date-picker'],
  };

  const result = await captureOutput(() =>
    runCli(['add', 'date-picker', '--cwd', targetRoot], { registry: fakeRegistry }),
  );

  expect(result.exitCode).toBe(0);
  expect(result.stdout).toContain("import { TngDatePicker } from './tailng-ui/date-picker'");
});

it('tailng cli: rejects invalid boolean option values', async (): Promise<void> => {
  const targetRoot = await createTargetRoot();

  expect(
    await runCli(['add', 'button', '--cwd', targetRoot, '--dry-run=maybe'], {
      registry: registryModule,
    }),
  ).toBe(1);
  expect(
    await runCli(['add', 'button', '--cwd', targetRoot, '--dry-run=on'], {
      registry: registryModule,
    }),
  ).toBe(0);
  expect(await pathExists(path.join(targetRoot, 'src/app/tailng-ui/button/index.ts'))).toBe(false);
});
