/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")();

const nextConfig = {
    reactStrictMode: false,
}

module.exports = removeImports({
    ...nextConfig,
});
