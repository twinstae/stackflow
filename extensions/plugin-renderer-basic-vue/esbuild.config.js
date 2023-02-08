const { build } = require("esbuild");
const { vanillaExtractPlugin } = require("@vanilla-extract/esbuild-plugin");
const vuePlugin = require("esbuild-plugin-vue3");
const pkg = require("./package.json");

const config = ({
  entryPoints = ["./src/index.ts"],
  outdir = "dist",
  vanillaExtractExternal = [],
}) => ({
  entryPoints,
  outdir,
  target: "es2015",
  bundle: true,
  minify: false,
  external: [],
  plugins: [
    vuePlugin(),
    vanillaExtractPlugin({
      esbuildOptions: {
        external: ["@stackflow", ...vanillaExtractExternal],
      },
    }),
  ],
  sourcemap: true,
});

const watch = process.argv.includes("--watch");
const external = Object.keys({
  ...pkg.dependencies,
  ...pkg.peerDependencies,
});

Promise.all([
  build({
    ...config({}),
    format: "cjs",
    external,
    watch,
  }),
  build({
    ...config({}),
    format: "esm",
    outExtension: {
      ".js": ".mjs",
    },
    external,
    watch,
  }),
]).catch(() => process.exit(1));
