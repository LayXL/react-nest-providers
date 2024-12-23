import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  minify: true,
  external: ["react"],
  target: "esnext",
  clean: true,
})
