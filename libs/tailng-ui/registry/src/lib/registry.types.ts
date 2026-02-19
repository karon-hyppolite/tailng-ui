export type RegistryFile = Readonly<{
  content: string;
  path: string;
}>;

export type RegistryItem = Readonly<{
  dependencies: readonly string[];
  description: string;
  files: readonly RegistryFile[];
  name: string;
}>;
