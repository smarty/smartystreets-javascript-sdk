import del from "rollup-plugin-delete";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "index.mjs",
  external: ["axios", "axios-retry"],
  output: [
    {
      dir: "dist",
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: "src",
      exports: "named",
      entryFileNames: "esm/[name].mjs",
    },
    {
      dir: "dist",
      format: "cjs",
      preserveModules: true,
      preserveModulesRoot: "src",
      exports: "named",
      entryFileNames: "cjs/[name].cjs",
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
    typescript({
      declaration: true,
      emitDeclarationOnly: true,
      outDir: "dist/types",
      rootDir: "src"
    }),
  ],
};