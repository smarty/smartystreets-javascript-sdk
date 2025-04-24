import del from "rollup-plugin-delete";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default [{
  input: "index.mjs",
  external: ["axios", "axios-retry"],
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
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    del({ targets: "dist/*" }),
    nodeResolve(),
    commonjs({
      esmExternals: true,
    }),
    json(),
    terser(),
  ],
},
  {
    input: "index.mjs",
    output: {
      file: "dist/index.d.ts",
      format: "es",
    },
    plugins: [dts()],
  }];