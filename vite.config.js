// vite.config.js
const path = require("path");
export default {
    build: {
        outDir: "lib",
        lib: {
            entry: path.resolve(__dirname, "./src/num2Han.ts"),
            name: "num2Han",
            fileName: "index",
            formats: ["es", "cjs"],
        },
        minify: "esbuild",
    },
};
