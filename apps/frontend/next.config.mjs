/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, options) => {
        config.externals.push("pino-pretty", "lokijs", "encoding");

        config.experiments = {
            asyncWebAssembly: true,
            syncWebAssembly: true,
            layers: true,
        }
        return config
    },
    experimental: {
        serverComponentsExternalPackages: ["@xmtp/user-preferences-bindings-wasm"],
    },
}

export default nextConfig;
