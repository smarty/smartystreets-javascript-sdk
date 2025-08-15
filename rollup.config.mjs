import del from "rollup-plugin-delete";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
	input: "index.ts",
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
			esModule: false,
			entryFileNames: "cjs/[name].cjs",
		},
	],
	plugins: [
		del({ targets: "dist/*" }),
		nodeResolve({
			extensions: [".js", ".ts", ".mjs"],
		}),
		commonjs({
			esmExternals: true,
			requireReturnsDefault: true,
		}),
		json(),
		typescript({
			declaration: true,
			declarationMap: true,
			outDir: "dist/types",
			rootDir: ".",
			tsconfig: "./tsconfig.json",
		}),
		terser(),
	],
};
