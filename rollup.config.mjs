import del from "rollup-plugin-delete";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: "index.mjs",
  output: [
    {
      dir: "dist/cjs",
      format: "cjs",
      preserveModules: true,
      preserveModulesRoot: "src",
      exports: "named",
      entryFileNames: "[name].cjs",
    },
    {
      dir: "dist/esm",
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: "src",
      exports: "named",
      entryFileNames: "[name].mjs",
    },
  ],
  plugins: [
    del({ targets: "dist/*" }),
    nodeResolve(),
    commonjs({
      esmExternals: true,
    }),
    json(),
    terser(),
  ],
};