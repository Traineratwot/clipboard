import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";

export default [
  // browser-friendly UMD build
  {
    input: "src/index.ts",
    output: {
      name: 'WebClipboard',
      file: pkg.browser,
		format: "umd",
	   sourcemap: "map",
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: "src/index.ts",
    output: [
      { file: pkg.main, format: "cjs",sourcemap: "map", },
      { file: pkg.module, format: "es",sourcemap: "map", },
    ],
    plugins: [typescript({ tsconfig: "./tsconfig.json" })],
  },
];