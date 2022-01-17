const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    devtool: "inline-source-map",
    module: {
        rules: [
            { test: /\.ts$/, use: "ts-loader" },
            { test: /\.css$/, use: ["style-loader", "css-loader"] }, //Does not work! Wrong entry probably
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
