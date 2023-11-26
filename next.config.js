/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")({
    ignoreModules: ["react-player"], // 무시하고 싶은 모듈을 배열에 추가
  });
  
  const nextConfig = {
    reactStrictMode: false,
  };
  
  module.exports = removeImports({
    ...nextConfig,
  });
  