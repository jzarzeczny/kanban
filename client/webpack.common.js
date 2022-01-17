const path = require("path");

module.exports = {
    entry: "./src/index.ts",
    module: {
        rules: [
            { test: /\.ts$/, use: "ts-loader" },
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
        ],
    },
    resolve: {
        extensions: [".ts"],
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
    },
};

// => Zmimifikowany plik, uywany pod produkcję => es5 => source-map
