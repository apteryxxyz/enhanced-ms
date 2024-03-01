import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  //
  skipNodeModulesBundle: true,
  //
  platform: 'node',
  format: ['esm', 'cjs'],
  target: 'es2022',
  //
  clean: true,
  splitting: true,
  bundle: true,
  treeshake: true,
  keepNames: true,
  minifySyntax: true,
  //
  dts: true,
  sourcemap: true,
});
