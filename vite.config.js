// vite.config.js
const path = require("path");
const isWeb = process.env.PLATFORM === "web";
export default {
  build: {
    outDir: isWeb ? "dist" : "lib",
    minify: "esbuild",
    ...(isWeb
      ? {}
      : {
          lib: {
            entry: path.resolve(__dirname, "./src/num2Han.ts"),
            name: "num2Han",
            fileName: "index",
            formats: ["es", "cjs"],
          },
        }),
  },
};
