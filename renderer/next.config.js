const dotenv = require("dotenv");


/** @type {import("next").NextConfig} */
module.exports = {
    reactStrictMode: true,
    swcMinify: true,
    trailingSlash: true,
    images: { unoptimized: true },
    webpack: (config) => {
        const existingEnv = config.plugins[1].definitions;

        // Parse .env file
        const env = dotenv.config({ path: ".env" }).parsed;

        // Adds environment variables from .env file (shared by main and renderer processes)
        // Without overriding existing ones
        if (existingEnv?.__NEXT_DEFINE_ENV === "true") {
            config.plugins[1].definitions = {
                ...existingEnv,
                ...env
            };

            console.log("Environment variables from .env file loaded");
        }

        return config;
    },
    async redirects() {
        return [
            {
                source: "/home",
                destination: "/",
                permanent: true
            }
        ];
    }
};
