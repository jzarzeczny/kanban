const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    devtool: "inline-source-map",
    module: {
        rules: [
            { test: /\.ts$/, use: "ts-loader" },
            { test: /\.css$/, use: "css-loader" },
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
