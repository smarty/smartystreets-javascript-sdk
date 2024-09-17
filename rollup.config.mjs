import del from "rollup-plugin-delete";

import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";

export default {
  input: "index.js",
  external: ["axios", "axios-retry"],
  output: [
    {
      dir: "dist",
      format: "cjs",
      preserveModules: true,
      preserveModulesRoot: "src",
      esModule: true,
      exports: "named",
    },
    {
      dir: "dist",
      format: "es",
      preserveModules: true,
      preserveModulesRoot: "src",
      exports: "named",
      entryFileNames: "[name].[format].js",
    },
  ],
  plugins: [
    del({ targets: "dist/*" }),
    commonjs(),
    json(),
    terser(),
  ],
};
