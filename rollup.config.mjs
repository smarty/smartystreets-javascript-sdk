import del from "rollup-plugin-delete";

import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";

export default {
  input: "index.mjs",
  external: ["axios", "axios-retry"],
  output: [
    {
      dir: "dist/cjs",
      format: "cjs",
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    {
      dir: "dist/esm",
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: "src",
      exports: "named",
    },
  ],
  plugins: [
    del({ targets: "dist/*" }),
    commonjs(),
    json(),
    terser(),
  ],
};
