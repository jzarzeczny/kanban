const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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

    plugins: [
        new HtmlWebpackPlugin({
            title: "Kanban",
            template: "src/index.html",
        }),
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "../dist/client"),
        clean: true,
    },
};
