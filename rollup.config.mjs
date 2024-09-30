import del from "rollup-plugin-delete";

import commonjs from "@rollup/plugin-commonjs";
import babel from '@rollup/plugin-babel';
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";

export default {
  input: "index.js",
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
    },
  ],
  plugins: [
    del({ targets: "dist/*" }),
    commonjs(),
    babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] }),
    json(),
    terser(),
  ],
};
