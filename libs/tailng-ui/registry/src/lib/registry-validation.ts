import type { RegistryItem } from './registry.types';

const itemNamePattern = /^[a-z][a-z0-9-]*$/;

function validateFilePath(filePath: string): string | null {
  const normalized = filePath.replace(/\\/g, '/');
  if (normalized.startsWith('/') || /^[a-zA-Z]:/.test(normalized)) {
    return `File path must be relative: ${filePath}`;
  }

  if (normalized.split('/').includes('..')) {
    return `File path must not contain "..": ${filePath}`;
  }

  return null;
}

export function validateRegistryItem(item: RegistryItem): string[] {
  const errors: string[] = [];
  if (!itemNamePattern.test(item.name)) {
    errors.push(`Invalid item name: "${item.name}"`);
  }

  const seenPaths = new Set<string>();
  for (const file of item.files) {
    const pathError = validateFilePath(file.path);
    if (pathError) {
      errors.push(pathError);
    }

    if (seenPaths.has(file.path)) {
      errors.push(`Duplicate file path: ${file.path}`);
    }
    seenPaths.add(file.path);
  }

  return errors;
}
