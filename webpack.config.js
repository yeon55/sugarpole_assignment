const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development", // 배포용: production
  devtool: "eval", // 배포용: hidden-source-map   *그냥 source-map을 쓰면 개발자 도구에 소스코드가 노출이 된다.
  resolve: {
    extensions: [".jsx", ".js", ".tsx", ".ts"], // 웹팩에서 처리해주는 확장자들
  },

  entry: {
    app: "./app.tsx",
  },
  // modules, plugins에 적힌 처리과정을 client.tsx에 적용을 해서 최종적으로 app.js를 뽑아낸다(output).
  module: {
    rules: [
      // babel대신에 tsc 설정.
      {
        test: /\.tsx?$/, // tsx나 ts파일을 발견하면
        loader: "ts-loader", // 해당 loader를 통해서 버전을 변환하겠다 는 뜻.
      },
    ],
  },
  plugins: [], // 현재는 필요없어진 옵션이라고 한다.
  output: {
    filename: "[name].js", // or '[name].js'
    path: path.join(__dirname, "dist"), // npm webpack을 실행하면 client.tsx를 통해서 webpack처리 후 dist폴더가 생기고 그 안에 app.js가 들어있다.
  },
};
