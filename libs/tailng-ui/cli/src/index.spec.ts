import { getRegistryItem, listRegistryItemNames } from '@tailng-ui/registry';
import { access, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import * as path from 'node:path';
import { afterEach, expect, it } from 'vitest';
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
