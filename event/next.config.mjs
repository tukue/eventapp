import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        config.resolve.alias['@frontend'] = path.resolve(__dirname, '../frontend');
        return config;
    },
};

export default nextConfig;